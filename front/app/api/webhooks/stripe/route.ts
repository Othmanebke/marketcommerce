import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'

// IMPORTANT: disable body parsing — Stripe needs the raw buffer
export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return new NextResponse('Signature manquante.', { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[Stripe Webhook] Signature invalide:', err)
    return new NextResponse('Signature invalide.', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()

      // Récupérer les line items depuis Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      })

      // Créer la commande
      const order = await prisma.order.create({
        data: {
          email:                   session.customer_details?.email ?? 'inconnu',
          totalCents:              session.amount_total ?? 0,
          currency:                session.currency?.toUpperCase() ?? 'EUR',
          status:                  'PAID',
          stripeCheckoutSessionId: session.id,
          shippingAddressJson:     session.shipping_details ?? undefined,
        },
      })

      // Créer les order items + décrémenter le stock
      for (const item of lineItems.data) {
        const product = item.price?.product as Stripe.Product | null
        const variantId = product?.metadata?.variantId
        if (!variantId) continue

        const qty = item.quantity ?? 1

        await prisma.orderItem.create({
          data: {
            orderId:       order.id,
            variantId,
            qty,
            unitPriceCents: item.price?.unit_amount ?? 0,
          },
        })

        // Décrémenter le stock (atomic)
        await prisma.variant.update({
          where: { id: variantId },
          data:  { stockQty: { decrement: qty } },
        })
      }

      // Créer le payment record
      await prisma.payment.create({
        data: {
          orderId: order.id,
          stripePaymentIntentId: session.payment_intent as string,
          status: 'SUCCEEDED',
        },
      })

      await prisma.$disconnect()
      console.log(`[Stripe Webhook] Commande créée: ${order.id}`)
    } catch (err) {
      console.error('[Stripe Webhook] Erreur création commande:', err)
      return new NextResponse('Erreur traitement.', { status: 500 })
    }
  }

  return new NextResponse(null, { status: 200 })
}

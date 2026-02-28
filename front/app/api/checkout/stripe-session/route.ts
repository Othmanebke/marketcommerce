import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const BodySchema = z.object({
  items: z.array(
    z.object({
      variantId: z.string(),
      qty:       z.number().min(1),
    })
  ).min(1),
  successUrl: z.string().url(),
  cancelUrl:  z.string().url(),
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Données invalides.', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { items, successUrl, cancelUrl } = parsed.data

  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    // Fetch variants from DB to get real prices (never trust client prices)
    const variantIds = items.map(i => i.variantId)
    const variants = await prisma.variant.findMany({
      where:   { id: { in: variantIds } },
      include: { product: { select: { name: true, concentration: true } } },
    })

    await prisma.$disconnect()

    // Build Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(item => {
      const variant = variants.find(v => v.id === item.variantId)
      if (!variant) throw new Error(`Variant ${item.variantId} introuvable`)
      if (variant.stockQty < item.qty) throw new Error(`Stock insuffisant pour ${variant.product.name}`)

      return {
        price_data: {
          currency:     'eur',
          unit_amount:  variant.priceCents,
          product_data: {
            name:     `${variant.product.name} — ${variant.product.concentration}`,
            metadata: { variantId: variant.id, volumeMl: String(variant.volumeMl) },
          },
        },
        quantity: item.qty,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode:                 'payment',
      line_items:           lineItems,
      success_url:          successUrl,
      cancel_url:           cancelUrl,
      shipping_address_collection: { allowed_countries: ['FR', 'BE', 'CH', 'LU'] },
      locale:               'fr',
      metadata:             { source: 'maison_web' },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur serveur.'
    console.error('[POST /api/checkout/stripe-session]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

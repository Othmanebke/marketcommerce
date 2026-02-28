import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'

const BodySchema = z.object({
  email:    z.string().email(),
  subject:  z.string().min(2).max(200),
  message:  z.string().min(10).max(2000),
  orderRef: z.string().optional(),
})

// Simple 4-char reference code
function genRef() {
  return Math.random().toString(36).slice(2, 6).toUpperCase()
}

export async function POST(req: NextRequest) {
  const body   = await req.json().catch(() => null)
  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Données invalides.', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { email, subject, message, orderRef } = parsed.data

  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    const ticket = await prisma.contactTicket.create({
      data: {
        email,
        subject,
        message,
        orderRef,
        referenceCode: genRef(),
      },
    })

    await prisma.$disconnect()

    return NextResponse.json({ ok: true, referenceCode: ticket.referenceCode })
  } catch (err) {
    console.error('[POST /api/contact]', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

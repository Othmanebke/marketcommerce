import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'

const BodySchema = z.object({
  locale:      z.string().optional().default('fr-FR'),
  mode:        z.enum(['FULL', 'CONTEXTUAL']).optional().default('FULL'),
  productSlug: z.string().nullable().optional(),
})

export async function POST(req: NextRequest) {
  const body   = await req.json().catch(() => ({}))
  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides.' }, { status: 400 })
  }

  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    const session = await prisma.chatSession.create({
      data: {
        locale:    parsed.data.locale,
        mode:      parsed.data.mode,
        productId: parsed.data.productSlug ?? undefined,
      },
    })

    await prisma.$disconnect()
    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error('[POST /api/chat/session]', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

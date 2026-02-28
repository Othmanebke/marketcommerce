import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Validation query params
const QuerySchema = z.object({
  vibe:         z.string().optional(),
  family:       z.string().optional(),
  note:         z.string().optional(),
  notesMode:    z.enum(['AND', 'OR']).optional().default('OR'),
  intensityMin: z.coerce.number().min(1).max(5).optional(),
  tenueMin:     z.coerce.number().min(1).max(5).optional(),
  sillageMin:   z.coerce.number().min(1).max(5).optional(),
  season:       z.string().optional(),
  moment:       z.string().optional(),
  priceMin:     z.coerce.number().optional(),
  priceMax:     z.coerce.number().optional(),
  inStock:      z.enum(['true', 'false']).optional(),
  sort:         z.enum(['relevance', 'price_asc', 'price_desc', 'newest']).optional().default('relevance'),
  page:         z.coerce.number().min(1).optional().default(1),
  limit:        z.coerce.number().min(1).max(50).optional().default(12),
})

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const parsed = QuerySchema.safeParse(Object.fromEntries(searchParams))
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Paramètres invalides.', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const q = parsed.data

  try {
    // Import Prisma dynamically to avoid Edge runtime issues
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    const where: Record<string, unknown> = { status: 'ACTIVE' }

    if (q.family)       where.family    = q.family
    if (q.intensityMin) where.intensity = { gte: q.intensityMin }
    if (q.tenueMin)     where.tenue     = { gte: q.tenueMin }
    if (q.sillageMin)   where.sillage   = { gte: q.sillageMin }
    if (q.season)       where.seasons   = { has: q.season }
    if (q.moment)       where.moments   = { has: q.moment }

    if (q.vibe) {
      where.productVibes = {
        some: { vibe: { label: { in: q.vibe.split(',') } } },
      }
    }

    if (q.note) {
      const notes = q.note.split(',')
      where.productNotes = q.notesMode === 'AND'
        ? { every: { note: { name: { in: notes } } } }
        : { some:  { note: { name: { in: notes } } } }
    }

    if (q.inStock === 'true') {
      where.variants = { some: { stockQty: { gt: 0 } } }
    }

    const orderBy =
      q.sort === 'newest'     ? { createdAt: 'desc' as const } :
      q.sort === 'price_asc'  ? { variants:  { _count: 'asc'  as const } } :
      undefined

    const skip = (q.page - 1) * q.limit

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: q.limit,
        include: {
          variants: { orderBy: { priceCents: 'asc' }, take: 1 },
          media:    { orderBy: { sortOrder: 'asc' },  take: 1 },
          productVibes: { include: { vibe: true } },
        },
      }),
      prisma.product.count({ where }),
    ])

    const items = products.map(p => ({
      slug:           p.slug,
      name:           p.name,
      concentration:  p.concentration,
      priceFromCents: p.variants[0]?.priceCents ?? 0,
      badges:         p.badges,
      heroImageUrl:   p.media[0]?.url ?? '',
      metrics:        { intensity: p.intensity, tenue: p.tenue, sillage: p.sillage },
      vibes:          p.productVibes.map(pv => pv.vibe.label),
      family:         p.family,
      seasons:        p.seasons,
      moments:        p.moments,
    }))

    await prisma.$disconnect()

    return NextResponse.json({ items, total, page: q.page, limit: q.limit })
  } catch (err) {
    console.error('[GET /api/products]', err)
    return NextResponse.json(
      { error: 'Erreur serveur.' },
      { status: 500 }
    )
  }
}

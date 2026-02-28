import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    const product = await prisma.product.findUnique({
      where:   { slug },
      include: {
        variants:     { orderBy: { volumeMl: 'asc' } },
        media:        { orderBy: { sortOrder: 'asc' } },
        productNotes: { include: { note: true } },
        productVibes: { include: { vibe: true }, orderBy: { weight: 'desc' } },
      },
    })

    if (!product || product.status === 'ARCHIVED') {
      return NextResponse.json({ error: 'Création introuvable.' }, { status: 404 })
    }

    // Build notes pyramid
    const notes = {
      top:   product.productNotes.filter(n => n.type === 'TOP').map(n => ({ name: n.note.name, weight: n.weight })),
      heart: product.productNotes.filter(n => n.type === 'HEART').map(n => ({ name: n.note.name, weight: n.weight })),
      base:  product.productNotes.filter(n => n.type === 'BASE').map(n => ({ name: n.note.name, weight: n.weight })),
    }

    // Similar products (same family, exclude self)
    const similar = await prisma.product.findMany({
      where:   { family: product.family, status: 'ACTIVE', slug: { not: slug } },
      take:    3,
      include: {
        variants: { orderBy: { priceCents: 'asc' }, take: 1 },
        media:    { orderBy: { sortOrder: 'asc' },  take: 1 },
      },
    })

    await prisma.$disconnect()

    return NextResponse.json({
      product: {
        slug:                product.slug,
        name:                product.name,
        concentration:       product.concentration,
        descriptionEditorial:product.descriptionEditorial,
        family:              product.family,
        intensity:           product.intensity,
        tenue:               product.tenue,
        sillage:             product.sillage,
        seasons:             product.seasons,
        moments:             product.moments,
        badges:              product.badges,
        seoTitle:            product.seoTitle,
        seoDesc:             product.seoDesc,
        vibes:               product.productVibes.map(pv => ({ label: pv.vibe.label, weight: pv.weight })),
      },
      variants: product.variants.map(v => ({
        id:         v.id,
        volumeMl:   v.volumeMl,
        priceCents: v.priceCents,
        stockQty:   v.stockQty,
      })),
      media: product.media.map(m => ({ url: m.url, alt: m.alt, type: m.type })),
      notes,
      similar: similar.map(s => ({
        slug:           s.slug,
        name:           s.name,
        concentration:  s.concentration,
        priceFromCents: s.variants[0]?.priceCents ?? 0,
        heroImageUrl:   s.media[0]?.url ?? '',
      })),
    })
  } catch (err) {
    console.error('[GET /api/products/[slug]]', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

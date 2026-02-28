import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { recommend, type UserProfile, type ProductCandidate } from '@/lib/recommendation'

export const runtime = 'nodejs'

// ── In-memory rate limit (MVP) ──
const rateMap = new Map<string, { count: number; reset: number }>()
function rateLimitOk(ip: string, limit = 30, windowMs = 60_000): boolean {
  const now   = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) { rateMap.set(ip, { count: 1, reset: now + windowMs }); return true }
  if (entry.count >= limit) return false
  entry.count++; return true
}

const BodySchema = z.object({
  sessionId: z.string(),
  message:   z.string().max(500).optional().default(''),
  step:      z.enum(['init', 'vibe', 'family', 'notes_liked', 'notes_avoid', 'intensity', 'occasion', 'done']),
  context:   z.object({ productSlug: z.string().nullable() }).optional(),
})

// ── Steps config ──
type Step = 'init' | 'vibe' | 'family' | 'notes_liked' | 'notes_avoid' | 'intensity' | 'occasion' | 'done'

const NEXT_STEP: Record<Step, Step> = {
  init:        'vibe',
  vibe:        'family',
  family:      'notes_liked',
  notes_liked: 'notes_avoid',
  notes_avoid: 'intensity',
  intensity:   'occasion',
  occasion:    'done',
  done:        'done',
}

const STEP_CHIPS: Record<Step, string[]> = {
  init:        ['Commencer →'],
  vibe:        ['Noir Velours', 'Or Solaire', 'Bleu Minéral', 'Ivoire Propre', 'Rouge Épicé'],
  family:      ['Boisé', 'Ambré', 'Floral', 'Hespéridé', 'Musqué', 'Gourmand', 'Je ne sais pas'],
  notes_liked: ['Bergamote', 'Rose', 'Oud', 'Musc blanc', 'Vétiver', 'Iris', 'Ambre', 'Cèdre', 'Poivre', 'Jasmin'],
  notes_avoid: ['Passer →'],
  intensity:   ['Discret', 'Équilibré', 'Présent'],
  occasion:    ['Journée', 'Bureau', 'Soirée', 'Rendez-vous'],
  done:        ['Affiner : plus frais', 'Affiner : plus sombre', 'Recommencer'],
}

const STEP_QUESTIONS: Record<Step, string> = {
  init:        'Bienvenue. Je suis le Conseiller Maison.\nJe vais te recommander une création en quelques questions.',
  vibe:        'Quelle ambiance te ressemble aujourd\'hui ?',
  family:      'Tu tends vers quelle famille olfactive ?',
  notes_liked: 'Trois notes que tu adores, si tu en as ? (sélectionne ou passe)',
  notes_avoid: 'Et des notes que tu préfères éviter ?',
  intensity:   'Tu veux un parfum plutôt…',
  occasion:    'Pour quel moment ?',
  done:        '',
}

// Intensity mapping from chip label
const INTENSITY_MAP: Record<string, { intensity: number; sillage: number }> = {
  'Discret':   { intensity: 2, sillage: 2 },
  'Équilibré': { intensity: 3, sillage: 3 },
  'Présent':   { intensity: 5, sillage: 4 },
}

const MOCK_PRODUCTS: ProductCandidate[] = [
  {
    slug: 'noir-velours',   name: 'Noir Velours',   concentration: 'Extrait', priceFromCents: 22000,
    family: 'boisé',        intensity: 5, tenue: 5, sillage: 4,
    seasons: ['hiver', 'mi-saison'],         moments: ['soirée', 'rendez-vous'],
    vibes: [{ label: 'Noir Velours', weight: 5 }, { label: 'Rouge Épicé', weight: 2 }],
    notes: [
      { name: 'Poivre noir', type: 'TOP',   weight: 4 },
      { name: 'Rose fumée',  type: 'HEART', weight: 5 },
      { name: 'Oud',         type: 'HEART', weight: 4 },
      { name: 'Benjoin',     type: 'BASE',  weight: 5 },
      { name: 'Vétiver',     type: 'BASE',  weight: 4 },
    ],
  },
  {
    slug: 'bleu-mineral',  name: 'Bleu Minéral',  concentration: 'EDP', priceFromCents: 16000,
    family: 'hespéridé',   intensity: 3, tenue: 4, sillage: 3,
    seasons: ['été', 'mi-saison'],            moments: ['jour', 'bureau'],
    vibes: [{ label: 'Bleu Minéral', weight: 5 }],
    notes: [
      { name: 'Bergamote',  type: 'TOP',   weight: 5 },
      { name: 'Musc blanc', type: 'HEART', weight: 5 },
      { name: 'Iris',       type: 'HEART', weight: 3 },
      { name: 'Cèdre',      type: 'BASE',  weight: 4 },
    ],
  },
  {
    slug: 'or-solaire',    name: 'Or Solaire',    concentration: 'EDP', priceFromCents: 18000,
    family: 'ambré',       intensity: 4, tenue: 4, sillage: 4,
    seasons: ['été', 'mi-saison'],            moments: ['soirée', 'rendez-vous'],
    vibes: [{ label: 'Or Solaire', weight: 5 }],
    notes: [
      { name: 'Bergamote', type: 'TOP',   weight: 3 },
      { name: 'Rose',      type: 'HEART', weight: 4 },
      { name: 'Ambre',     type: 'BASE',  weight: 5 },
    ],
  },
  {
    slug: 'iris-blanc',    name: 'Iris Blanc',    concentration: 'Extrait', priceFromCents: 26000,
    family: 'floral',      intensity: 3, tenue: 5, sillage: 2,
    seasons: ['mi-saison', 'hiver'],          moments: ['bureau', 'rendez-vous'],
    vibes: [{ label: 'Ivoire Propre', weight: 5 }],
    notes: [
      { name: 'Iris',  type: 'TOP',   weight: 5 },
      { name: 'Rose',  type: 'HEART', weight: 3 },
      { name: 'Cèdre', type: 'BASE',  weight: 4 },
    ],
  },
  {
    slug: 'rouge-epice',   name: 'Rouge Épicé',   concentration: 'EDP', priceFromCents: 19000,
    family: 'ambré',       intensity: 5, tenue: 4, sillage: 5,
    seasons: ['hiver'],                       moments: ['soirée'],
    vibes: [{ label: 'Rouge Épicé', weight: 5 }, { label: 'Noir Velours', weight: 3 }],
    notes: [
      { name: 'Poivre',  type: 'TOP',   weight: 5 },
      { name: 'Jasmin',  type: 'HEART', weight: 4 },
      { name: 'Ambre',   type: 'BASE',  weight: 5 },
    ],
  },
  {
    slug: 'musc-silencieux', name: 'Musc Silencieux', concentration: 'EDP', priceFromCents: 17000,
    family: 'musqué',     intensity: 2, tenue: 4, sillage: 2,
    seasons: ['toute saison'],                moments: ['bureau', 'jour'],
    vibes: [{ label: 'Ivoire Propre', weight: 4 }],
    notes: [
      { name: 'Musc blanc', type: 'TOP',   weight: 5 },
      { name: 'Iris',       type: 'HEART', weight: 4 },
      { name: 'Ambre gris', type: 'BASE',  weight: 3 },
    ],
  },
]

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!rateLimitOk(ip)) {
    return NextResponse.json({ error: 'Trop de requêtes. Réessayez dans une minute.' }, { status: 429 })
  }

  const body   = await req.json().catch(() => null)
  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides.' }, { status: 400 })
  }

  const { sessionId, message, step } = parsed.data
  const nextStep = NEXT_STEP[step]

  // ── Construire le profil progressivement depuis les messages ──
  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    // Persister le message user
    if (message) {
      await prisma.chatMessage.create({
        data: { sessionId, role: 'USER', content: message, stepKey: step },
      })
    }

    // Lire tout l'historique de la session pour reconstruire le profil
    const history = await prisma.chatMessage.findMany({
      where:   { sessionId },
      orderBy: { createdAt: 'asc' },
    })

    // Reconstruire le profil depuis l'historique
    const profile = buildProfile(history)

    let assistantMessage = ''
    let chips: string[]  = STEP_CHIPS[nextStep] ?? []
    let recommendations  = []

    if (nextStep === 'done') {
      // Calculer les recommandations
      const { top3, alternatives } = recommend(MOCK_PRODUCTS, profile)
      recommendations = [...top3, ...alternatives]

      assistantMessage = top3.length > 0
        ? `Je te recommande ${top3.length} création${top3.length > 1 ? 's' : ''} qui correspondent à ton profil :`
        : 'Je n\'ai pas trouvé de création correspondant exactement à tes préférences. Essaie d\'affiner ou de réinitialiser.'

      chips = top3.length > 0
        ? ['Affiner : plus frais', 'Affiner : plus sombre', 'Recommencer']
        : ['Recommencer']

      // Sauvegarder le log
      if (top3.length > 0) {
        await prisma.recommendationLog.create({
          data: {
            sessionId,
            profileJson:             profile,
            recommendedProductsJson: recommendations.map(r => ({
              slug: r.slug, score: r.score, reasons: r.reasons,
            })),
          },
        })
      }
    } else {
      assistantMessage = STEP_QUESTIONS[nextStep]
    }

    // Persister la réponse assistant
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role:      'ASSISTANT',
        content:   assistantMessage,
        stepKey:   nextStep,
        chipsJson: chips,
      },
    })

    await prisma.$disconnect()

    return NextResponse.json({
      assistantMessage,
      step:            nextStep,
      chips,
      recommendations,
    })
  } catch (err) {
    console.error('[POST /api/chat/message]', err)
    return NextResponse.json({ error: 'Je n\'ai pas pu répondre. Réessayons.' }, { status: 500 })
  }
}

// ── Reconstruction du profil depuis l'historique des messages ──
function buildProfile(
  history: { role: string; content: string; stepKey: string | null }[]
): UserProfile {
  const profile: UserProfile = {
    vibes: [], families: [], likedNotes: [], avoidNotes: [],
    intensity: 3, tenue: 3, sillage: 3, seasons: [], moments: [],
  }

  const userMessages = history.filter(m => m.role === 'USER')

  for (const msg of userMessages) {
    const val = msg.content.trim()
    switch (msg.stepKey) {
      case 'vibe':
        val.split(',').forEach(v => {
          const label = v.trim()
          if (label && !profile.vibes.find(pv => pv.label === label)) {
            profile.vibes.push({ label, w: 5 })
          }
        })
        break
      case 'family':
        if (val !== 'Je ne sais pas') {
          profile.families = [val.toLowerCase()]
        }
        break
      case 'notes_liked':
        if (val !== 'Passer →') {
          profile.likedNotes = val.split(',').map(n => n.trim()).filter(Boolean)
        }
        break
      case 'notes_avoid':
        if (val !== 'Passer →') {
          profile.avoidNotes = val.split(',').map(n => n.trim()).filter(Boolean)
        }
        break
      case 'intensity': {
        const mapped = INTENSITY_MAP[val]
        if (mapped) {
          profile.intensity = mapped.intensity
          profile.sillage   = mapped.sillage
        }
        break
      }
      case 'occasion':
        profile.moments = val.split(',').map(m => m.trim().toLowerCase()).filter(Boolean)
        break
    }
  }

  return profile
}

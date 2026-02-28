// ─────────────────────────────────────────
// MOTEUR DE RECOMMANDATION DÉTERMINISTE
// ─────────────────────────────────────────

export interface UserProfile {
  vibes:      { label: string; w: number }[]   // w 1–5
  families:   string[]
  likedNotes: string[]
  avoidNotes: string[]
  intensity:  number   // 1–5
  tenue:      number   // 1–5
  sillage:    number   // 1–5
  seasons:    string[]
  moments:    string[]
}

export interface ProductCandidate {
  slug:          string
  name:          string
  concentration: string
  priceFromCents:number
  family:        string
  intensity:     number
  tenue:         number
  sillage:       number
  seasons:       string[]
  moments:       string[]
  vibes:         { label: string; weight: number }[]
  notes:         { name: string; type: 'TOP' | 'HEART' | 'BASE'; weight: number }[]
}

export interface ScoredProduct extends ProductCandidate {
  score:   number
  reasons: string[]
}

const VIBE_DESCRIPTIONS: Record<string, string> = {
  'Noir Velours':  'profond et résineux — ton univers.',
  'Or Solaire':    'chaud et lumineux, comme tu le souhaitais.',
  'Bleu Minéral':  'frais et précis, ton accord de prédilection.',
  'Ivoire Propre': 'musc propre et délicat, une seconde peau.',
  'Rouge Épicé':   'épicé et sensuel, une présence assumée.',
}

// ── Score d'un produit vs un profil ──
export function scoreProduct(
  product: ProductCandidate,
  profile: UserProfile
): number | null {
  let score = 0

  // 1. Hard stop — note à éviter présente
  const noteNames = product.notes.map(n => n.name.toLowerCase())
  for (const avoid of profile.avoidNotes) {
    if (noteNames.includes(avoid.toLowerCase())) return null
  }

  // 2. Vibe match (+40 max, pondéré)
  for (const uv of profile.vibes) {
    const pv = product.vibes.find(v => v.label === uv.label)
    if (pv) {
      score += 40 * (uv.w / 5) * (pv.weight / 5)
    }
  }

  // 3. Famille (+30 si match, +10 si pas de préférence)
  if (profile.families.length === 0) {
    score += 10
  } else if (profile.families.includes(product.family)) {
    score += 30
  }

  // 4. Notes aimées (+8 × weight, modulé par position)
  for (const liked of profile.likedNotes) {
    const found = product.notes.find(n => n.name.toLowerCase() === liked.toLowerCase())
    if (found) {
      const posMultiplier = found.type === 'HEART' ? 1.0 : found.type === 'BASE' ? 0.85 : 0.7
      score += 8 * (found.weight / 5) * posMultiplier
    }
  }

  // 5. Proximité métriques (+0..+10 chacune)
  const iProx = 1 - Math.abs(product.intensity - profile.intensity) / 4
  const tProx = 1 - Math.abs(product.tenue     - profile.tenue    ) / 4
  const sProx = 1 - Math.abs(product.sillage   - profile.sillage  ) / 4
  score += Math.max(0, iProx * 10)
  score += Math.max(0, tProx * 10)
  score += Math.max(0, sProx * 10)

  // 6. Saison & moment (+5 chacun)
  if (profile.seasons.length && product.seasons.some(s => profile.seasons.includes(s))) score += 5
  if (profile.moments.length && product.moments.some(m => profile.moments.includes(m))) score += 5

  return Math.round(score)
}

// ── Génération des raisons ──
export function generateReasons(
  product: ProductCandidate,
  profile: UserProfile
): string[] {
  const reasons: string[] = []

  // Raison 1 : vibe
  const mv = profile.vibes.find(uv =>
    product.vibes.some(pv => pv.label === uv.label)
  )
  if (mv) {
    reasons.push(
      `Ambiance ${mv.label} : ${VIBE_DESCRIPTIONS[mv.label] ?? 'en accord avec ton profil.'}`
    )
  }

  // Raison 2 : famille
  if (profile.families.includes(product.family)) {
    reasons.push(`Famille ${product.family} — celle que tu as sélectionnée.`)
  }

  // Raison 3 : notes aimées trouvées
  const matched = profile.likedNotes.filter(ln =>
    product.notes.some(n => n.name.toLowerCase() === ln.toLowerCase())
  )
  if (matched.length) {
    const list = matched.slice(0, 2).join(' et ')
    reasons.push(`${list} ${matched.length > 1 ? 'sont présentes' : 'est présente'} dans cette composition.`)
  }

  // Raison 4 : métrique proche
  const diffs = [
    { label: 'Intensité', diff: Math.abs(product.intensity - profile.intensity), value: product.intensity },
    { label: 'Tenue',     diff: Math.abs(product.tenue     - profile.tenue    ), value: product.tenue     },
    { label: 'Sillage',   diff: Math.abs(product.sillage   - profile.sillage  ), value: product.sillage   },
  ].sort((a, b) => a.diff - b.diff)

  if (diffs[0].diff <= 1) {
    reasons.push(`${diffs[0].label} de ${diffs[0].value}/5 — très proche de ton attente.`)
  }

  return reasons.slice(0, 3)
}

// ── Engine principal ──
export interface RecoOutput {
  top3:        ScoredProduct[]
  alternatives: ScoredProduct[]
}

export function recommend(
  products: ProductCandidate[],
  profile:  UserProfile
): RecoOutput {
  const scored: ScoredProduct[] = []

  for (const p of products) {
    const score = scoreProduct(p, profile)
    if (score === null) continue
    scored.push({ ...p, score, reasons: generateReasons(p, profile) })
  }

  scored.sort((a, b) => b.score - a.score)
  const top3       = scored.slice(0, 3)
  const remainders = scored.slice(3)

  // Alternative "plus frais"
  const fresher = remainders
    .filter(p => p.intensity < (profile.intensity) || p.sillage < (profile.sillage))
    .sort((a, b) => (a.intensity + a.sillage) - (b.intensity + b.sillage))
    .at(0)

  // Alternative "plus sombre"
  const darker = remainders
    .filter(p => p.vibes.some(v => ['Noir Velours', 'Rouge Épicé'].includes(v.label)))
    .sort((a, b) => b.intensity - a.intensity)
    .at(0)

  if (fresher) fresher.reasons = [`Option plus fraîche que tes choix principaux.`, ...fresher.reasons.slice(0, 2)]
  if (darker)  darker.reasons  = [`Option plus profonde et présente.`,             ...darker.reasons.slice(0,  2)]

  return {
    top3,
    alternatives: [fresher, darker].filter(Boolean) as ScoredProduct[],
  }
}

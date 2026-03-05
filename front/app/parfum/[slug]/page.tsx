'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import DividerGoldHairline from '@/components/ui/Divider'
import Accordion from '@/components/ui/Accordion'
import { MetricsBars } from '@/components/ui/MetricsBar'
import { addToast } from '@/components/ui/Toast'
import ProductCard, { type ProductCardData } from '@/components/commerce/ProductCard'
import { useCart } from '@/hooks/useCart'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatePresence, motion } from 'framer-motion'

// ── Types ──
interface Variant {
  id: string
  volumeMl: number
  priceCents: number
  stockQty: number
}
interface Note { name: string; weight: number }
interface ProductDetail {
  slug: string
  name: string
  concentration: string
  descriptionEditorial: string
  family: string
  intensity: number
  tenue: number
  sillage: number
  seasons: string[]
  moments: string[]
  badges: string[]
  vibes: string[]
  notes: { top: Note[]; heart: Note[]; base: Note[] }
  variants: Variant[]
  media: { url: string; alt: string }[]
  similar: ProductCardData[]
}

// ── Helper Data Generation ──
const GENERIC_VARIANTS: Variant[] = [
  { id: 'v1', volumeMl: 50,  priceCents: 16000, stockQty: 10 },
  { id: 'v2', volumeMl: 100, priceCents: 26000, stockQty: 5  },
]

// ── Mock data (remplacé par fetch /api/products/[slug]) ──
const MOCK_PRODUCTS: Record<string, ProductDetail> = {
  // 1. Noir Velours
  'noir-velours': {
    slug: 'noir-velours',
    name: 'Noir Velours',
    concentration: 'Extrait de Parfum',
    descriptionEditorial:
      "Un accord résineux et fumé, bâti autour de la résine de benjoin et du vétiver fumé. Une présence sobre, profonde, qui s'installe sans chercher à convaincre.",
    family: 'boisé',
    intensity: 5, tenue: 5, sillage: 4,
    seasons: ['hiver', 'mi-saison'],
    moments: ['soirée', 'rendez-vous'],
    badges: ['Atelier'],
    vibes: ['Noir Velours', 'Rouge Épicé'],
    notes: {
      top:   [{ name: 'Poivre noir', weight: 4 }, { name: 'Cardamome', weight: 3 }],
      heart: [{ name: 'Rose fumée',  weight: 5 }, { name: 'Oud',       weight: 4 }],
      base:  [{ name: 'Benjoin',     weight: 5 }, { name: 'Vétiver',   weight: 4 }, { name: 'Ambre gris', weight: 3 }],
    },
    variants: [
      { id: 'v1', volumeMl: 30,  priceCents: 14000, stockQty: 12 },
      { id: 'v2', volumeMl: 50,  priceCents: 22000, stockQty: 4  },
      { id: 'v3', volumeMl: 100, priceCents: 38000, stockQty: 0  },
    ],
    media: [
      { url: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=85', alt: 'Flacon Noir Velours' },
      { url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=85', alt: 'Détail bouchon'      },
      { url: 'https://images.unsplash.com/photo-1596091831165-10b9c5ef7c46?w=1200&q=85', alt: 'Matières premières'  },
    ],
    similar: [
      { slug: 'rose-oud',     name: 'Rose Oud',      concentration: 'Extrait', priceFromCents: 28000, heroImageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80' },
      { slug: 'iris-blanc',   name: 'Iris Blanc',    concentration: 'Extrait', priceFromCents: 26000, heroImageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80' },
      { slug: 'bleu-mineral', name: 'Bleu Minéral',  concentration: 'EDP',     priceFromCents: 16000, heroImageUrl: 'https://images.unsplash.com/photo-1588514912908-53abc9d9c399?w=800&q=80' },
    ],
  },
  // 2. Bleu Minéral
  'bleu-mineral': {
    slug: 'bleu-mineral',
    name: 'Bleu Minéral',
    concentration: 'Eau de Parfum',
    descriptionEditorial:
      "Bergamote de Calabre, musc blanc et cèdre de l'Atlas. Une composition franche, sans surcharge. La propreté d'une peau bien habitée.",
    family: 'hespéridé',
    intensity: 3, tenue: 4, sillage: 3,
    seasons: ['été', 'mi-saison'],
    moments: ['jour', 'bureau'],
    badges: ['Nouveau'],
    vibes: ['Bleu Minéral'],
    notes: {
      top:   [{ name: 'Bergamote', weight: 5 }, { name: 'Citron',   weight: 3 }],
      heart: [{ name: 'Musc blanc', weight: 5 }, { name: 'Iris',    weight: 3 }],
      base:  [{ name: 'Cèdre',     weight: 4 }, { name: 'Vétiver', weight: 3 }],
    },
    variants: [
      { id: 'v1', volumeMl: 30,  priceCents: 9800,  stockQty: 20 },
      { id: 'v2', volumeMl: 50,  priceCents: 16000, stockQty: 10 },
      { id: 'v3', volumeMl: 100, priceCents: 26000, stockQty: 6  },
    ],
    media: [
      { url: 'https://images.unsplash.com/photo-1588514912908-53abc9d9c399?w=1200&q=85', alt: 'Flacon Bleu Minéral' },
      { url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=85', alt: 'Détail matière'      },
    ],
    similar: [
      { slug: 'vetiver-racine', name: 'Vétiver Racine', concentration: 'EDT', priceFromCents: 14500, heroImageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80' },
      { slug: 'santal-creme',   name: 'Santal Crème',   concentration: 'EDP', priceFromCents: 17500, heroImageUrl: 'https://images.unsplash.com/photo-1616604212595-5807bbdb2142?w=800&q=80' },
      { slug: 'iris-blanc',     name: 'Iris Blanc',     concentration: 'Extrait', priceFromCents: 26000, heroImageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80' },
    ],
  },
  // 3. Or Solaire
  'or-solaire': {
    slug: 'or-solaire',
    name: 'Or Solaire',
    concentration: 'Eau de Parfum',
    descriptionEditorial: "Un rayon de soleil liquide. Ambre chaud, vanille de Madagascar et une touche de fleur d'oranger pour un sillage lumineux.",
    family: 'ambré',
    intensity: 4, tenue: 5, sillage: 4,
    seasons: ['été', 'hiver'],
    moments: ['soirée', 'vacances'],
    badges: ['Soleil'],
    vibes: ['Chaud', 'Lumineux'],
    notes: {
      top:   [{ name: 'Mandarine', weight: 4 }, { name: 'Poivre rose', weight: 2 }],
      heart: [{ name: 'Fleur d\'oranger', weight: 5 }, { name: 'Ylang-Ylang', weight: 4 }],
      base:  [{ name: 'Vanille', weight: 5 }, { name: 'Ambre blanc', weight: 4 }],
    },
    variants: [
      { id: 'v1', volumeMl: 50,  priceCents: 18000, stockQty: 15 },
      { id: 'v2', volumeMl: 100, priceCents: 28000, stockQty: 8  },
    ],
    media: [
      { url: 'https://images.unsplash.com/photo-1600612253971-1e40651e8ef6?w=1200&q=85', alt: 'Flacon Or Solaire' },
    ],
    similar: [
      { slug: 'noir-velours', name: 'Noir Velours', concentration: 'Extrait', priceFromCents: 22000, heroImageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80' },
    ],
  },
  // 4. Iris Blanc
  'iris-blanc': {
    slug: 'iris-blanc',
    name: 'Iris Blanc',
    concentration: 'Extrait de Parfum',
    descriptionEditorial: "L'élégance poudrée de l'iris pallida, rafraîchie par des aldéhydes modernes. Un parfum de peau, intime et sophistiqué.",
    family: 'floral',
    intensity: 3, tenue: 5, sillage: 2,
    seasons: ['printemps', 'toute l\'année'],
    moments: ['journée', 'mariage'],
    badges: ['Rare'],
    vibes: ['Poudré', 'Clean'],
    notes: {
      top:   [{ name: 'Aldéhydes', weight: 5 }, { name: 'Néroli', weight: 3 }],
      heart: [{ name: 'Iris Pallida', weight: 5 }, { name: 'Violette', weight: 2 }],
      base:  [{ name: 'Musc blanc', weight: 4 }, { name: 'Héliotrope', weight: 3 }],
    },
    variants: GENERIC_VARIANTS,
    media: [
      { url: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1200&q=85', alt: 'Flacon Iris Blanc' },
    ],
    similar: [
      { slug: 'bleu-mineral', name: 'Bleu Minéral', concentration: 'EDP', priceFromCents: 16000, heroImageUrl: 'https://images.unsplash.com/photo-1588514912908-53abc9d9c399?w=800&q=80' },
    ],
  },
  // 5. Cuir Fumé
  'cuir-fume': {
    slug: 'cuir-fume',
    name: 'Cuir Fumé',
    concentration: 'Eau de Parfum',
    descriptionEditorial: "L'odeur d'un blouson vintage et d'un feu de bois. Caractériel, animal, mais adouci par une touche d'huile de cade.",
    family: 'cuiré',
    intensity: 5, tenue: 5, sillage: 5,
    seasons: ['hiver', 'automne'],
    moments: ['soirée', 'moto'],
    badges: ['Caractère'],
    vibes: ['Rebelle', 'Sombre'],
    notes: {
      top:   [{ name: 'Safran', weight: 4 }, { name: 'Thym', weight: 3 }],
      heart: [{ name: 'Cuir', weight: 5 }, { name: 'Tabac', weight: 4 }],
      base:  [{ name: 'Cade', weight: 5 }, { name: 'Bouleau', weight: 4 }],
    },
    variants: GENERIC_VARIANTS,
    media: [
      { url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=85', alt: 'Flacon Cuir Fumé' },
    ],
    similar: [
      { slug: 'noir-velours', name: 'Noir Velours', concentration: 'Extrait', priceFromCents: 22000, heroImageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80' },
    ],
  },
  // 6. Rose Oud
  'rose-oud': {
    slug: 'rose-oud',
    name: 'Rose Oud',
    concentration: 'Extrait de Parfum',
    descriptionEditorial: "Le classique oriental revisité. La rose de Damas opulente rencontre un oud du Laos sombre et mystique.",
    family: 'oriental',
    intensity: 5, tenue: 6, sillage: 5,
    seasons: ['hiver', 'soirée'],
    moments: ['grand soir'],
    badges: ['Exclusif'],
    vibes: ['Opulent', 'Mystique'],
    notes: {
      top:   [{ name: 'Framboise', weight: 3 }, { name: 'Encens', weight: 4 }],
      heart: [{ name: 'Rose Damas', weight: 5 }, { name: 'Oud Laos', weight: 5 }],
      base:  [{ name: 'Patchouli', weight: 4 }, { name: 'Vanille', weight: 3 }],
    },
    variants: GENERIC_VARIANTS,
    media: [
      { url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=85', alt: 'Flacon Rose Oud' },
    ],
    similar: [
      { slug: 'noir-velours', name: 'Noir Velours', concentration: 'Extrait', priceFromCents: 22000, heroImageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80' },
    ],
  },
  // 7. Santal Crème
  'santal-creme': {
    slug: 'santal-creme',
    name: 'Santal Crème',
    concentration: 'Eau de Parfum',
    descriptionEditorial: "Une caresse lactée. Le bois de santal australien se fait onctueux, presque crémeux, accompagné de figue et de noix de coco.",
    family: 'boisé',
    intensity: 3, tenue: 4, sillage: 3,
    seasons: ['automne', 'hiver'],
    moments: ['cocooning'],
    badges: ['Douceur'],
    vibes: ['Lacté', 'Réconfort'],
    notes: {
      top:   [{ name: 'Figue', weight: 4 }, { name: 'Lait de coco', weight: 3 }],
      heart: [{ name: 'Santal', weight: 5 }, { name: 'Iris', weight: 3 }],
      base:  [{ name: 'Musc', weight: 4 }, { name: 'Cèdre', weight: 3 }],
    },
    variants: GENERIC_VARIANTS,
    media: [
      { url: 'https://images.unsplash.com/photo-1616604212595-5807bbdb2142?w=1200&q=85', alt: 'Flacon Santal Crème' },
    ],
    similar: [
      { slug: 'iris-blanc', name: 'Iris Blanc', concentration: 'Extrait', priceFromCents: 26000, heroImageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80' },
    ],
  },
  // 8. Vétiver Racine
  'vetiver-racine': {
    slug: 'vetiver-racine',
    name: 'Vétiver Racine',
    concentration: 'Eau de Toilette',
    descriptionEditorial: "Le vétiver dans son état brut. Terreux, humide, racine. Une promenade en forêt après la pluie.",
    family: 'boisé',
    intensity: 3, tenue: 3, sillage: 3,
    seasons: ['printemps', 'automne'],
    moments: ['jour', 'nature'],
    badges: ['Terre'],
    vibes: ['Nature', 'Fraîcheur'],
    notes: {
      top:   [{ name: 'Pamplemousse', weight: 4 }, { name: 'Élémi', weight: 3 }],
      heart: [{ name: 'Vétiver Haïti', weight: 5 }, { name: 'Géranium', weight: 3 }],
      base:  [{ name: 'Mousse de chêne', weight: 4 }, { name: 'Patchouli', weight: 3 }],
    },
    variants: GENERIC_VARIANTS,
    media: [
      { url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&q=85', alt: 'Flacon Vétiver Racine' },
    ],
    similar: [
      { slug: 'bleu-mineral', name: 'Bleu Minéral', concentration: 'EDP', priceFromCents: 16000, heroImageUrl: 'https://images.unsplash.com/photo-1588514912908-53abc9d9c399?w=800&q=80' },
    ],
  },
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(cents / 100)
}

function stockLabel(qty: number): { label: string; color: string } {
  if (qty === 0) return { label: 'Rupture', color: 'text-danger' }
  if (qty <= 3)  return { label: 'Dernières pièces', color: 'text-warning' }
  return { label: 'Disponible', color: 'text-success' }
}

const ACCORDION_ITEMS = [
  {
    id: 'livraison',
    label: 'Livraison',
    content: 'Expédition sous 2 à 3 jours ouvrés. Livraison offerte à partir de 120 €. Colissimo suivi, signature requise pour les Extraits.',
  },
  {
    id: 'retours',
    label: 'Retours',
    content: "Retour accepté sous 14 jours après réception. Produit intact, emballage d'origine. Remboursement sous 5 jours ouvrés.",
  },
  {
    id: 'rituel',
    label: 'Rituel & conseil',
    content: 'Appliquer sur les points de chaleur : poignets, cou, derrière les oreilles. Pour une tenue prolongée, hydrater la peau avant application. Peut se superposer à Musc Silencieux pour renforcer la base.',
  },
  {
    id: 'ingredients',
    label: 'Ingrédients',
    content: 'Alcohol denat., Parfum (Fragrance), Aqua. Peut contenir : Benzyl benzoate, Eugenol, Isoeugenol, Linalool, Coumarin. Flacon 100 % verre, bouchon bois certifié FSC.',
  },
]

// ── Note pyramid component ──
function PyramidRow({ label, notes }: { label: string; notes: Note[] }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-caption text-paper-50/30 uppercase tracking-widest w-12 pt-1.5 shrink-0">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {notes.map(n => (
          <Chip key={n.name} size="sm" selected={false}>
            {n.name}
          </Chip>
        ))}
      </div>
    </div>
  )
}

// ── Main page ──
export default function PDPPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = MOCK_PRODUCTS[slug]
  if (!product) notFound()

  const router = useRouter()
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0])
  const [activeImageIdx, setActiveImageIdx]   = useState(0)
  const [addLoading, setAddLoading]           = useState(false)

  const stock = stockLabel(selectedVariant.stockQty)

  async function handleAddToCart() {
    if (selectedVariant.stockQty === 0 || addLoading) return
    setAddLoading(true)

    addItem({
      variantId:     `${product.slug}-${selectedVariant.id}`,
      productSlug:   product.slug,
      productName:   product.name,
      concentration: product.concentration,
      volumeMl:      selectedVariant.volumeMl,
      priceCents:    selectedVariant.priceCents,
      imageUrl:      product.media[0].url
    }, 1)

    await new Promise(r => setTimeout(r, 600))

    setAddLoading(false)
    addToast(`${product.name} ajouté au panier.`, 'success')
    router.push('/cart')
  }

  return (
    <main className="bg-ink-950 min-h-screen pb-32 lg:pb-24">

      {/* ── Breadcrumb ── */}
      <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-paper-50/35 hover:text-gold-100 transition-colors duration-300 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300 inline-block">←</span>
          Retour à la Collection
        </Link>
      </div>

      {/* ── Desktop layout (lg: split 55/45) ── */}
      <div className="max-w-7xl mx-auto px-6 py-8 lg:grid lg:grid-cols-[55%_45%] lg:gap-20 lg:items-start">

        {/* ── LEFT — Gallery ── */}
        <div className="mb-12 lg:mb-0">
          <ScrollReveal>
            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-900 border border-stroke-12 mb-4 group cursor-crosshair">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeImageIdx}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.media[activeImageIdx].url}
                    alt={product.media[activeImageIdx].alt}
                    fill
                    priority
                    className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent pointer-events-none" />
              {/* Hover gold shimmer border */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold-100/15 transition-colors duration-700 pointer-events-none" />

              {/* Badges */}
              {product.badges.length > 0 && (
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  {product.badges.map(badge => (
                    <span
                      key={badge}
                      className="px-3 py-1 text-[9px] uppercase tracking-widest bg-ink-950/60 backdrop-blur-md border border-paper-50/15 text-paper-50/80"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {/* Image counter */}
              {product.media.length > 1 && (
                <div className="absolute bottom-5 right-5 z-10">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-paper-50/30">
                    {String(activeImageIdx + 1).padStart(2, '0')} / {String(product.media.length).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>

            {/* Thumb rail */}
            {product.media.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2" role="tablist" aria-label="Galerie produit">
                {product.media.map((m, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={activeImageIdx === i}
                    aria-label={m.alt}
                    onClick={() => setActiveImageIdx(i)}
                    className={`
                      relative flex-shrink-0 w-20 aspect-square overflow-hidden
                      border transition-all duration-400
                      ${activeImageIdx === i
                        ? 'border-gold-100 opacity-100 scale-100'
                        : 'border-transparent opacity-40 hover:opacity-70 scale-95 hover:scale-100'
                      }
                    `}
                  >
                    <Image
                      src={m.url} alt={m.alt} fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </ScrollReveal>
        </div>

        {/* ── RIGHT — Info panel ── */}
        <div className="flex flex-col gap-8 lg:pt-4 lg:sticky lg:top-28">

          {/* Block 1 — Identity */}
          <ScrollReveal delay={0.1}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <p className="text-[9px] text-gold-100 uppercase tracking-[0.35em]">Maison</p>
                <span className="w-1 h-1 rounded-full bg-gold-100/50" />
                <p className="text-[9px] text-gold-100/60 uppercase tracking-[0.35em]">{product.family}</p>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl text-paper-50 mb-3 tracking-tight leading-[0.92]">
                {product.name}
              </h1>
              <p className="text-lg text-paper-50/50 mb-7 font-light italic font-serif">
                {product.concentration}
              </p>
              <p className="text-[15px] text-paper-50/75 leading-relaxed font-light max-w-lg">
                {product.descriptionEditorial}
              </p>

              {/* Seasons & Moments */}
              <div className="mt-6 flex flex-wrap gap-2">
                {product.seasons.map(s => (
                  <span key={s} className="px-3 py-1 text-[9px] uppercase tracking-[0.25em] border border-stroke-12 text-paper-50/35">
                    {s}
                  </span>
                ))}
                {product.moments.map(m => (
                  <span key={m} className="px-3 py-1 text-[9px] uppercase tracking-[0.25em] border border-gold-100/15 text-gold-100/50">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <DividerGoldHairline />

          {/* Block 2 — Variants & Price */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-paper-50/30 mb-3">Volume</p>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Sélectionner un volume">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      role="radio"
                      aria-checked={selectedVariant.id === v.id}
                      disabled={v.stockQty === 0}
                      onClick={() => setSelectedVariant(v)}
                      className={`
                        relative min-w-[5rem] px-4 py-3 text-[10px] uppercase tracking-wider transition-all duration-300
                        border
                        ${selectedVariant.id === v.id
                          ? 'bg-gold-100 text-ink-950 border-gold-100 font-semibold shadow-[0_0_20px_rgba(214,181,109,0.25)]'
                          : 'bg-transparent text-paper-50/55 border-stroke-12 hover:border-paper-50/25 hover:text-paper-50'
                        }
                        disabled:opacity-25 disabled:cursor-not-allowed
                      `}
                    >
                      {v.volumeMl}ml
                      {v.stockQty === 0 && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[8px] text-paper-50/30 uppercase tracking-widest">Épuisé</span>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div>
                  <p className="font-serif text-4xl text-paper-50 tracking-tight">
                    {formatPrice(selectedVariant.priceCents)}
                  </p>
                  <p className={`text-[10px] uppercase tracking-widest mt-1.5 flex items-center gap-1.5 ${stock.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
                    {stock.label}
                  </p>
                </div>

                <Button
                  variant="primary"
                  className="px-8 py-4 text-[10px] tracking-[0.3em] w-full sm:w-auto"
                  disabled={selectedVariant.stockQty === 0 || addLoading}
                  onClick={handleAddToCart}
                >
                  {addLoading ? '✓ Ajouté...' : 'Ajouter au panier'}
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <DividerGoldHairline />

          {/* Block 3 — Olfactory pyramid + Metrics + Accordion */}
          <ScrollReveal delay={0.3}>
            <div className="space-y-8">

              {/* Pyramid Olfactive — enhanced */}
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-paper-50/30 mb-5">
                  Pyramide Olfactive
                </p>
                <div className="space-y-5">
                  {[
                    { label: 'Tête',  notes: product.notes.top,   accent: 'text-paper-50/50', line: 'bg-paper-50/15' },
                    { label: 'Cœur', notes: product.notes.heart, accent: 'text-gold-100/70', line: 'bg-gold-100/20' },
                    { label: 'Fond',  notes: product.notes.base,  accent: 'text-gold-100/40', line: 'bg-gold-100/10' },
                  ].map(({ label, notes, accent, line }) => (
                    <div key={label} className="flex gap-4 items-start">
                      <div className="flex flex-col items-center pt-1 gap-1 shrink-0">
                        <span className={`text-[8px] uppercase tracking-[0.3em] ${accent} w-8 text-center`}>{label}</span>
                        <div className={`w-px h-6 ${line}`} />
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {notes.map(n => (
                          <Chip key={n.name} size="sm" selected={false}>
                            {n.name}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-5 border-y border-stroke-12">
                <MetricsBars
                  intensity={product.intensity}
                  tenue={product.tenue}
                  sillage={product.sillage}
                />
              </div>

              <Accordion items={ACCORDION_ITEMS} className="border-t-0" />
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* ── Similar Products ── */}
      {product.similar.length > 0 && (
        <section className="border-t border-stroke-12 mt-24 py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-[9px] uppercase tracking-[0.4em] text-gold-100 mb-4">Continuez</p>
                <h2 className="font-serif text-3xl text-paper-50">
                  Vous aimerez aussi
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {product.similar.map((sim, idx) => (
                <ScrollReveal key={sim.slug} delay={idx * 0.1}>
                  <ProductCard product={sim} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sticky bottom bar — mobile only ── */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden sticky-panel bg-ink-950/95 backdrop-blur-xl border-t border-stroke-12">
        <div className="px-5 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-serif text-lg text-paper-50 truncate">{product.name}</p>
            <p className="text-[10px] text-paper-50/45 uppercase tracking-[0.2em]">
              {formatPrice(selectedVariant.priceCents)} · {selectedVariant.volumeMl}ml
            </p>
          </div>
          <button
            type="button"
            disabled={selectedVariant.stockQty === 0 || addLoading}
            onClick={handleAddToCart}
            className={`
              shrink-0 px-7 py-3
              text-[10px] uppercase tracking-[0.3em] font-medium
              transition-all duration-400
              ${selectedVariant.stockQty === 0
                ? 'bg-stroke-12 text-paper-50/25 cursor-not-allowed'
                : addLoading
                  ? 'bg-gold-100/20 text-gold-100/50'
                  : 'bg-gold-100 text-ink-950 hover:bg-paper-50'
              }
            `}
          >
            {addLoading ? '✓' : selectedVariant.stockQty === 0 ? 'Épuisé' : 'Ajouter'}
          </button>
        </div>
      </div>
    </main>
  )
}

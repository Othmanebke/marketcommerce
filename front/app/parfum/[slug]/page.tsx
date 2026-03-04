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
    setAddLoading(true)
    
    // Ajout réel au panier
    addItem({
      variantId: `${product.slug}-${selectedVariant.id}`,
      productSlug: product.slug,
      productName: product.name,
      concentration: product.concentration,
      volumeMl: selectedVariant.volumeMl,
      priceCents: selectedVariant.priceCents,
      imageUrl: product.media[0].url
    }, 1)

    await new Promise(r => setTimeout(r, 600)) // Petit délai UX
    
    setAddLoading(false)
    addToast(`${product.name} ajouté au panier.`, 'success')
    
    // Redirection vers le panier
    router.push('/panier')
  }

  return (
    <main className="bg-ink-950 min-h-screen pb-24">
      
      {/* ── Breadcrumb ── */}
      <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Link 
          href="/collection" 
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-paper-50/40 hover:text-gold-100 transition-colors"
        >
          <span>←</span> Retour à la Collection
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.media[activeImageIdx].url}
                    alt={product.media[activeImageIdx].alt}
                    fill
                    priority
                    className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Badges */}
              {product.badges.length > 0 && (
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  {product.badges.map(badge => (
                    <span
                      key={badge}
                      className="px-3 py-1 text-[9px] uppercase tracking-widest bg-ink-950/40 backdrop-blur-md border border-paper-50/20 text-paper-50"
                    >
                      {badge}
                    </span>
                  ))}
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
                      border transition-all duration-300
                      ${activeImageIdx === i
                        ? 'border-gold-100 opacity-100'
                        : 'border-transparent opacity-50 hover:opacity-80'
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
        <div className="flex flex-col gap-10 lg:pt-4 lg:sticky lg:top-32">

          {/* Block 1 — Titre */}
          <ScrollReveal delay={0.1}>
            <div>
              <p className="text-[10px] text-gold-100 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                Maison <span className="w-1 h-1 rounded-full bg-gold-100/50" /> {product.family}
              </p>
              <h1 className="font-serif text-5xl md:text-6xl text-paper-50 mb-4 tracking-tight leading-[0.9]">
                {product.name}
              </h1>
              <p className="text-xl text-paper-50/60 mb-8 font-light italic font-serif">
                {product.concentration}
              </p>
              <p className="text-sm md:text-base text-paper-50/80 leading-relaxed font-light max-w-lg">
                {product.descriptionEditorial}
              </p>
            </div>
          </ScrollReveal>

          <DividerGoldHairline />

          {/* Block 2 — Variants & Price */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Sélectionner un volume">
                {product.variants.map(v => (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={selectedVariant.id === v.id}
                    disabled={v.stockQty === 0}
                    onClick={() => setSelectedVariant(v)}
                    className={`
                      min-w-[4rem] px-5 py-3 text-xs uppercase tracking-wider transition-all duration-300
                      border
                      ${selectedVariant.id === v.id
                        ? 'bg-gold-100 text-ink-950 border-gold-100 font-medium'
                        : 'bg-transparent text-paper-50/60 border-stroke-12 hover:border-paper-50/30'
                      }
                      disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-stroke-12
                    `}
                  >
                    {v.volumeMl}ml
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="font-serif text-3xl text-paper-50">
                    {formatPrice(selectedVariant.priceCents)}
                  </p>
                  <p className={`text-[10px] uppercase tracking-widest mt-1 ${stock.color}`}>
                    {stock.label}
                  </p>
                </div>

                <Button
                  variant="primary"
                  className="px-10 py-4 text-xs tracking-[0.25em] w-full sm:w-auto"
                  disabled={selectedVariant.stockQty === 0 || addLoading}
                  onClick={handleAddToCart}
                >
                  {addLoading ? 'Ajout...' : 'Ajouter au panier'}
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <DividerGoldHairline />

          {/* Block 3 — Details (Accordion & Metrics) */}
          <ScrollReveal delay={0.3}>
            <div className="space-y-8">
              {/* Pyramid Olfactive */}
              <div className="space-y-4">
                <p className="text-[10px] text-paper-50/40 uppercase tracking-[0.2em] mb-4">
                  Pyramide Olfactive
                </p>
                <PyramidRow label="Tête" notes={product.notes.top} />
                <PyramidRow label="Cœur" notes={product.notes.heart} />
                <PyramidRow label="Fond" notes={product.notes.base} />
              </div>

              <div className="py-6 border-b border-stroke-12">
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
        <section className="border-t border-stroke-12 mt-24 py-24 px-6 md:px-12 bg-ink-900/30">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="font-serif text-3xl text-paper-50 mb-12 text-center">
                Vous aimerez aussi
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.similar.map((sim, idx) => (
                <ScrollReveal key={sim.slug} delay={idx * 0.1}>
                  <ProductCard product={sim} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

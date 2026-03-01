'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import DividerGoldHairline from '@/components/ui/Divider'
import Accordion from '@/components/ui/Accordion'
import { MetricsBars } from '@/components/ui/MetricsBar'
import { addToast } from '@/components/ui/Toast'
import ProductCard, { type ProductCardData } from '@/components/commerce/ProductCard'

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

// ── Mock data (remplacé par fetch /api/products/[slug]) ──
const MOCK_PRODUCTS: Record<string, ProductDetail> = {
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
      { slug: 'rouge-epice',   name: 'Rouge Épicé',   concentration: 'EDP', priceFromCents: 19000, heroImageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80' },
      { slug: 'cendre-douce',  name: 'Cendre Douce',  concentration: 'Extrait', priceFromCents: 28000, heroImageUrl: 'https://images.unsplash.com/photo-1607026246836-d3c0bc2e55fa?w=800&q=80' },
      { slug: 'bleu-mineral',  name: 'Bleu Minéral',  concentration: 'EDP', priceFromCents: 16000, heroImageUrl: 'https://images.unsplash.com/photo-1588514912908-53abc9d9c399?w=800&q=80' },
    ],
  },
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
      { slug: 'vent-de-sel',      name: 'Vent de Sel',      concentration: 'EDT', priceFromCents: 12000, heroImageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80' },
      { slug: 'musc-silencieux',  name: 'Musc Silencieux',  concentration: 'EDP', priceFromCents: 17000, heroImageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80' },
      { slug: 'iris-blanc',       name: 'Iris Blanc',       concentration: 'Extrait', priceFromCents: 26000, heroImageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80' },
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
      <span className="text-caption text-paper-50/30 uppercase tracking-widest w-12 pt-1 shrink-0">
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

  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0])
  const [activeImageIdx, setActiveImageIdx]   = useState(0)
  const [addLoading, setAddLoading]           = useState(false)

  const stock = stockLabel(selectedVariant.stockQty)

  async function handleAddToCart() {
    setAddLoading(true)
    await new Promise(r => setTimeout(r, 600)) // Simule appel API
    setAddLoading(false)
    addToast(`${product.name} ajouté au panier.`, 'success')
  }

  return (
    <div className="bg-ink-950 min-h-screen">
      {/* ── Desktop layout (lg: split 55/45) ── */}
      <div className="max-w-7xl mx-auto px-6 py-10 pt-32 lg:grid lg:grid-cols-[55%_45%] lg:gap-16 lg:items-start">

        {/* ── LEFT — Gallery ── */}
        <div className="lg:sticky lg:top-24 mb-10 lg:mb-0">
          {/* Main image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink-900 border border-stroke-12 mb-4 group cursor-crosshair">
            <Image
              src={product.media[activeImageIdx].url}
              alt={product.media[activeImageIdx].alt}
              fill
              priority
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent pointer-events-none" />
            {/* Badges */}
            {product.badges.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-col gap-1">
                {product.badges.map(badge => (
                  <span
                    key={badge}
                    className="px-3 py-1 rounded-chip text-caption bg-glass-08 backdrop-blur-soft border border-stroke-12 text-gold-100"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Thumb rail */}
          {product.media.length > 1 && (
            <div className="flex gap-2" role="tablist" aria-label="Galerie produit">
              {product.media.map((m, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={activeImageIdx === i}
                  aria-label={m.alt}
                  onClick={() => setActiveImageIdx(i)}
                  className={`
                    relative flex-1 aspect-square rounded-lg overflow-hidden
                    border transition-all duration-micro ease-luxury
                    ${activeImageIdx === i
                      ? 'border-[rgba(214,181,109,0.6)]'
                      : 'border-stroke-12 hover:border-stroke-18'
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
        </div>

        {/* ── RIGHT — Info panel ── */}
        <div className="flex flex-col gap-8 lg:pt-8">

          {/* Block 1 — Titre */}
          <div>
            <p className="text-xs text-gold-100 uppercase tracking-[0.2em] mb-4">
              Maison · {product.family}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-paper-50 mb-4 tracking-tight leading-none">
              {product.name}
            </h1>
            <p className="text-lg text-paper-50/60 mb-8 font-light italic">
              {product.concentration}
            </p>
            <p className="text-lg text-paper-50/80 leading-relaxed font-light">
              {product.descriptionEditorial}
            </p>
          </div>

          <DividerGoldHairline />

          {/* Block 2 — Variants */}
          <div>
            <p className="text-xs text-paper-50/60 uppercase tracking-[0.2em] mb-4">
              Format
            </p>
            <div
              className="flex flex-wrap gap-3 mb-6"
              role="radiogroup"
              aria-label="Sélectionner un volume"
            >
              {product.variants.map(v => (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={selectedVariant.id === v.id}
                  disabled={v.stockQty === 0}
                  onClick={() => setSelectedVariant(v)}
                  className={`
                    px-5 py-3 rounded-none text-sm uppercase tracking-wider
                    border transition-all duration-300
                    disabled:opacity-20 disabled:cursor-not-allowed
                    ${selectedVariant.id === v.id
                      ? 'bg-gold-100/10 border-gold-100 text-gold-100'
                      : 'bg-transparent border-stroke-12 text-paper-50/70 hover:border-gold-100/50 hover:text-paper-50'
                    }
                  `}
                >
                  {v.volumeMl} ml
                  {v.stockQty === 0 && <span className="ml-2 text-xs text-danger">·&nbsp;épuisé</span>}
                </button>
              ))}
            </div>

            {/* Price + stock */}
            <div className="flex items-center gap-4">
              <p className="font-serif text-3xl text-paper-50">
                {formatPrice(selectedVariant.priceCents)}
              </p>
              <span className={`text-xs uppercase tracking-widest ${stock.color} flex items-center gap-2`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-current`} aria-hidden="true" />
                {stock.label}
              </span>
            </div>
          </div>

          {/* Block 3 — CTAs */}
          <div className="flex flex-col gap-4 mt-4">
            <button
              disabled={selectedVariant.stockQty === 0}
              onClick={handleAddToCart}
              className="w-full bg-paper-50 text-ink-950 hover:bg-gold-100 hover:text-ink-950 transition-colors duration-500 py-4 text-sm uppercase tracking-[0.2em] relative overflow-hidden group"
            >
              <span className="relative z-10">
                {selectedVariant.stockQty === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
              </span>
              <div className="absolute inset-0 bg-gold-100 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out" />
            </button>

            <button
              onClick={() => {/* ouvre le chat en mode B */}}
              className="w-full bg-transparent border border-stroke-12 text-paper-50 hover:border-gold-100 transition-colors duration-500 py-4 text-sm uppercase tracking-[0.2em]"
            >
              Demander conseil
            </button>
            {selectedVariant.stockQty === 0 && (
              <button
                type="button"
                className="text-xs text-paper-50/40 hover:text-gold-100 transition-colors duration-300 text-center uppercase tracking-widest mt-2"
              >
                M'alerter à la disponibilité →
              </button>
            )}
          </div>

          <DividerGoldHairline />

          {/* Block 4 — Pyramide olfactive */}
          <div>
            <p className="text-xs text-paper-50/60 uppercase tracking-[0.2em] mb-6">
              Notes Olfactives
            </p>
            <div className="flex flex-col gap-5">
              <PyramidRow label="Tête"  notes={product.notes.top}   />
              <PyramidRow label="Cœur"  notes={product.notes.heart} />
              <PyramidRow label="Fond"  notes={product.notes.base}  />
            </div>
          </div>

          <DividerGoldHairline />

          {/* Block 5 — Signature vibes */}
          <div>
            <p className="text-xs text-paper-50/60 uppercase tracking-[0.2em] mb-5">
              Portrait du Parfum
            </p>
            <div className="flex flex-wrap gap-3">
              {product.vibes.map(v => (
                <span key={v} className="bg-gold-100/10 text-gold-100 border border-gold-100/30 px-3 py-1 text-xs uppercase tracking-widest">{v}</span>
              ))}
              {product.seasons.map(s => (
                <span key={s} className="bg-transparent text-paper-50/70 border border-stroke-12 px-3 py-1 text-xs uppercase tracking-widest">{s}</span>
              ))}
              {product.moments.map(m => (
                <span key={m} className="bg-transparent text-paper-50/70 border border-stroke-12 px-3 py-1 text-xs uppercase tracking-widest">{m}</span>
              ))}
            </div>
          </div>

          <DividerGoldHairline />

          {/* Block 6 — Métriques */}
          <div>
            <p className="text-xs text-paper-50/60 uppercase tracking-[0.2em] mb-6">
              Sillage & Caractère
            </p>
            <MetricsBars
              intensity={product.intensity}
              tenue={product.tenue}
              sillage={product.sillage}
            />
          </div>

          <DividerGoldHairline />

          {/* Block 7 — Proches de... */}
          <div>
            <p className="text-xs text-paper-50/60 uppercase tracking-[0.2em] mb-6">
              Prolonger l'expérience
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {product.similar.map(p => (
                <div key={p.slug} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink-900 border border-stroke-12 mb-3">
                    <Image src={p.heroImageUrl} alt={p.name} fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" sizes="33vw" />
                  </div>
                  <p className="font-serif text-lg text-paper-50 group-hover:text-gold-100 transition-colors">{p.name}</p>
                  <p className="text-xs text-paper-50/50 uppercase tracking-widest mt-1">{p.concentration}</p>
                </div>
              ))}
            </div>
          </div>

          <DividerGoldHairline />

          {/* Block 8 — Accordion */}
          <div className="mt-8 border-t border-stroke-12">
            <Accordion items={ACCORDION_ITEMS} />
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom bar ── */}
      <div className="
        fixed bottom-0 left-0 right-0 z-40 lg:hidden
        bg-ink-950/80 backdrop-blur-xl border-t border-stroke-12 px-6 py-4
        flex items-center gap-4
      ">
        <div className="flex-1">
          <p className="text-xs text-paper-50/60 uppercase tracking-widest">{selectedVariant.volumeMl} ml</p>
          <p className="font-serif text-xl text-paper-50 mt-1">
            {formatPrice(selectedVariant.priceCents)}
          </p>
        </div>
        <button
          disabled={selectedVariant.stockQty === 0}
          onClick={handleAddToCart}
          className="shrink-0 bg-paper-50 text-ink-950 px-6 py-3 text-xs uppercase tracking-widest hover:bg-gold-100 transition-colors"
        >
          Ajouter
        </button>
        <button
          type="button"
          aria-label="Demander conseil"
          className="
            w-12 h-12 rounded-none flex items-center justify-center
            text-paper-50/60 hover:text-gold-100 border border-stroke-12
            transition-all duration-500 shrink-0
          "
        >
          <ChatIcon />
        </button>
      </div>
    </div>
  )
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M14 8c0 3.314-2.686 6-6 6a5.96 5.96 0 01-2.998-.8L2 14l.8-3.002A5.96 5.96 0 012 8c0-3.314 2.686-6 6-6s6 2.686 6 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

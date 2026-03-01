import type { Metadata } from 'next'
import Image from 'next/image'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import DividerGoldHairline from '@/components/ui/Divider'

export const metadata: Metadata = {
  title: 'La Maison — Notre Philosophie',
  description: 'Découvrez l\'art de la parfumerie de création. Un savoir-faire unique, des matières premières d\'exception.',
}

export default function MaisonPage() {
  return (
    <div className="min-h-screen bg-ink-950 pb-24">
      {/* Hero */}
      <HeroSection 
        title="L'Art de la<br/>Parfumerie" 
        subtitle="Un retour à l'essence même du parfum. Loin des tendances éphémères, nous créons pour ceux qui savent prendre le temps."
        backgroundImage="https://images.unsplash.com/photo-1616604212595-5807bbdb2142?w=1920&q=85"
      />

      {/* Manifeste */}
      <ScrollReveal type="fade-up" duration={1} delay={0.2}>
        <section className="py-32 px-6 max-w-4xl mx-auto text-center border-b border-stroke-12 relative">
          <DividerGoldHairline className="mb-16" />        
          <h2 className="font-serif text-3xl md:text-5xl text-paper-50 leading-tight mb-12 tracking-tight">                                                                    
            "Le vrai luxe n'est pas dans l'excès, mais dans la précision. Chaque goutte, chaque essence est choisie avec une intention pure."                             
          </h2>
          <p className="text-lg text-paper-50/60 leading-relaxed font-light mx-auto max-w-2xl italic">                                                                             
            Notre maison est née d'une volonté simple : redonner au parfum ses lettres de noblesse.                                                                         
            Nous refusons les compromis sur la qualité des matières. Nous privilégions le temps long                                                                        
            de la macération, l'exigence de la formulation, l'artisanat du flaconnage.                                                                                    
          </p>
        </section>
      </ScrollReveal>

      {/* Alternating Sections */}
      <section className="py-24 overflow-hidden">
        {/* Section 1: Les Matières */}
        <ScrollReveal type="slide-right" duration={0.8}>
          <div className="max-w-[1400px] mx-auto px-6 mb-40 flex flex-col lg:flex-row items-center gap-16 lg:gap-32">                                                            
            <div className="w-full lg:w-1/2 aspect-[4/5] relative border border-stroke-12 overflow-hidden group">                                                                              
              <Image
                src="https://images.unsplash.com/photo-1596091831165-10b9c5ef7c46?w=1000&q=80"                                                                                  
                alt="Nos matières premières"
                fill
                className="object-cover transition-transform duration-[20s] group-hover:scale-110 ease-out"                                                                         
              />
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-[10px] text-gold-100 uppercase tracking-[0.2em] mb-6 block">01 — L'Origine</span>                                                        
              <h3 className="font-serif text-5xl md:text-6xl text-paper-50 mb-8 tracking-tight">Des matières d'exception</h3>                                                                     
              <p className="text-sm font-light text-paper-50/70 leading-relaxed mb-6 italic">     
                Iris Pallida de Florence, absolue de Vanille de Madagascar, Vétiver fumé d'Haïti...                                                                             
              </p>
              <p className="text-lg font-light text-paper-50/70 leading-relaxed mb-6">
                Nos sourcing se fait directement auprès des producteurs qui respectent la terre et le temps des récoltes.
              </p>
              <p className="text-lg font-light text-paper-50/70 leading-relaxed">
                Ce lien direct avec la matière vivante permet à nos créations de vibrer différemment, de s'exprimer avec une richesse et une complexité que seule la nature peut offrir.                                                                            
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 2: L'Atelier */}
        <ScrollReveal type="fade-up" duration={0.8}>
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-32">                                                          
            <div className="w-full lg:w-1/2 aspect-[4/5] relative border border-stroke-12 overflow-hidden group">                                                                              
              <Image
                src="https://images.unsplash.com/photo-1607026246836-d3c0bc2e55fa?w=1000&q=80"                                                                                  
                alt="L'Atelier de création"
                fill
                className="object-cover transition-transform duration-[20s] group-hover:scale-110 ease-out"                                                                         
              />
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-[10px] text-gold-100 uppercase tracking-[0.2em] mb-6 block">02 — Le Geste</span>                                                         
              <h3 className="font-serif text-5xl md:text-6xl text-paper-50 mb-8 tracking-tight">Un assemblage de précision</h3>                                                                   
              <p className="text-lg font-light text-paper-50/70 leading-relaxed mb-6">     
                Chaque composition repose de longues semaines dans nos cuves. Cette période de macération lente est indispensable pour que les molécules s'entremêlent, s'arrondissent et développent leur sillage final.
              </p>
              <p className="text-lg font-light text-paper-50/70 leading-relaxed">
                L'embouteillage, l'étiquetage et le sertissage sont réalisés à la main dans notre atelier, faisant de chaque flacon une pièce unique.

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
    <main className="min-h-screen bg-ink-950 pb-32">
      <HeroSection 
        title="La Maison" 
        subtitle="Un retour à l'essence même du parfum. Loin des tendances éphémères, nous créons pour ceux qui savent prendre le temps."
        backgroundImage="https://images.unsplash.com/photo-1616604212595-5807bbdb2142?w=1920&q=85"
        align="center"
      />

      {/* Manifeste / Philosophy */}
      <section className="relative px-6 -mt-20 z-10 max-w-4xl mx-auto mb-32">
        <ScrollReveal type="fade-up" duration={1} delay={0.2}>
          <GlassCard className="p-12 md:p-20 text-center border-t-4 border-t-gold-100">
            <h2 className="font-serif text-3xl md:text-5xl text-paper-50 leading-tight mb-12 tracking-tight">                                                                    
              "Le vrai luxe n'est pas dans l'excès, mais dans la précision. Chaque goutte, chaque essence est choisie avec une intention pure."                             
            </h2>
            <div className="w-24 h-[1px] bg-gold-100/30 mx-auto mb-12" />
            <p className="text-lg text-paper-50/60 leading-relaxed font-light mx-auto max-w-2xl italic">                                                                             
              Notre maison est née d'une volonté simple : redonner au parfum ses lettres de noblesse.                                                                         
              Nous refusons les compromis sur la qualité des matières. Nous privilégions le temps long                                                                        
              de la macération, l'exigence de la formulation, l'artisanat du flaconnage.                                                                                    
            </p>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Section 1: Les Matières */}
      <section className="px-6 max-w-[1400px] mx-auto mb-32">
        <ScrollReveal type="slide-right" duration={0.8}>
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">                                                            
            <div className="w-full lg:w-1/2 aspect-[4/5] relative border border-stroke-12 overflow-hidden group rounded-sm">                                                                              
              <Image
                src="https://images.unsplash.com/photo-1596091831165-10b9c5ef7c46?w=1000&q=80"                                                                                  
                alt="Nos matières premières"
                fill
                className="object-cover transition-transform duration-[20s] group-hover:scale-110 ease-out"                                                                         
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent opacity-60" />
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-xs text-gold-100 uppercase tracking-[0.2em] mb-6 block font-medium">01 — L'Origine</span>                                                        
              <h3 className="font-serif text-4xl md:text-6xl text-paper-50 mb-8 tracking-tight">Des matières d'exception</h3>                                                                     
              <GlassCard className="p-8 md:p-10 bg-ink-900/40 backdrop-blur-sm border-l-2 border-l-gold-100/50">
                <p className="text-paper-50/80 font-light leading-relaxed mb-6 italic text-lg">     
                  Iris Pallida de Florence, absolue de Vanille de Madagascar, Vétiver fumé d'Haïti...                                                                             
                </p>
                <p className="text-paper-50/60 font-light leading-relaxed">
                  Notre sourcing se fait directement auprès des producteurs qui respectent la terre et le temps des récoltes. Ce lien direct avec la matière vivante permet à nos créations de vibrer différemment.
                </p>
              </GlassCard>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 2: L'Atelier */}
      <section className="px-6 max-w-[1400px] mx-auto mb-24">
        <ScrollReveal type="fade-up" duration={0.8}>
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-32">                                                          
            <div className="w-full lg:w-1/2 aspect-[4/5] relative border border-stroke-12 overflow-hidden group rounded-sm">                                                                              
              <Image
                src="https://images.unsplash.com/photo-1607026246836-d3c0bc2e55fa?w=1000&q=80"                                                                                  
                alt="L'Atelier de création"
                fill
                className="object-cover transition-transform duration-[20s] group-hover:scale-110 ease-out"                                                                         
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent opacity-60" />
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-xs text-gold-100 uppercase tracking-[0.2em] mb-6 block font-medium">02 — Le Geste</span>                                                         
              <h3 className="font-serif text-4xl md:text-6xl text-paper-50 mb-8 tracking-tight">Un assemblage de précision</h3>                                                                   
              <GlassCard className="p-8 md:p-10 bg-ink-900/40 backdrop-blur-sm border-l-2 border-l-gold-100/50">
                 <p className="text-paper-50/60 font-light leading-relaxed mb-6 text-lg">     
                  Chaque composition repose de longues semaines dans nos cuves. Cette période de macération lente est indispensable pour que les molécules s'entremêlent.
                </p>
                <p className="text-paper-50/60 font-light leading-relaxed">
                  L'embouteillage, l'étiquetage et le sertissage sont réalisés à la main dans notre atelier parisien, faisant de chaque flacon une pièce unique, numérotée et vérifiée.
                </p>
              </GlassCard>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </main>
  )
}


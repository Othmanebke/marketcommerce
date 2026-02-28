import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ToastContainer } from '@/components/ui/Toast'
import ChatLauncher from '@/components/chat/ChatLauncher'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Maison — Parfumerie de création',
    template: '%s | Maison',
  },
  description:
    'Des compositions précises, des matières choisies, une tenue pensée pour durer.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maison.fr'
  ),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Maison',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-ink-950 text-paper-50 font-sans antialiased">
        {/* Skip to main content (a11y) */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9998]
            focus:px-4 focus:py-2 focus:bg-gold-100 focus:text-ink-950 focus:rounded-btn
            focus:text-ui focus:font-medium
          "
        >
          Aller au contenu principal
        </a>

        <Navbar />

        <main id="main-content" className="pt-16">
          {children}
        </main>

        <Footer />
        <ChatLauncher />
        <ToastContainer />
      </body>
    </html>
  )
}

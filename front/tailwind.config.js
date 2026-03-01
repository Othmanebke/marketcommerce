/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050507',
          900: '#0A0A0F',
          850: '#0E0E14',
          800: '#14141C',
        },
        paper: {
          50: '#F5F1E8',
        },
        glass: {
          '06': 'rgba(255,255,255,0.06)',
          '08': 'rgba(255,255,255,0.08)',
          '10': 'rgba(255,255,255,0.10)',
          '14': 'rgba(255,255,255,0.14)',
        },
        stroke: {
          12: 'rgba(255,255,255,0.12)',
          18: 'rgba(255,255,255,0.18)',
          24: 'rgba(255,255,255,0.24)',
        },
        gold: {
          100: '#D6B56D',
          80:  '#C9A85C',
          '60': 'rgba(214,181,109,0.60)',
          '30': 'rgba(214,181,109,0.30)',
          '10': 'rgba(214,181,109,0.10)',
        },
        success: '#3BD18A',
        danger:  '#FF5A6A',
        warning: '#FFCC66',
      },
      fontFamily: {
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['88px',  { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['68px',  { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-md': ['52px',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['42px',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'heading-lg': ['40px',  { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'heading-md': ['32px',  { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading-sm': ['26px',  { lineHeight: '1.25' }],
        'body':       ['16px',  { lineHeight: '1.65' }],
        'ui':         ['14px',  { lineHeight: '1.5'  }],
        'caption':    ['11px',  { lineHeight: '1.4',  letterSpacing: '0.1em' }],
        'micro':      ['10px',  { lineHeight: '1.4',  letterSpacing: '0.12em' }],
      },
      borderRadius: {
        card:  '20px',
        modal: '24px',
        btn:   '14px',
        chip:  '999px',
      },
      backdropBlur: {
        soft: '12px',
        med:  '16px',
        hero: '24px',
        xl:   '32px',
      },
      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '5':  '20px',
        '6':  '24px',
        '8':  '32px',
        '10': '40px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
        '40': '160px',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out':  'cubic-bezier(0, 0, 0.2, 1)',
      },
      transitionDuration: {
        micro:  '180ms',
        reveal: '320ms',
        modal:  '240ms',
        slow:   '700ms',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        typingDot: {
          '0%, 60%, 100%': { opacity: '0.2', transform: 'translateY(0)' },
          '30%':           { opacity: '1',   transform: 'translateY(-4px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(214,181,109,0.15)' },
          '50%':      { boxShadow: '0 0 48px rgba(214,181,109,0.35)' },
        },
        goldShimmer: {
          '0%':   { backgroundPosition: '0%   center' },
          '100%': { backgroundPosition: '250% center' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleReveal: {
          from: { opacity: '0', transform: 'scale(0.94) translateY(16px)' },
          to:   { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        revealClip: {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to:   { clipPath: 'inset(0 0%   0 0)' },
        },
        counterUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer:        'shimmer 1.8s infinite linear',
        dot1:           'typingDot 800ms 0ms    infinite ease-in-out',
        dot2:           'typingDot 800ms 160ms  infinite ease-in-out',
        dot3:           'typingDot 800ms 320ms  infinite ease-in-out',
        'fade-up':      'fadeUp    0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in':      'fadeIn    0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-right':  'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float':        'float 5s ease-in-out infinite',
        'glow-pulse':   'glowPulse 3s ease-in-out infinite',
        'gold-shimmer': 'goldShimmer 6s linear infinite',
        'marquee':      'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'scale-reveal': 'scaleReveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal-clip':  'revealClip 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'counter-up':   'counterUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}

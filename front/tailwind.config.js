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
        },
        stroke: {
          12: 'rgba(255,255,255,0.12)',
          18: 'rgba(255,255,255,0.18)',
        },
        gold: {
          100: '#D6B56D',
          '60': 'rgba(214,181,109,0.60)',
          '30': 'rgba(214,181,109,0.30)',
        },
        success: '#3BD18A',
        danger: '#FF5A6A',
        warning: '#FFCC66',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['64px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['42px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-lg': ['42px', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading-md': ['32px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading-sm': ['27px', { lineHeight: '1.25' }],
        'body':       ['16px', { lineHeight: '1.65' }],
        'ui':         ['14px', { lineHeight: '1.5' }],
        'caption':    ['12px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
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
        hero: '22px',
      },
      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '6':  '24px',
        '8':  '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
        '32': '128px',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        micro:  '180ms',
        reveal: '320ms',
        modal:  '240ms',
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
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        shimmer:       'shimmer 1.8s infinite linear',
        dot1:          'typingDot 800ms 0ms    infinite ease-in-out',
        dot2:          'typingDot 800ms 160ms  infinite ease-in-out',
        dot3:          'typingDot 800ms 320ms  infinite ease-in-out',
        'fade-up':     'fadeUp    320ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in':     'fadeIn    240ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-right': 'slideInRight 240ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}

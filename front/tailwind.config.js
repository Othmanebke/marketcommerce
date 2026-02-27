module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F6F4',
        black: '#181818',
        gray: {
          light: '#E5E5E5',
          medium: '#BDBDBD'
        },
        chrome: '#C0C0C0',
        neon: '#00FFE7'
      },
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          wine: '#790C35',
          'wine-dark': '#4E0722',
          'wine-light': '#9B1B4A',
          cream: '#FFFAF1',
          gold: '#B08032',
          'gold-light': '#D4A359',
          'gold-muted': '#C89D51',
          blush: '#F9E9E7',
          'blush-soft': '#FDF5F4',
          charcoal: '#2D2327',
          sand: '#F5ECE1',
          muted: '#716569',
          dhani: {
            DEFAULT: '#9FB640',
            light: '#B6D14C',
            dark: '#688622',
            deep: '#526A18',
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(121, 12, 53, 0.06), 0 2px 6px -1px rgba(0,0,0,0.04)',
        'elevated': '0 12px 32px -4px rgba(121, 12, 53, 0.12), 0 4px 12px -2px rgba(0,0,0,0.05)',
        'gold': '0 4px 20px -2px rgba(176, 128, 50, 0.25)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}

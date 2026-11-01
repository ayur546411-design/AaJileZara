/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#14213D',
          deep: '#0B132B',
          light: '#2C4A8A',
        },
        dhani: {
          DEFAULT: '#B5D56A',
          soft: '#EEF5D8',
          dark: '#6E8F1F',
        },
        'text-main': '#1B2440',
        'text-muted': '#5B6784',
        border: '#E3E8F2',
        // Legacy brand mapping for backward compatibility
        brand: {
          wine: '#14213D',
          'wine-dark': '#0B132B',
          'wine-light': '#2C4A8A',
          cream: '#FFFFFF',
          gold: '#6E8F1F',
          'gold-light': '#B5D56A',
          'gold-muted': '#6E8F1F',
          blush: '#EEF5D8',
          'blush-soft': '#EEF5D8',
          charcoal: '#1B2440',
          sand: '#EEF5D8',
          muted: '#5B6784',
          dhani: {
            DEFAULT: '#B5D56A',
            soft: '#EEF5D8',
            dark: '#6E8F1F',
            deep: '#6E8F1F',
          }
        }
      },
      fontFamily: {
        heading: ['"Outfit"', '"Poppins"', 'sans-serif'],
        serif: ['"Outfit"', '"Poppins"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        xl: '14px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(20, 33, 61, 0.06), 0 2px 6px -1px rgba(0,0,0,0.04)',
        'elevated': '0 12px 32px -4px rgba(20, 33, 61, 0.12), 0 4px 12px -2px rgba(0,0,0,0.05)',
        'dhani': '0 4px 20px -2px rgba(181, 213, 106, 0.35)',
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: '#FFC0CB',
        lavender: '#E6E6FA',
        plum: '#673147',
        softwhite: '#F8F8FF',
      },
      fontFamily: {
        romantic: [
          'Great Vibes',
          'Dancing Script',
          'Parisienne',
          'cursive',
        ],
      },
      boxShadow: {
        glow: '0 0 16px 4px #FFC0CB88, 0 0 32px 8px #E6E6FA55',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 16px 4px #FFC0CB88, 0 0 32px 8px #E6E6FA55' },
          '50%': { boxShadow: '0 0 32px 8px #FFC0CB, 0 0 48px 16px #E6E6FA' },
        },
      },
      animation: {
        blob: 'blob 8s infinite ease-in-out',
        pulseGlow: 'pulseGlow 2s infinite',
      },
    },
  },
  plugins: [],
}


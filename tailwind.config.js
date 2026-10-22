/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        bg: '#121110',
        panel: '#1a1815',
        panel2: '#1f1c18',
        ink: '#f2ede4',
        muted: '#8f897c',
        muted2: '#5f5a50',
        amber: '#e8a33d',
        cyan: '#52d1c5',
        line: '#2c2822',
        linesoft: '#221f1a',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        sheen: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        drift1: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(60px, 40px)' },
        },
        drift2: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(-50px, -30px)' },
        },
        shine: {
          from: { left: '-60%' },
          to: { left: '120%' },
        },
        draw: {
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
        'fade-up': 'fadeUp .8s ease forwards',
        sheen: 'sheen 6s linear infinite',
        drift1: 'drift1 22s ease-in-out infinite',
        drift2: 'drift2 26s ease-in-out infinite',
        shine: 'shine .7s ease forwards',
        draw: 'draw 1s ease forwards',
      },
      backgroundSize: {
        '200%': '200% auto',
      },
      aspectRatio: {
        '4/5': '4 / 5',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.25)',
          dark: 'rgba(20, 20, 20, 0.45)',
        },
        primary: {
          light: '#f97316', // Orange 500
          dark: '#ea580c',  // Orange 600
        },
        background: {
          light: '#f5eee6',
          dark: '#0f172a',
        }
      },
      boxShadow: {
        'soft-3d': '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)',
        'soft-3d-dark': '8px 8px 16px rgba(0, 0, 0, 0.6), -8px -8px 16px rgba(30, 41, 59, 0.5)',
        'glow': '0 0 20px rgba(249, 115, 22, 0.5)',
      },
      animation: {
        'blob': 'blobmove 10s infinite alternate',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        blobmove: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(50px, -50px) scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
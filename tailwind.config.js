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
          900: '#07162c',
          850: '#0b1d3a',
          800: '#0f274d',
          700: '#173b75',
          600: '#1e4e9b',
          100: '#e8f0fe',
          50: '#f1f5fd',
        },
        teal: {
          900: '#0f4842',
          800: '#115e59',
          700: '#0f766e',
          600: '#0d9488',
          500: '#14b8a6',
          400: '#2dd4bf',
          100: '#ccfbf1',
          50: '#f0fdfa',
        },
        gold: {
          600: '#b45309',
          500: '#d97706',
          400: '#f59e0b',
          100: '#fef3c7',
        }
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

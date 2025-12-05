/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maple: {
          red: '#FF4444',
          blue: '#4A90E2',
          gold: '#FFD700',
          dark: '#1a1a2e',
          darker: '#0f0f1e',
        }
      },
      fontFamily: {
        maple: ['Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dashboard: {
          base: '#1C1917', // Deep dark brown/charcoal background
          surface: '#292524', // Slightly lighter brown for cards/panels
          accent: '#D6D3D1', // Soft beige for primary text
          muted: '#78716C', // Muted brown-grey for secondary text
          highlight: '#F59E0B', // Amber spice for active states
        }
      }
    },
  },
  plugins: [],
}
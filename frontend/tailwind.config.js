/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        devshare: {
          bg: '#0b1016',
          panel: '#121820',
          panel_hover: '#1a222c',
          blue: '#259df4',
          blue_hover: '#3ba9f5',
          text_primary: '#ffffff',
          text_secondary: '#8a9ab0',
          border: '#1f2a38',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

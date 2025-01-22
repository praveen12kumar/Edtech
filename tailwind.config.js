/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        nunito: ['Nunito', 'open-sans'],
        poppins: ['Poppins', 'open-sans'],
        roboto: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('daisyui'),
    
  ],
}
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      center:true,
    },
    colors: {
      corporative: "#0078ff",
      blanco: "#ffffff",
      gris: "#edeef0",
      azul: "#286db9",
      verdecito: "#42b72a",
      verde:"#4bb34b",
      negro: "#000",
      red: colors.rose,
      gray: colors.gray,
      form:"#f5f6f7",
      borde:"#ccd0d5",
    },
    extend: {
      fontFamily: {
        Main: ["Main", "sans-serif"],
      },
    },
    screens: {
      'xs': {'min':'360px','max':'500px'},
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: [],
};

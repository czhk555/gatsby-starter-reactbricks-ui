const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/templates/**/*.tsx',
    './src/components/**/*.tsx',
    './src/react-bricks/**/*.tsx',
    './node_modules/react-bricks-ui/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend:{
      fontFamily:{
        sans:['Nunito Sans', ...defaultTheme.fontFamily.sans]
      }
    }
  },
}
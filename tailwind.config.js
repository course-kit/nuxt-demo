const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.max-w-video': {
          'max-width': '640px',
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
  theme: {
    extend: {
      spacing: {
        'video': '640px',
      }
    }
  }
}

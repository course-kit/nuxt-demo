const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.max-w-video': {
          'max-width': '760px',
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

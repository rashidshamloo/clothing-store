const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px'
      },
      colors: {
        veryDarkPurple: '#2e2e38',
        darkPurple: '#5c5c70',
        purple: '#9d9cc9',
        lightPurple: '#dedeed',
        veryLightPurple: '#eeeefe'
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        // quicksand: ['Quicksand', 'sans-serif'],
        // lora: ['Lora', 'serif']
        lora: ['var(--lora)'],
        quicksand: ['var(--quicksand)']
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 }
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100% ': { opacity: 1, transform: 'translateY(0px)' }
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100% ': { opacity: 0 }
        }
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite',
        fadeUp: 'fadeUp 0.5s ease-out forwards',
        fadeUpDelay: '0.5s ease-out 0.25s forwards fadeUp',
        fadeOut: 'fadeOut 0.5s ease-out forwards'
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    require('tailwindcss-3d'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value
            };
          }
        },
        {
          values: theme('transitionDelay')
        }
      );
    })
  ]
};

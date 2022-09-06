const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
module.exports = {
  prefix: '',
  content: [
    'apps/back-office/online-suke/**/*.{js,jsx,ts,tsx}',
    ...createGlobPatternsForDependencies(__dirname),
    'libs/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF8FF',
          100: '#BEE3F8',
          200: '#90CDF4',
          300: '#63B3ED',
          400: '#4299E1',
          500: '#3182CE',
          600: '#2B6CB0',
          700: '#2C5282',
          800: '#115e59',
          900: '#2A4365',
          DEFAULT: '#4C51BF!important',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
        fontFamily: {
          sans: ['Graphik', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
        },
        spacing: {
          '8xl': '96rem',
          '9xl': '128rem',
        },
        borderRadius: {
          '4xl': '2rem',
        }
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/AdminPage/*',
    './src/components/Buttons/*',
    './src/components/ProfilePage/*',
    './src/components/*',
    './src/pages/*'
  ],
  theme: {
    extend: {
      minWidth: {
        '20rem': '20rem'
      },
      spacing: {
        '5px': '5px'
      },
      width: {
        '20%': '20%'
      },
      borderRadius: {
        '20px': '20px'
      },
      borderWidth: {
        '10px': '10px',
        '15px': '15px'
      },
      height: {
        '3.55': '3.55rem'
      },
      minHeight: {
        '5rem': '5rem'
      }
    },
    colors: {
      'red': '#bb4d59',
      'yellow': '#BBAF4D',
      'green': '#46b36f',
      'purple-light': '#784DBB',
      'purple-mid': '#4d59bb',
      'purple-dark': '#3A438B',
      'gray': '#636262',
      'black': '#232323',
      'white': '#ffffff'

    }

  },
  plugins: [],
};

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
        '20%': '20%',
        '17rem': '17rem',
        '18rem': '18rem',
        '25rem': '25rem',
        '26rem': '26rem',
        '27rem': '27rem',

      },
      borderRadius: {
        '20px': '20px'
      },
      borderWidth: {
        '10px': '10px',
        '15px': '15px'
      },
      height: {
        '3.55': '3.55rem',
        '17rem': '17rem',
        '18rem': '18rem',
        '30rem': '30rem',
        '34rem': '34rem',
        '90%': '90%'
      },
      minHeight: {
        '5rem': '5rem',
        '6rem': '6rem',
        '7rem': '7rem',
        '8rem': '8rem'
      },
      flexBasis: {
        '35%': '35%'
      }
    },
    colors: {
      'red': '#bb4d59',
      'red-mid': '#9F424C',
      'red-dark': '#81363E',
      'yellow': '#BBAF4D',
      'green': '#42A869',
      'purple-gaudy': '#AF4DBB',
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

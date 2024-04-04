/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        default: 'var(--default-color)',
        fade: 'var(--fade-color)',
        fader: 'var(--fader-color)',
        error: 'var(--error-color)',
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        default: 'var(--default-color)',
        fade: 'var(--fade-color)',
        fader: 'var(--fader-color)',
        error: 'var(--error-color)',
      },
    },
  },
  plugins: [],
};

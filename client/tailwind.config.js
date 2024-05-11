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
        info: 'var(--info-color)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        error: 'var(--error-color)',
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        default: 'var(--default-color)',
        fade: 'var(--fade-color)',
        fader: 'var(--fader-color)',
        info: 'var(--info-color)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        error: 'var(--error-color)',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx,js,jsx}','./node_modules/@ionic/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--ion-color-primary)',
          'contrast': 'var(--ion-color-primary-contrast)',
          'contrast-rgb': 'var(--ion-color-primary-contrast-rgb)',
          'shade': 'var(--ion-color-primary-shade)',
          'tint': 'var(--ion-color-primary-tint)'
        },
        secondary: {
          DEFAULT: 'var(--ion-color-secondary)',
          'contrast': 'var(--ion-color-secondary-contrast)',
          'contrast-rgb': 'var(--ion-color-secondary-contrast-rgb)',
          'shade': 'var(--ion-color-secondary-shade)',
          'tint': 'var(--ion-color-secondary-tint)'
        },
        tertiary: {
          DEFAULT: 'var(--ion-color-tertiary)',
          'contrast': 'var(--ion-color-tertiary-contrast)',
          'contrast-rgb': 'var(--ion-color-tertiary-contrast-rgb)',
          'shade': 'var(--ion-color-tertiary-shade)',
          'tint': 'var(--ion-color-tertiary-tint)'
        },
        success: {
          DEFAULT: 'var(--ion-color-success)',
          'contrast': 'var(--ion-color-success-contrast)',
          'contrast-rgb': 'var(--ion-color-success-contrast-rgb)',
          'shade': 'var(--ion-color-success-shade)',
          'tint': 'var(--ion-color-success-tint)'
        },
        warning: {
          DEFAULT: 'var(--ion-color-warning)',
          'contrast': 'var(--ion-color-warning-contrast)',
          'contrast-rgb': 'var(--ion-color-warning-contrast-rgb)',
          'shade': 'var(--ion-color-warning-shade)',
          'tint': 'var(--ion-color-warning-tint)'
        },
        danger: {
          DEFAULT: 'var(--ion-color-danger)',
          'contrast': 'var(--ion-color-danger-contrast)',
          'contrast-rgb': 'var(--ion-color-danger-contrast-rgb)',
          'shade': 'var(--ion-color-danger-shade)',
          'tint': 'var(--ion-color-danger-tint)'
        },
        medium: {
          DEFAULT: 'var(--ion-color-medium)',
          'contrast': 'var(--ion-color-medium-contrast)',
          'contrast-rgb': 'var(--ion-color-medium-contrast-rgb)',
          'shade': 'var(--ion-color-medium-shade)',
          'tint': 'var(--ion-color-medium-tint)'
        },
        light: {
          DEFAULT: 'var(--ion-color-light)',
          'contrast': 'var(--ion-color-light-contrast)',
          'contrast-rgb': 'var(--ion-color-light-contrast-rgb)',
          'shade': 'var(--ion-color-light-shade)',
          'tint': 'var(--ion-color-light-tint)'
        },
        dark: {
          DEFAULT: 'var(--ion-color-dark)',
          'contrast': 'var(--ion-color-dark-contrast)',
          'contrast-rgb': 'var(--ion-color-dark-contrast-rgb)',
          'shade': 'var(--ion-color-dark-shade)',
          'tint': 'var(--ion-color-dark-tint)'
        }
      }
    },
  },
  plugins: [],
}


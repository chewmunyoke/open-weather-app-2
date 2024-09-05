import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        '2xs': ['0.625rem', '1rem'],
      },
      colors: {
        primary: '#6C40B5',
        'translucent-black-20': 'color-mix(in srgb, black, transparent 20%)',
        'translucent-black-40': 'color-mix(in srgb, black, transparent 40%)',
        'translucent-black-50': 'color-mix(in srgb, black, transparent 50%)',
        'translucent-black-70': 'color-mix(in srgb, black, transparent 70%)',
        'translucent-white-20': 'color-mix(in srgb, white, transparent 20%)',
        'translucent-white-50': 'color-mix(in srgb, white, transparent 50%)',
        'translucent-white-70': 'color-mix(in srgb, white, transparent 70%)',
        'translucent-white-80': 'color-mix(in srgb, white, transparent 80%)',
      },
      keyframes: {
        'fade-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0rem)' },
        },
      },
      animation: {
        'fade-slide-up-ease': 'fade-slide-up 500ms ease both',
      },
    },
  },
  plugins: [],
};
export default config;

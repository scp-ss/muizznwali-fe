import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideUp': 'slideUp 0.4s ease-out',
        'slideUp-delay-1': 'slideUp 0.4s ease-out 0.1s',
        'slideUp-delay-2': 'slideUp 0.4s ease-out 0.2s',
        'slideUp-delay-3': 'slideUp 0.4s ease-out 0.3s',
        'slideUp-delay-4': 'slideUp 0.4s ease-out 0.4s',
        'slideUp-delay-5': 'slideUp 0.4s ease-out 0.5s',
        'slideUp-delay-6': 'slideUp 0.4s ease-out 0.6s',
        'slideUp-delay-7': 'slideUp 0.4s ease-out 0.7s',
        'slideUp-delay-8': 'slideUp 0.4s ease-out 0.8s',
        'slideUp-delay-9': 'slideUp 0.4s ease-out 0.9s',
        'slideUp-delay-10': 'slideUp 0.4s ease-out 1.0s',
        'slideDown': 'slideDown 0.3s ease-out',
        'checkmark': 'checkmark 0.4s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        checkmark: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

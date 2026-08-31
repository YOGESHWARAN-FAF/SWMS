/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neu: {
          bg: '#eaf1ec',
          surface: '#edf5f0',
          dark: '#c7d6cd',
          light: '#ffffff',
          accent: '#10b981',
          accentDark: '#059669',
          accentLight: '#34d399',
        },
        eco: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neu-flat': '8px 8px 18px rgba(175, 194, 182, 0.5), -8px -8px 18px rgba(255, 255, 255, 0.95)',
        'neu-flat-sm': '4px 4px 10px rgba(175, 194, 182, 0.45), -4px -4px 10px rgba(255, 255, 255, 0.95)',
        'neu-pressed': 'inset 4px 4px 8px rgba(175, 194, 182, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.9)',
        'neu-pressed-sm': 'inset 2px 2px 5px rgba(175, 194, 182, 0.45), inset -2px -2px 5px rgba(255, 255, 255, 0.9)',
        'neu-convex': '6px 6px 14px rgba(175, 194, 182, 0.4), -6px -6px 14px rgba(255, 255, 255, 0.95)',
        'neu-emerald': '6px 6px 16px rgba(16, 185, 129, 0.25), -6px -6px 16px rgba(255, 255, 255, 0.9)',
        'neu-rose': '6px 6px 16px rgba(244, 63, 94, 0.25), -6px -6px 16px rgba(255, 255, 255, 0.9)',
      },
    },
  },
  plugins: [],
}

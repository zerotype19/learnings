/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { 
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        ink: '#0B0D12'
      },
      borderRadius: {
        'DEFAULT': '1rem',
        '2xl': '1rem'
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0,0,0,.05)'
      }
    } 
  },
  plugins: []
};

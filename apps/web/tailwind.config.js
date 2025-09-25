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
          DEFAULT: '#6B5BFA', // violet
          50: '#F3F2FF',
          100: '#E8E6FF',
          200: '#CEC8FF',
          300: '#B1A6FF',
          400: '#8C7BFF',
          500: '#6B5BFA',
          600: '#5A4BE0',
          700: '#4B3EC0',
          800: '#3D339B',
          900: '#312A7B'
        },
        accent: {
          pink: '#F472B6',
          sky: '#38BDF8',
          lime: '#A3E635',
          amber: '#F59E0B'
        },
        ink: '#0B0D12'
      },
      borderRadius: {
        'DEFAULT': '1rem',
        '2xl': '1rem',
        'xl2': '1.25rem' // nicer than lg/2xl
      },
      boxShadow: {
        'soft': '0 10px 30px -12px rgba(2,6,23,0.18)',
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      }
    } 
  },
  plugins: []
};

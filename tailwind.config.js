/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Times New Roman', 'serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'luxury-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'luxury-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'luxury-base': ['1rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
        'luxury-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'luxury-xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
        'luxury-2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        'luxury-3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'luxury-4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'luxury-5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'luxury-6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        'luxury-tight': '-0.02em',
        'luxury-normal': '-0.01em',
        'luxury-wide': '0.025em',
        'luxury-wider': '0.05em',
      },
      lineHeight: {
        'luxury-tight': '1.2',
        'luxury-snug': '1.4',
        'luxury-normal': '1.6',
        'luxury-relaxed': '1.7',
      },
    },
  },
  plugins: [],
}
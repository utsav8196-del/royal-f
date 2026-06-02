/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a8a', // deep blue
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#1e293b',
        },
        muted: {
          DEFAULT: '#f8fafc',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#f8fafc',
          foreground: '#1e293b',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#1e3a8a',
        background: '#ffffff',
        foreground: '#0f172a',
        card: '#ffffff',
        'card-foreground': '#0f172a',
        popover: '#ffffff',
        'popover-foreground': '#0f172a',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}
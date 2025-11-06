module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Provided Color Palette
        'black-primary': '#000000',
        'black-secondary': '#211F20',
        'blue-accent': '#0736FE',
        'off-white': '#F3F3F1',

        // Mapped to Shadcn/Tailwind defaults
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        tertiary: { // Using tertiary for the accent blue
          DEFAULT: "var(--color-tertiary)",
          foreground: "var(--color-tertiary-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },
        // Existing semantic colors (adjust if needed based on new palette)
        success: "hsl(142, 71%, 45%)", // Keep green for success
        warning: "hsl(38, 92%, 50%)", // Keep orange for warning
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)", // Keep red for destructive
          foreground: "hsl(0, 0%, 100%)",
        },
        gray: { // Adjusted gray scale for lighter theme
          50: "hsl(0, 0%, 98%)",
          100: "hsl(0, 0%, 94%)",
          200: "hsl(0, 0%, 88%)",
          300: "hsl(0, 0%, 74%)",
          400: "hsl(0, 0%, 60%)",
          500: "hsl(0, 0%, 46%)",
          600: "hsl(0, 0%, 34%)",
          700: "hsl(0, 0%, 22%)",
          800: "hsl(0, 0%, 14%)",
          900: "hsl(0, 0%, 6%)",
        },
      },
      fontFamily: {
        // New fonts
        'fuji-bold': ['Fuji Bold', 'sans-serif'],
        'fuji-medium': ['Fuji Medium', 'sans-serif'],
        'pp-machina-plain-regular': ['PP Neue Machina Plain Regular', 'sans-serif'],
        'pp-machina-inktrap-light-italic': ['PP Neue Machina Inktrap Light Italic', 'sans-serif'],
        
        // Default sans to PP Neue Machina Plain Regular for body text
        sans: ['PP Neue Machina Plain Regular', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'], // Keep mono if needed
      },
      borderRadius: {
        lg: "8px", // Consistent with the image
        md: "6px",
        sm: "4px",
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      backgroundImage: {
        'gradient-radial': 'none',
        'gradient-mesh': 'none',
        'card-gradient': 'none',
      },
      boxShadow: {
        'glow': 'none',
        'glow-lg': 'none',
        'card': '0 1px 2px rgba(0, 0, 0, 0.05)', // Very subtle shadow
        'card-hover': '0 2px 8px rgba(0, 0, 0, 0.08)', // Slightly more on hover
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

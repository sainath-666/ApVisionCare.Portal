import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        brand: {
          blue: "rgb(var(--brand-blue-rgb) / <alpha-value>)",
          red: "rgb(var(--brand-red-rgb) / <alpha-value>)",
          gray: "rgb(var(--brand-gray-rgb) / <alpha-value>)",
        },
        primary: {
          50: "rgb(var(--primary-50-rgb) / <alpha-value>)",
          100: "rgb(var(--primary-100-rgb) / <alpha-value>)",
          200: "rgb(var(--primary-200-rgb) / <alpha-value>)",
          300: "rgb(var(--primary-300-rgb) / <alpha-value>)",
          400: "rgb(var(--primary-400-rgb) / <alpha-value>)",
          500: "rgb(var(--primary-500-rgb) / <alpha-value>)",
          600: "rgb(var(--primary-600-rgb) / <alpha-value>)",
          700: "rgb(var(--primary-700-rgb) / <alpha-value>)",
          800: "rgb(var(--primary-800-rgb) / <alpha-value>)",
          900: "rgb(var(--primary-900-rgb) / <alpha-value>)",
          DEFAULT: "rgb(var(--brand-blue-rgb) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground))",
        },
        danger: {
          50: "rgb(var(--danger-50-rgb) / <alpha-value>)",
          100: "rgb(var(--danger-100-rgb) / <alpha-value>)",
          200: "rgb(var(--danger-200-rgb) / <alpha-value>)",
          500: "rgb(var(--danger-500-rgb) / <alpha-value>)",
          600: "rgb(var(--danger-600-rgb) / <alpha-value>)",
          700: "rgb(var(--danger-700-rgb) / <alpha-value>)",
          DEFAULT: "rgb(var(--brand-red-rgb) / <alpha-value>)",
        },
        neutral: {
          50: "rgb(var(--neutral-50-rgb) / <alpha-value>)",
          100: "rgb(var(--neutral-100-rgb) / <alpha-value>)",
          200: "rgb(var(--neutral-200-rgb) / <alpha-value>)",
          300: "rgb(var(--neutral-300-rgb) / <alpha-value>)",
          400: "rgb(var(--neutral-400-rgb) / <alpha-value>)",
          500: "rgb(var(--neutral-500-rgb) / <alpha-value>)",
          600: "rgb(var(--neutral-600-rgb) / <alpha-value>)",
          700: "rgb(var(--neutral-700-rgb) / <alpha-value>)",
          800: "rgb(var(--neutral-800-rgb) / <alpha-value>)",
          900: "rgb(var(--neutral-900-rgb) / <alpha-value>)",
          DEFAULT: "rgb(var(--brand-gray-rgb) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          light: "rgb(var(--accent-light-rgb) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;

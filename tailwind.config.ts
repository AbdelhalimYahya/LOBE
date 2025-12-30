import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        // Brand colors - using CSS variables
        brand: {
          primary: "var(--brand-primary)",
          "primary-light-bg": "var(--brand-primary-light-bg)",
          "buttons-status-default": "var(--brand-buttons-status-default)",
          "buttons-status-hover": "var(--brand-buttons-status-hover)",
          "buttons-status-disabled": "var(--brand-buttons-status-disabled)",
          "buttons-status-focus-border":
            "var(--brand-buttons-status-focus-border)",
        },
        // Natural colors - using CSS variables
        natural: {
          white: "var(--natural-white)",
          "light-border": "var(--natural-light-border)",
          "default-border": "var(--natural-default-border)",
          "input-hint": "var(--natural-input-hint)",
          "helper-text": "var(--natural-helper-text)",
          "subtext-description": "var(--natural-subtext-description)",
          "primary-text": "var(--natural-primary-text)",
        },
        // Status colors - using CSS variables
        status: {
          error: "var(--status-error)",
          "light-red": "var(--status-light-red)",
          warning: "var(--status-warning)",
          "light-yellow": "var(--status-light-yellow)",
          success: "var(--status-success)",
          "light-green": "var(--status-light-green)",
        },
        // Legacy support - map to new variables for backward compatibility
        primary: {
          50: "#f8e6ef",
          100: "#f1cddf",
          200: "#e8b4cf",
          300: "#e09bc0",
          400: "#d682b0",
          500: "var(--brand-primary)", // Main brand color
          600: "#a75784",
          700: "#834668",
          800: "#61364e",
          900: "#412635",
          950: "#24171e",
          DEFAULT: "var(--brand-primary)", // Default to brand-primary
        },
        // Semantic color mappings (using CSS variables)
        accent: {
          DEFAULT: "var(--brand-primary)",
        },
        // Foreground colors for text on colored backgrounds
        "primary-foreground": {
          DEFAULT: "var(--natural-white)",
        },
        // Background and text colors - using CSS variables
        background: {
          DEFAULT: "var(--natural-white)",
          secondary: "#f8f9fa",
        },
        foreground: {
          DEFAULT: "#000000",
          secondary: "var(--natural-helper-text)",
          // Input text color from Figma
          muted: "var(--natural-primary-text)",
        },
        // Border color - using CSS variables
        border: {
          DEFAULT: "var(--natural-light-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-rubik)", "sans-serif"],
      },
      boxShadow: {
        // TODO: Add shadows matching Figma elevation
        // Will be populated when inspecting Figma design
      },
      borderRadius: {
        // Input border radius from Figma: 8px
        input: "8px",
        // Standard Tailwind rounded-lg is 8px, so we can use that
        // Add custom radii if needed for other components
      },
      letterSpacing: {
        // TODO: Match Figma tracking values
        // Will be populated when inspecting Figma design
      },
      spacing: {
        // Custom spacing values from Figma spacing system
        // Most spacing values are covered by Tailwind's default scale
        // Adding custom values that aren't in the default scale
        "13": "52px", // Custom spacing (not in default Tailwind scale)
        "15": "60px", // Custom spacing (not in default Tailwind scale)
        // Note: Tailwind default spacing scale covers:
        // 1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 7=28px, 8=32px,
        // 9=36px, 10=40px, 11=44px, 12=48px, 14=56px, 16=64px
      },
    },
  },
  plugins: [],
} satisfies Config;

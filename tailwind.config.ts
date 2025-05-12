import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        cormorant: ['"Cormorant Garamond"', "serif"],
        inter: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
        cinzel: ["Cinzel", "serif"],
        mont: ["Montserrat", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        constellation: {
          dark: "#000814",
          navy: "#001d3d",
          purple: "#a970ff",
          blue: "#4dd6ff",
          glow: "#f1e7fe",
          star1: "#ffffff",
          star2: "#b5cfff",
          star3: "#e0d0ff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": {
            textShadow:
              "0 0 8px rgba(255,255,255,0.3), 0 0 12px rgba(203,174,255,0.3)",
          },
          "50%": {
            textShadow:
              "0 0 8px rgba(255,255,255,0.3), 0 0 16px rgba(203,174,255,0.5)",
          },
        },
        "nebula-drift": {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-5px, -5px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "shooting-star": {
          "0%": {
            transform: "translateX(0) translateY(0)",
            opacity: "0",
            width: "1px",
          },
          "50%": {
            opacity: "1",
            width: "100px",
            boxShadow: "0 0 20px 4px rgba(255, 255, 255, 0.8)",
          },
          "100%": {
            transform: "translateX(100px) translateY(50px)",
            opacity: "0",
            width: "50px",
          },
        },
        "parallax-drift-slow": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-2px, 2px)" },
          "50%": { transform: "translate(-4px, -2px)" },
          "75%": { transform: "translate(-1px, -3px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "parallax-drift-medium": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-5px, 5px)" },
          "50%": { transform: "translate(-10px, -5px)" },
          "75%": { transform: "translate(-3px, -8px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "parallax-drift-fast": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-8px, 8px)" },
          "50%": { transform: "translate(-15px, -10px)" },
          "75%": { transform: "translate(-5px, -15px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "drift-slow": {
          "0%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(5px, 2px)" },
          "66%": { transform: "translate(-3px, 4px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "drift-medium": {
          "0%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(8px, -5px)" },
          "66%": { transform: "translate(-6px, 7px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "drift-fast": {
          "0%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(12px, -8px)" },
          "66%": { transform: "translate(-10px, 10px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "twinkle-fast": "twinkle 2s ease-in-out infinite",
        "twinkle-slow": "twinkle 5s ease-in-out infinite",
        "twinkle-slower": "twinkle 8s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease-out",
        glow: "glow 2s ease-in-out infinite",
        "nebula-drift": "nebula-drift 20s ease-in-out infinite",
        "shooting-star": "shooting-star 1s ease-out",
        "parallax-slow": "parallax-drift-slow 40s ease-in-out infinite",
        "parallax-medium": "parallax-drift-medium 30s ease-in-out infinite",
        "parallax-fast": "parallax-drift-fast 20s ease-in-out infinite",
        "drift-slow": "drift-slow 60s ease-in-out infinite",
        "drift-medium": "drift-medium 45s ease-in-out infinite",
        "drift-fast": "drift-fast 30s ease-in-out infinite",
      },
      backgroundImage: {
        "starry-sky": "linear-gradient(to bottom, #000814 0%, #001d3d 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

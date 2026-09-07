import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gt: {
          dark: "#0a0e17",
          darker: "#06090e",
          card: "#111827",
          cardHover: "#172238",
          cardBorder: "#1f293d",
          dirt: "#875228",
          dirtDark: "#5c3619",
          grass: "#59a82d",
          grassLight: "#72d13b",
          sky: "#3a7bd5",
          wl: "#10b981",
          dl: "#f59e0b",
          bgl: "#06b6d4",
          legacy: "#f97316",
          gmail: "#3b82f6",
          purple: "#a855f7",
          crimson: "#ef4444"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        pixel: ["var(--font-pixel)", "monospace"],
        pixelHeading: ["var(--font-silkscreen)", "monospace"]
      },
      boxShadow: {
        "pixel-sm": "2px 2px 0px 0px rgba(0,0,0,0.6)",
        "pixel": "4px 4px 0px 0px rgba(0,0,0,0.7)",
        "pixel-lg": "6px 6px 0px 0px rgba(0,0,0,0.8)",
        "pixel-amber": "4px 4px 0px 0px #b45309",
        "pixel-blue": "4px 4px 0px 0px #1d4ed8",
        "pixel-green": "4px 4px 0px 0px #047857",
        "glow-dl": "0 0 20px rgba(245, 158, 11, 0.35)",
        "glow-bgl": "0 0 25px rgba(6, 182, 212, 0.4)",
        "glow-wl": "0 0 20px rgba(16, 185, 129, 0.35)",
      },
      animation: {
        "float": "floating 3s ease-in-out infinite",
        "float-slow": "floating 6s ease-in-out infinite",
        "bounce-pixel": "bouncePixel 0.6s infinite alternate",
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "cloud-drift": "cloudDrift 45s linear infinite",
        "cloud-drift-reverse": "cloudDriftReverse 60s linear infinite",
      },
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        bouncePixel: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        cloudDrift: {
          "0%": { transform: "translateX(-15%)" },
          "100%": { transform: "translateX(115%)" },
        },
        cloudDriftReverse: {
          "0%": { transform: "translateX(115%)" },
          "100%": { transform: "translateX(-15%)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;

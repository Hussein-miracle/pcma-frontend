import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: "#0074FF",
        secondary: {
          green: '#01F971',
          black: "#262535",
          blue: '#4169E1',
        },
        neutral: {
          white: "#FFFFFF",
          black: "#000",
        },
        grey: {
          '10': "#F7F9FD",
          '30': "#D7E1F4",
          '60': '#6882B6',
          '70': '#4C689E',
          '80': '#3C517C',
          '90':"#2B3B5A",
          '100': "#1B2437",

        },
        danger:{
          "1": '#FF00000D',
          "2" :'#D60B0B'
        }
        
      }
    },

  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
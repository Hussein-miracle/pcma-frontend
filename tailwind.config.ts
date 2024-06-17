import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        primary:"#0074FF",
        secondary:{
          green:'#01F971',
          black:"#262535",
          blue:'#4169E1',
        },
        neutral:{
          white:"#FFFFFF",
          black:"#000",
        },
        grey:{
          '10':"#F7F9FD",
          '30':"#D7E1F4",
          '70':'#4C689E',
        }
      }
    },
  },
  plugins: [],
};
export default config;

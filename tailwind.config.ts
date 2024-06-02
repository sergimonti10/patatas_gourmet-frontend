import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, rgba(254, 243, 199, 0.8), rgba(254, 243, 199, 0))',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': {
          '50': '#f3f8ff',
          '100': '#e4f0ff',
          '200': '#c5e1ff',
          '300': '#a9d5ff',
          '400': '#8bc0ff',
          '500': '#6fa8ff',
          '600': '#4f8fff',
          '700': '#3666ff',
          '800': '#1a4cff',
          '900': '#0029ff',
          '950': '#0012ff',
        }
      },
      boxShadow: {
        'glow-amber': '0 0 10px 2px rgba(255, 236, 217, 0.7)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;

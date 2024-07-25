import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        instrument: ['"Instrument Sans", sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#633CFF",
          100: "#EFEBFF",
          200: "#BEADFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;

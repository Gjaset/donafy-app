import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        donafy: {
          dark: "#1F4D3A",
          light: "#7BAF7F",
          cream: "#F2F5F1",
          gray: "#BDBDBD",
          text: "#2E2E2E",
        },
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#A8D5BA",
        secondary: "#C9B8E4",
        accent: "#F9E4C8",
        background: {
          light: "#FFFFFF",
          dark: "#1A1A1A",
        },
        text: {
          light: "#333333",
          dark: "#FFFFFF",
        },
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};

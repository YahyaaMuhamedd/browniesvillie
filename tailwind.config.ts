const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "var(--main-color)",
        secondaryColor: "var(--secondary-color)",
        borderColor: "var(--border-color)"
      },
    },
  },
  plugins: [flowbite.plugin()],
};
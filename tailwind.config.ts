/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "var(--main-color)",
        background: "var(--background)",
        bgSecondColor: "var(--bg-second-color)",
        secondColor: "var(--second-color)",
        color: "var(--border-color)",
        hoverColor: "var(--hover-color)"
      },
    },
  },
  safelist: [
    'bg-background',
    'bg-mainColor',
    'bg-bgSecondColor',
    'bg-secondColor',
    'text-mainColor',
    'text-secondColor',
    'border-color',
    'hover:bg-hoverColor',
    'text-[#BEB9B6]',
    'bg-[#0000006d]',
    { pattern: /.*/ }

  ],
  plugins: [],
};

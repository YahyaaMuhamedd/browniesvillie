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
        background: "var(--background)",
        bgSecondColor: "var(--bg-second-color)",
        mainColor: "var(--main-color)",
        borderColor: "var(--border-color)",
        secondColor: "var(--second-color)",
        color: "var(--border-color)"
      },
    },
  },
  safelist: [
    'text-mainColor',
    'bg-mainColor',
    'text-[#B15D26]',
    'bg-[#BEB9B6]',
    'text-[#BEB9B6]',
    'bg-[#0000006d]',
    'bg-bgSecondColor',
    'border-color',
    { pattern: /.*/ }

  ],
  plugins: [],
};

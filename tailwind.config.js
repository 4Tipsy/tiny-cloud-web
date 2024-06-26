/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      glc: "#434343", // gray lining color
      mg1: "#282828", // main gray 1 (lighter)
      mg2: "#1F1F1F", // main gray 2
      hlc: "#FF48ED", // highlight color
      ntw: "#FFFFFF", // not that white
      erc: "#FF4949", // error red color
      shd: "rgba(0, 0, 0, 0.7)" // semi-transparent black
    },
  },
  plugins: [],
}


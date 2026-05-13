module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-barlow)", "Barlow", "sans-serif"],
        body:    ["var(--font-barlow)", "Barlow", "sans-serif"],
      },
      colors: {
        coral: "#e8604a",
      },
      letterSpacing: {
        tightest: "-0.06em",
        tighter2: "-0.04em",
      },
    },
  },
  plugins: [],
};

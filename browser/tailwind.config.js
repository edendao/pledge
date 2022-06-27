// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Roboto Mono", "monospace"],
      },
      screens: {
        "3xl": "1800px",
      },
    },
  },
  plugins: [],
  variants: {
    extend: { backgroundColor: ["disabled"] },
  },
}

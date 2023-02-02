module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans - serif"],
    },
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(60%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        slide: "slide 200ms ease-in-out normal",
      },
    },
  },
};

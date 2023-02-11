module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["dark"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
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

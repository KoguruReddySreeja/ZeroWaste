/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        badgePop: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        twinkleOnce: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        beatOnce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        badgePop: "badgePop 1s ease-in-out",
        twinkleOnce: "twinkleOnce 1s ease-in-out",
        beatOnce: "beatOnce 1s ease-in-out",
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Matches the built dashboard's actual accent (RiskBadge/nav highlight
        // uses amber-400/500) instead of an unrelated teal  this is the fix
        // that makes the landing page and the product look like one thing.
        canvas: "#FAFAF7",
        ink: "#0F172A",
        muted: "#64748B",
        primary: "#F59E0B",
      },
      fontFamily: {
        // A display face with actual character, used only for headlines 
        // body copy stays on Inter (already wired via style.css).
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 70px rgba(15, 23, 42, 0.08)",
        card: "0 18px 45px rgba(15, 23, 42, 0.07)",
      },
    },
  },
  plugins: [],
};
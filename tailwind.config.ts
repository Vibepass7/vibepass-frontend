import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F1",
        surface: "#FFFFFF",
        ink: "#1B1814",
        muted: "#73695B",
        faint: "#A89E8E",
        line: "#E7E0D3",
        accent: {
          DEFAULT: "#C24A26",
          soft: "#F4E4D8",
          ink: "#9A3B1E",
        },
        pine: "#2E4A3E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(27,24,20,0.04), 0 8px 24px -12px rgba(27,24,20,0.10)",
        lift: "0 2px 4px rgba(27,24,20,0.05), 0 18px 40px -16px rgba(27,24,20,0.18)",
      },
      maxWidth: {
        shell: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;

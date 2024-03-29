const generateGridUtils = () => ({
  ...(() => {
    let newPaddingUtilities = {};
    for (let i = 1; i <= 12; i++) {
      newPaddingUtilities[`g-x-${i}`] = `calc(var(--grid-width) * ${i})`;
      newPaddingUtilities[`g-y-${i}`] = `calc(var(--grid-height) * ${i})`;
      for (let j = 1; j < 8; j++) {
        newPaddingUtilities[`g-x-${i}-${j}/8`] =
          `calc(var(--grid-width) * ${(i + j / 8).toFixed(3)})`;
        newPaddingUtilities[`g-y-${i}-${j}/8`] =
          `calc(var(--grid-height) * ${(i + j / 8).toFixed(3)})`;
      }
    }
    for (let j = 1; j < 8; j++) {
      newPaddingUtilities[`g-x-${j}/8`] =
        `calc(var(--grid-width) * ${(j / 8).toFixed(3)})`;
      newPaddingUtilities[`g-y-${j}/8`] =
        `calc(var(--grid-height) * ${(j / 8).toFixed(3)})`;
    }
    return newPaddingUtilities;
  })(),
  gap: "var(--x-padding) var(--y-padding)",
  gapx: "var(--x-padding)",
  gapy: "var(--y-padding)",
});

const propertyUtilities = (properties) =>
  properties.reduce((acc, property) => {
    acc[property] = generateGridUtils();
    return acc;
  }, {});

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "3xl": "1800px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      display: ["NeueMontreal"],
      power: ["PowerGroteskTrialLight"],
      favorit: ["Favorit"],
      apercu: ["Apercu"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      gridTemplateRows: {
        18: "repeat(18, minmax(0, 1fr))",
      },
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        grid: ["var(--grid-height)", "var(--grid-height)"],
      },
      ...propertyUtilities(["padding", "margin", "height", "width", "spacing"]),
    },
  },
  plugins: [require("tailwindcss-animate")],
};

import type { Config } from "tailwindcss";
// import radixThemePlugin from "radix-ui-themes-with-tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // radixThemePlugin({
    //   useTailwindColorNames: true, // optional
    //   useTailwindRadiusNames: true, // optional
    //   mapMissingTailwindColors: true, // optional
    // })
  ],
};
export default config;

// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}', // For pages
    './src/components/**/*.{js,ts,jsx,tsx}', // For components
    './src/app/**/*.{js,ts,jsx,tsx}', // If using Next.js app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

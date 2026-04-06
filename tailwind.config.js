/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This ensures all folders under src are scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


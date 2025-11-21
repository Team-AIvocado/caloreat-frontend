/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
            main_background:'#F4F6FA',
            main_color : '#3A7DFF',
            border_color: '#DCDCDC',
      },
    },
  },
  plugins: [],
};


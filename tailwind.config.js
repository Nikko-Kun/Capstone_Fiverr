/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      nunito: ["Nunito Sans", "sans-serif"],
      sans: ["Source Sans Pro", "sans-serif"],
      playfair: ["Playfair Display", "serif"],
      rubik: ["Rubik", "sans-serif"],
      ara: ["Arapey", "serif"],
      ass: ["Assistant", "sans-serif"],
      domi: ["Domine", "serif"],
      hind: ["Hind Vadodara", "sans-serif"],
    },
    fontSize: {
      "font-10": "0.625rem",
      "font-14": "0.875rem",
      "font-18": "1.125rem",
      "font-20": "1.25rem",
      "font-30": "1.875rem",
      "font-32": "2rem",
      "font-48": "3rem",
    },
    colors: {
      "color-green-light": "#1dbf73",
      "color-green": "#19a463",
      "color-black": "#222325",
      "color-black-light": "#404145",
      "color-gray": "#74767e",
      "color-gray-1" : "#f7f7f7",
      "color-gray-2" : "#dadbdd",
      "color-gray-light": "#62646a",
      "color-gray-light-2": "#b5b6ba",
      "color-white": "#fff",
      "color-white-light": "#e4e5e7",
      "color-white-light-2": "#fafafa",
      "color-green-dark": "#003912",
      "color-green-light-2" : "#f1fdf7",
      "color-puple-dark": "#0d084d",
      "color-puple": " #1e1692",
      "color-puple-light": "#446ee7",
      "color-red" : "red"
    },
    backgroundImage: {
      carousel1: "url(../assets/images/bg-hero-4-1792-x2.png)",
      carousel2: "url(../assets/images/bg-hero-5-1792-x2.png)",
      carousel3: "url(../assets/images/bg-signup-1400-x1.png)",
      btn_play: "url(https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/desktop-play-button.bab1740.png)",
    },
    // screens: {
    //   'mobile' : '300px',
    //   'tablet': '640px',
    //   'laptop': '1024px',
    //   'desktop': '1280px',
    // },
    
  },
  plugins: [],
};

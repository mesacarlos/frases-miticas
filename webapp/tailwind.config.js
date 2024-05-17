/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            backgroundColor: {
                "dark-mode": "#171717",
                "light-mode": "#B5C0D0",
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                white: "#ffffff",
                purple: "#3f3cbb",
                midnight: "#121063",
                metal: "#565584",
                tahiti: "#3ab7bf",
                silver: "#ecebff",
                "bubble-gum": "#ff77e9",
                bermuda: "#78dcca",
                red: "#CC1212",
                light: "#3F51B5"
            },
        },
    },
    plugins: [],
};

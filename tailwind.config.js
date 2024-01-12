/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
            },
            backgroundColor: {
                board: '#F3F4F6',
            },
            boxShadow: {
                board: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                task: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            },
        },
    },
    plugins: [],
};

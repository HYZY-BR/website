/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1.25rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
        extend: {
            colors: {
                orange: {
                    primary: '#F77028',
                },
                space: '#0E0E0F',
                tech: '#1C1C20',
                charcoal: '#1B1B1E',
                'gray-light': '#F3F3F5',
                'gray-medium': '#6E6E73',
                'gray-tech': '#1C1C20',
                'gray-neutral': '#B8B8BA',
            },
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

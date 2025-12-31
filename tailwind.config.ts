import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Light mode colors
                background: "var(--background)",
                foreground: "var(--foreground)",

                // Dark mode optimized colors
                dark: {
                    bg: '#0A0E1A',
                    surface: '#141B2D',
                    card: '#1A2332',
                    border: '#2D3748',
                    hover: '#1F2937',
                },

                light: {
                    bg: '#F8FAFC',
                    surface: '#FFFFFF',
                    card: '#FFFFFF',
                    border: '#E2E8F0',
                    hover: '#F1F5F9',
                },

                primary: {
                    DEFAULT: '#6366F1',
                    50: '#EEF2FF',
                    100: '#E0E7FF',
                    200: '#C7D2FE',
                    300: '#A5B4FC',
                    400: '#818CF8',
                    500: '#6366F1',
                    600: '#4F46E5',
                    700: '#4338CA',
                    800: '#3730A3',
                    900: '#312E81',
                },

                text: {
                    DEFAULT: '#F1F5F9',
                    muted: '#CBD5E1',
                    light: '#0F172A',
                    'light-muted': '#475569',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'dark-gradient': 'linear-gradient(to bottom right, #0A0E1A, #141B2D)',
                'light-gradient': 'linear-gradient(to bottom right, #F8FAFC, #FFFFFF)',
            },
            boxShadow: {
                'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
                'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
                'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
                'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
                'glow-lg': '0 0 30px rgba(99, 102, 241, 0.4)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            transitionProperty: {
                'colors': 'background-color, border-color, color, fill, stroke',
            },
            transitionDuration: {
                '300': '300ms',
            },
        },
    },
    plugins: [],
};

export default config;

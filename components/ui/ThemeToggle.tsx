'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
    const { theme } = useTheme();

    return (
        <button
            className="relative w-14 h-7 rounded-full bg-dark-surface transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg cursor-default"
            aria-label="Dark mode active"
            disabled
        >
            <div
                className="absolute top-0.5 right-0.5 w-6 h-6 rounded-full bg-primary-500 shadow-md flex items-center justify-center"
            >
                <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            </div>
        </button>
    );
}

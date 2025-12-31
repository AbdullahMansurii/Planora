import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
    return (
        <div
            className={`bg-white dark:bg-dark-card rounded-xl shadow-sm dark:shadow-dark-md border border-gray-200/50 dark:border-dark-border/50 p-6 transition-all duration-300 ${hover ? 'hover:shadow-md dark:hover:shadow-dark-lg hover:border-primary-200 dark:hover:border-primary-800 glow-on-hover' : ''
                } ${className}`}
        >
            {children}
        </div>
    );
}

import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-text dark:text-text mb-2">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-dark-surface text-gray-900 dark:text-text placeholder-gray-400 dark:placeholder-text-muted border-gray-300 dark:border-dark-border focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-text dark:text-text mb-2">
                    {label}
                </label>
            )}
            <textarea
                className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-dark-surface text-gray-900 dark:text-text placeholder-gray-400 dark:placeholder-text-muted border-gray-300 dark:border-dark-border focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

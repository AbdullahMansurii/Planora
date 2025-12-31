'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { user, signOut } = useAuth();
    const pathname = usePathname();

    // Don't show navbar on auth pages
    if (pathname === '/login' || pathname === '/signup') {
        return null;
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-border shadow-sm dark:shadow-dark-md transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-primary-500 dark:bg-primary-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <span className="text-xl font-semibold text-text-light dark:text-text">Planora</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/#how-it-works"
                            className="text-text-light-muted dark:text-text-muted hover:text-text-light dark:hover:text-text transition-colors"
                        >
                            How it works
                        </Link>
                        <Link
                            href="/#pricing"
                            className="text-text-light-muted dark:text-text-muted hover:text-text-light dark:hover:text-text transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/#resources"
                            className="text-text-light-muted dark:text-text-muted hover:text-text-light dark:hover:text-text transition-colors"
                        >
                            Resources
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-text-light-muted dark:text-text-muted hover:text-text-light dark:hover:text-text transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={signOut}
                                    className="px-4 py-2 text-sm font-medium text-text-light-muted dark:text-text-muted hover:text-text-light dark:hover:text-text transition-colors"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-text-light-muted dark:text-text-muted hover:text-text-light dark:hover:text-text transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 text-sm font-medium text-white bg-primary-500 dark:bg-primary-600 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors shadow-md hover:shadow-glow"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

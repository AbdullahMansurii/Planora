'use client';

import { useState, useEffect } from 'react';
import { sectionsConfig } from '@/components/generate/sectionConfig';

interface SidebarProps {
    isGenerating: boolean;
    hasPlan: boolean;
}

export default function Sidebar({ isGenerating, hasPlan }: SidebarProps) {
    const [activeSection, setActiveSection] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!hasPlan) return;

        // Intersection Observer for active section highlighting
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -66% 0px',
            }
        );

        // Observe all section elements
        sectionsConfig.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [hasPlan]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navbarHeight = 64;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
            setIsOpen(false);
        }
    };

    const currentStepIndex = sectionsConfig.findIndex(s => s.id === activeSection);
    const progress = hasPlan ? ((currentStepIndex + 1) / sectionsConfig.length) * 100 : 0;

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-4 right-4 z-40 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-80 bg-dark-surface/95 backdrop-blur-xl border-r border-dark-border z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } overflow-y-auto`}
            >
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="border-b border-dark-border pb-4">
                        <h2 className="text-lg font-bold text-text mb-1">Your Business Plan</h2>
                        <p className="text-sm text-text-muted">
                            {hasPlan ? `Step ${currentStepIndex + 1} of ${sectionsConfig.length}` : 'Ready to start'}
                        </p>

                        {/* Progress Bar */}
                        {hasPlan && (
                            <div className="mt-3">
                                <div className="w-full h-2 bg-dark-hover rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary-600 to-purple-600 transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Steps List */}
                    <div className="space-y-2">
                        {sectionsConfig.map((section, index) => {
                            const isActive = section.id === activeSection;
                            const isCompleted = hasPlan && index < currentStepIndex;
                            const isLocked = !hasPlan && !isGenerating;
                            const isCurrent = hasPlan && index === currentStepIndex;

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => !isLocked && scrollToSection(section.id)}
                                    disabled={isLocked}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all group relative ${isCurrent
                                            ? 'bg-primary-600/20 border-l-4 border-primary-600 shadow-lg shadow-primary-600/20'
                                            : isCompleted
                                                ? 'bg-primary-900/10 border-l-4 border-primary-800/50 hover:bg-primary-900/20'
                                                : isLocked
                                                    ? 'bg-dark-hover/30 border-l-4 border-dark-border cursor-not-allowed opacity-50'
                                                    : 'bg-dark-hover/50 border-l-4 border-transparent hover:bg-dark-hover hover:border-primary-800/30'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Step Number/Icon */}
                                        <div
                                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCurrent
                                                    ? 'bg-primary-600 text-white'
                                                    : isCompleted
                                                        ? 'bg-primary-800/50 text-primary-300'
                                                        : isLocked
                                                            ? 'bg-dark-border text-text-muted'
                                                            : 'bg-dark-border text-text-muted group-hover:bg-primary-900/30 group-hover:text-primary-400'
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : isLocked ? (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                index + 1
                                            )}
                                        </div>

                                        {/* Step Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-base">{section.icon}</span>
                                                <h3
                                                    className={`text-sm font-semibold truncate ${isCurrent
                                                            ? 'text-primary-300'
                                                            : isCompleted
                                                                ? 'text-primary-400'
                                                                : isLocked
                                                                    ? 'text-text-muted'
                                                                    : 'text-text group-hover:text-primary-400'
                                                        }`}
                                                >
                                                    {section.title}
                                                </h3>
                                            </div>
                                            {isCurrent && (
                                                <p className="text-xs text-primary-400 mt-1">Currently viewing</p>
                                            )}
                                        </div>

                                        {/* Arrow indicator for current */}
                                        {isCurrent && (
                                            <svg className="w-5 h-5 text-primary-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Helper Text */}
                    {!hasPlan && !isGenerating && (
                        <div className="mt-6 p-4 bg-primary-900/10 border border-primary-800/30 rounded-lg">
                            <p className="text-xs text-primary-300 leading-relaxed">
                                💡 <strong>Tip:</strong> Fill out the form above and click "Generate My Business Plan" to unlock all sections
                            </p>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

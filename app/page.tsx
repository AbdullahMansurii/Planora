'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [mounted, setMounted] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const openProjectModal = (project: any) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                {/* Enhanced Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-primary-900/20" />
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/40 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-float-delayed" />
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text Content */}
                        <div className="text-center space-y-6">
                            {/* Brand Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-900/30 border border-primary-500/30 rounded-full">
                                <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-semibold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                                    Planora AI
                                </span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight">
                                Turn your startup idea into an{' '}
                                <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    investor-ready business plan
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                                Get market research, competitor analysis, and a clear launch roadmap in minutes. No consultants or spreadsheets needed.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col items-center gap-4 pt-6">
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Link
                                        href="/generate"
                                        className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white text-lg font-bold rounded-xl shadow-2xl hover:shadow-glow transition-all transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
                                    >
                                        Generate My Plan
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                    <a
                                        href="#how-it-works"
                                        className="px-8 py-4 bg-transparent hover:bg-dark-card text-text text-lg font-semibold rounded-xl border-2 border-dark-border hover:border-primary-500 transition-all"
                                    >
                                        See How It Works
                                    </a>
                                </div>

                                {/* Trust Indicators */}
                                <div className="flex items-center gap-6 text-sm text-text-muted pt-2">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Takes ~30 seconds</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span>AI-Powered</span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Line */}
                            <p className="text-xs text-primary-400/80 font-medium pt-2">
                                Built for founders, indie hackers, and early-stage teams
                            </p>
                        </div>

                        {/* Right: Floating Mockup Cards */}
                        <div className="hidden lg:block relative h-[500px]">
                            {/* Card 1 - Market Analysis */}
                            <div className="absolute top-0 right-0 w-64 animate-float">
                                <div className="bg-dark-card/80 backdrop-blur-xl rounded-2xl p-6 border border-primary-500/30 shadow-2xl shadow-primary-600/20">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">📊</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-text">Market Analysis</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 bg-primary-900/30 rounded-full w-full" />
                                        <div className="h-2 bg-primary-900/30 rounded-full w-4/5" />
                                        <div className="h-2 bg-primary-900/30 rounded-full w-3/4" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 - Competitor Insights */}
                            <div className="absolute top-32 right-20 w-64 animate-float-delayed">
                                <div className="bg-dark-card/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-2xl shadow-purple-600/20">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">🎯</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-text">Competitor Insights</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 bg-purple-900/30 rounded-full w-full" />
                                        <div className="h-2 bg-purple-900/30 rounded-full w-5/6" />
                                        <div className="h-2 bg-purple-900/30 rounded-full w-2/3" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 - Launch Roadmap */}
                            <div className="absolute bottom-0 right-10 w-64 animate-float-slow">
                                <div className="bg-dark-card/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 shadow-2xl shadow-blue-600/20">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">🚀</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-text">Launch Roadmap</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 bg-blue-900/30 rounded-full w-full" />
                                        <div className="h-2 bg-blue-900/30 rounded-full w-4/5" />
                                        <div className="h-2 bg-blue-900/30 rounded-full w-3/5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Indicators - Moved Below */}
                    <div className="pt-16 flex flex-wrap justify-center gap-8 text-text-muted">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>AI-Powered Analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Comprehensive Reports</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                            <span>Results in Minutes</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-dark-surface/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
                            Everything You Need to Launch
                        </h2>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto">
                            Get a complete business plan with market research, design recommendations, and strategic insights
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative p-8 bg-dark-card/60 backdrop-blur-xl rounded-2xl border border-dark-border/50 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-600/10 cursor-pointer hover:-translate-y-2"
                            >
                                {/* Subtle gradient glow */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600/0 to-purple-600/0 group-hover:from-primary-600/10 group-hover:to-purple-600/10 rounded-2xl blur-xl -z-10 transition-all duration-300" />

                                <div className="w-14 h-14 bg-gradient-to-br from-primary-600/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                    <span className="text-3xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary-300 transition-colors">{feature.title}</h3>
                                <p className="text-text-muted leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* How It Works Section */}
            < section id="how-it-works" className="py-24" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-text-muted">
                            Three simple steps to your complete business plan
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent" />
                                )}
                                <div className="relative bg-dark-card/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-border/50 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-600/10">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-6 mx-auto group-hover:scale-110 transition-transform">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-2xl font-bold text-text mb-3 text-center group-hover:text-primary-300 transition-colors">{step.title}</h3>
                                    <p className="text-text-muted text-center leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Built With Planora Showcase */}
            < section id="showcase" className="py-20 bg-dark-surface/50" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-primary-400 font-semibold mb-2">Success Stories</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
                            Built With Planora
                        </h2>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto">
                            Real businesses that started with our AI-powered business plans
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {showcaseProjects.map((project, index) => (
                            <div
                                key={index}
                                onClick={() => openProjectModal(project)}
                                className="group bg-dark-card rounded-xl border border-dark-border hover:border-primary-500/50 overflow-hidden transition-all hover:shadow-glow cursor-pointer"
                            >
                                {/* Project Image/Mockup */}
                                <div className={`h-48 relative overflow-hidden ${project.bgGradient}`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                                            {project.icon}
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-dark-card/80 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-400 border border-primary-500/30">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-text mb-2 group-hover:text-primary-400 transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-text-muted mb-4">
                                        {project.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-sm text-text-muted">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>{project.views}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            <span>{project.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/generate"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-glow transition-all"
                        >
                            Start Your Success Story
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-20 bg-gradient-to-br from-primary-900/20 to-purple-900/20" >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
                        Ready to Build Your Business?
                    </h2>
                    <p className="text-xl text-text-muted mb-8">
                        Join thousands of entrepreneurs who have turned their ideas into reality
                    </p>
                    <Link
                        href="/generate"
                        className="inline-block px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white text-xl font-semibold rounded-xl shadow-lg hover:shadow-glow transition-all transform hover:scale-105"
                    >
                        Start For Free →
                    </Link>
                </div>
            </section >

            {/* Footer */}
            < footer className="bg-dark-surface border-t border-dark-border py-12" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">P</span>
                                </div>
                                <span className="text-xl font-semibold text-text">Planora</span>
                            </div>
                            <p className="text-text-muted">
                                AI-powered business planning for entrepreneurs
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-text mb-4">Product</h4>
                            <ul className="space-y-2 text-text-muted">
                                <li><Link href="/generate" className="hover:text-primary-400 transition-colors">Generate Plan</Link></li>
                                <li><Link href="/#features" className="hover:text-primary-400 transition-colors">Features</Link></li>
                                <li><Link href="/#pricing" className="hover:text-primary-400 transition-colors">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-text mb-4">Company</h4>
                            <ul className="space-y-2 text-text-muted">
                                <li><a href="#" className="hover:text-primary-400 transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-text mb-4">Legal</h4>
                            <ul className="space-y-2 text-text-muted">
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-dark-border pt-8 text-center text-text-muted">
                        <p>&copy; 2024 Planora. All rights reserved.</p>
                    </div>
                </div>
            </footer >

            {/* Project Modal */}
            {
                isModalOpen && selectedProject && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-dark-card rounded-xl shadow-2xl max-w-4xl w-full my-8 border border-dark-border">
                            {/* Modal Header */}
                            <div className={`${selectedProject.bgGradient} p-6 rounded-t-xl relative`}>
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 w-10 h-10 bg-dark-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text hover:bg-dark-hover transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="text-6xl">{selectedProject.icon}</div>
                                    <div>
                                        <span className="px-3 py-1 bg-dark-card/80 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-400 border border-primary-500/30">
                                            {selectedProject.category}
                                        </span>
                                        <h2 className="text-3xl font-bold text-text mt-2">{selectedProject.name}</h2>
                                        <p className="text-text-muted mt-1">{selectedProject.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 max-h-[60vh] overflow-y-auto">
                                <div className="space-y-6">
                                    {/* Overview */}
                                    <div>
                                        <h3 className="text-xl font-bold text-text mb-3 flex items-center gap-2">
                                            📋 Overview
                                        </h3>
                                        <p className="text-text-muted leading-relaxed">{selectedProject.planData.overview}</p>
                                    </div>

                                    {/* Name Suggestions */}
                                    <div>
                                        <h3 className="text-xl font-bold text-text mb-3 flex items-center gap-2">
                                            💡 Name Suggestions
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {selectedProject.planData.names.map((name: string, idx: number) => (
                                                <div key={idx} className="px-3 py-2 bg-primary-900/20 text-primary-300 rounded-lg text-center font-medium border border-primary-800/30">
                                                    {name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Target Audience */}
                                    <div>
                                        <h3 className="text-xl font-bold text-text mb-3 flex items-center gap-2">
                                            👥 Target Audience
                                        </h3>
                                        <p className="text-text-muted leading-relaxed">{selectedProject.planData.targetAudience}</p>
                                    </div>

                                    {/* Required Features */}
                                    <div>
                                        <h3 className="text-xl font-bold text-text mb-3 flex items-center gap-2">
                                            ✨ Required Features
                                        </h3>
                                        <div className="space-y-2">
                                            {selectedProject.planData.features.map((feature: string, idx: number) => (
                                                <div key={idx} className="flex items-start gap-3 px-4 py-3 bg-primary-900/20 rounded-lg border border-primary-800/30">
                                                    <span className="text-primary-400 text-xl mt-0.5">•</span>
                                                    <p className="flex-1 text-primary-300">{feature}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Competitors */}
                                    <div>
                                        <h3 className="text-xl font-bold text-text mb-3 flex items-center gap-2">
                                            🏆 Competitors
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {selectedProject.planData.competitors.map((comp: string, idx: number) => (
                                                <div key={idx} className="px-4 py-3 bg-primary-900/20 text-primary-300 rounded-lg font-medium border border-primary-800/30">
                                                    {comp}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-dark-border flex justify-between items-center">
                                <div className="flex items-center gap-4 text-sm text-text-muted">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>{selectedProject.views} views</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        <span>Launched {selectedProject.date}</span>
                                    </div>
                                </div>
                                <Link
                                    href="/generate"
                                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-glow transition-all"
                                >
                                    Create Similar Plan
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

const features = [
    {
        icon: '🎯',
        title: 'Clear Market & Competitor Insights',
        description: 'Understand your market size, identify key competitors, and discover untapped opportunities'
    },
    {
        icon: '📋',
        title: 'Investor-Ready Business Plans',
        description: 'Professional plans with market analysis, financial projections, and growth strategies'
    },
    {
        icon: '🚀',
        title: 'Actionable 90-Day Launch Roadmap',
        description: 'Step-by-step milestones, feature priorities, and clear next actions to launch faster'
    },
    {
        icon: '🎨',
        title: 'Brand & Design Direction',
        description: 'UI/UX recommendations, color palettes, and typography to build your brand identity'
    },
    {
        icon: '👥',
        title: 'Target Audience Profiles',
        description: 'Detailed customer personas with demographics, pain points, and buying behaviors'
    },
    {
        icon: '📊',
        title: 'Technical Architecture',
        description: 'Database schemas, tech stack recommendations, and scalability considerations'
    }
];

const steps = [
    {
        title: 'Describe your idea',
        description: 'Share your startup concept in a few sentences. No business jargon required.'
    },
    {
        title: 'AI analyzes market & competitors',
        description: 'Our AI researches your market, identifies competitors, and finds opportunities.'
    },
    {
        title: 'Get a complete, actionable plan',
        description: 'Receive an investor-ready plan with clear next steps to launch faster.'
    }
];

const showcaseProjects = [
    {
        name: 'FreshCart',
        description: 'Farm-to-table grocery delivery platform connecting local farmers with urban consumers',
        category: 'E-commerce',
        icon: '🥬',
        bgGradient: 'bg-gradient-to-br from-green-500/20 to-emerald-600/20',
        views: '12.5K',
        date: 'Jan 2024',
        planData: {
            overview: 'FreshCart revolutionizes the way urban consumers access fresh, locally-sourced produce by creating a direct connection between local farmers and city dwellers. Our platform addresses the growing demand for sustainable, farm-fresh food while supporting local agriculture. With a subscription-based model and on-demand ordering, we make healthy eating convenient and accessible.',
            names: ['FreshCart', 'FarmDirect', 'GreenBasket', 'LocalHarvest', 'FreshFields', 'UrbanFarm'],
            targetAudience: 'Health-conscious urban professionals aged 25-45, families seeking organic produce, environmentally aware consumers, and local food enthusiasts who value sustainability and quality over convenience.',
            features: [
                'Weekly subscription boxes with customizable produce selections',
                'Real-time inventory from local farms with harvest schedules',
                'Carbon footprint tracking for each delivery',
                'Farmer profiles and farm visit scheduling',
                'Recipe suggestions based on seasonal availability',
                'Community-supported agriculture (CSA) integration'
            ],
            competitors: ['Farmbox Direct', 'Imperfect Foods', 'Misfits Market', 'Thrive Market']
        }
    },
    {
        name: 'CodeMentor AI',
        description: 'AI-powered coding education platform with personalized learning paths and real-time feedback',
        category: 'EdTech',
        icon: '💻',
        bgGradient: 'bg-gradient-to-br from-blue-500/20 to-indigo-600/20',
        views: '8.3K',
        date: 'Feb 2024',
        planData: {
            overview: 'CodeMentor AI transforms coding education through personalized, AI-driven learning experiences. Our platform adapts to each student\'s pace and learning style, providing real-time feedback and guidance. By combining advanced AI technology with proven pedagogical methods, we make programming accessible to learners of all levels.',
            names: ['CodeMentor AI', 'LearnCode Pro', 'DevPath', 'CodeGenius', 'SmartCoder', 'AICodeAcademy'],
            targetAudience: 'Aspiring developers aged 18-35, career switchers looking to enter tech, students supplementing formal education, and professionals upskilling in new programming languages.',
            features: [
                'AI-powered code review with instant feedback',
                'Personalized learning paths based on skill assessment',
                'Interactive coding challenges with difficulty adaptation',
                'Live pair programming sessions with AI mentor',
                'Project-based learning with real-world applications',
                'Integration with GitHub for portfolio building'
            ],
            competitors: ['Codecademy', 'Udacity', 'Coursera', 'freeCodeCamp']
        }
    },
    {
        name: 'WellnessHub',
        description: 'Holistic health and wellness marketplace connecting practitioners with clients',
        category: 'Healthcare',
        icon: '🧘',
        bgGradient: 'bg-gradient-to-br from-purple-500/20 to-pink-600/20',
        views: '15.2K',
        date: 'Mar 2024',
        planData: {
            overview: 'WellnessHub creates a comprehensive ecosystem for holistic health by connecting certified wellness practitioners with individuals seeking natural and integrative health solutions. Our platform streamlines booking, payment, and communication while maintaining the personal touch essential to wellness services.',
            names: ['WellnessHub', 'HealSpace', 'MindBodyConnect', 'ZenMarket', 'HolisticCare', 'WellnessWay'],
            targetAudience: 'Health-conscious individuals aged 30-55, people managing chronic conditions, stress management seekers, yoga and meditation enthusiasts, and those exploring alternative medicine.',
            features: [
                'Verified practitioner directory with specializations',
                'Integrated booking and video consultation platform',
                'Wellness journey tracking and progress analytics',
                'Personalized practitioner matching algorithm',
                'Secure health records and session notes storage',
                'Community forums and wellness resource library'
            ],
            competitors: ['Mindbody', 'Zocdoc', 'Headspace', 'Calm']
        }
    }
];

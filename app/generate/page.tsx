'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import { Textarea, Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import PlanSection from '@/components/generate/PlanSection';
import { sectionsConfig } from '@/components/generate/sectionConfig';
import { PlanData } from '@/lib/huggingface';
import { useAuth } from '@/contexts/AuthContext';
import { dbHelpers } from '@/lib/supabase';

export default function GeneratePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [ideaDescription, setIdeaDescription] = useState('');
    const [targetMarket, setTargetMarket] = useState('');
    const [country, setCountry] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [loading, setLoading] = useState(false);
    const [planData, setPlanData] = useState<PlanData | null>(null);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const handleGenerate = async () => {
        // Check if user is logged in
        if (!user) {
            setShowAuthPrompt(true);
            return;
        }

        if (!ideaDescription.trim()) {
            setError('Please describe your startup idea');
            return;
        }

        setError('');
        setLoading(true);
        setPlanData(null);

        try {
            const response = await fetch('/api/generate-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ideaDescription,
                    targetMarket: targetMarket || undefined,
                    country: country || undefined,
                    businessType: businessType || undefined,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                setError(result.error || 'Failed to generate plan');
                setLoading(false);
                return;
            }

            setPlanData(result.data);
            setLoading(false);

            // Scroll to first section
            setTimeout(() => {
                document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!user) {
            alert('Please sign in to save plans');
            return;
        }

        if (!planData) return;

        setSaving(true);
        const { error } = await dbHelpers.savePlan(user.id, ideaDescription, planData);

        if (error) {
            alert('Failed to save plan');
            console.error(error);
        } else {
            alert('Plan saved successfully!');
        }
        setSaving(false);
    };

    const handleEditSection = async (sectionId: string, editPrompt: string) => {
        // TODO: Implement AI-powered section editing
        console.log('Editing section:', sectionId, 'with prompt:', editPrompt);
        // For now, just log - you can implement the actual AI call here
        alert(`Edit feature coming soon! You wanted to edit ${sectionId} with: ${editPrompt}`);
    };

    const handleDownloadPDF = async () => {
        if (!planData) return;

        try {
            const { jsPDF } = await import('jspdf');
            const doc = new jsPDF();

            let yPosition = 20;
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 20;
            const maxWidth = pageWidth - (margin * 2);

            // Title
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('Business Plan', margin, yPosition);
            yPosition += 15;

            // Helper function to add text with word wrap
            const addSection = (title: string, content: string | string[] | { tables: { name: string; fields: string[] }[] }) => {
                // Check if we need a new page
                if (yPosition > 270) {
                    doc.addPage();
                    yPosition = 20;
                }

                // Section title
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text(title, margin, yPosition);
                yPosition += 8;

                // Section content
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');

                if (Array.isArray(content)) {
                    content.forEach((item, index) => {
                        const lines = doc.splitTextToSize(`${index + 1}. ${item}`, maxWidth);
                        lines.forEach((line: string) => {
                            if (yPosition > 280) {
                                doc.addPage();
                                yPosition = 20;
                            }
                            doc.text(line, margin, yPosition);
                            yPosition += 5;
                        });
                    });
                } else if (typeof content === 'object' && 'tables' in content) {
                    // Handle database schema object
                    content.tables.forEach((table: { name: string; fields: string[] }) => {
                        if (yPosition > 270) {
                            doc.addPage();
                            yPosition = 20;
                        }
                        doc.setFont('helvetica', 'bold');
                        doc.text(table.name, margin, yPosition);
                        yPosition += 5;
                        doc.setFont('helvetica', 'normal');
                        table.fields.forEach((field: string) => {
                            if (yPosition > 280) {
                                doc.addPage();
                                yPosition = 20;
                            }
                            doc.text(`  ${field}`, margin, yPosition);
                            yPosition += 4;
                        });
                        yPosition += 3;
                    });
                } else {
                    const lines = doc.splitTextToSize(content as string, maxWidth);
                    lines.forEach((line: string) => {
                        if (yPosition > 280) {
                            doc.addPage();
                            yPosition = 20;
                        }
                        doc.text(line, margin, yPosition);
                        yPosition += 5;
                    });
                }

                yPosition += 5;
            };

            // Add all sections
            if (planData.overview) addSection('Overview', planData.overview);
            if (planData.startup_name_suggestions) addSection('Name Suggestions', planData.startup_name_suggestions);
            if (planData.target_audience) addSection('Target Audience', planData.target_audience);
            if (planData.ui_design_suggestions) addSection('UI Design Suggestions', planData.ui_design_suggestions);
            if (planData.database_schema) addSection('Database Schema', planData.database_schema);
            if (planData.typography_suggestions) addSection('Typography', planData.typography_suggestions);
            if (planData.user_pain_points) addSection('User Pain Points', planData.user_pain_points);
            if (planData.required_features) addSection('Required Features', planData.required_features);
            if (planData.competitors) addSection('Competitors', planData.competitors);
            if (planData.industry_insights) addSection('Industry Insights', planData.industry_insights);

            // Save the PDF
            doc.save('business-plan.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar isGenerating={loading} hasPlan={!!planData} />

                <main className="flex-1 min-h-screen bg-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {/* Input Form */}
                        <div className="mb-12">
                            <div className="text-center mb-8">
                                <h1 className="text-4xl font-bold text-text mb-4">
                                    Generate Your Business Plan
                                </h1>
                                <p className="text-lg text-text-muted mb-2">
                                    Describe your startup idea and let AI create a comprehensive plan
                                </p>
                                <p className="text-sm text-primary-400 font-medium">
                                    Built for founders, indie hackers, and early-stage teams
                                </p>
                            </div>

                            <div className="relative bg-dark-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-dark-border/50 p-8 space-y-6">
                                {/* Gradient glow effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600/20 to-purple-600/20 rounded-2xl blur-xl -z-10" />

                                <div>
                                    <Textarea
                                        label="Startup Idea"
                                        placeholder="Describe your startup idea in 2-3 lines..."
                                        rows={4}
                                        value={ideaDescription}
                                        onChange={(e) => setIdeaDescription(e.target.value)}
                                        error={error}
                                    />

                                    {/* Example Prompt Chips */}
                                    {!ideaDescription && (
                                        <div className="mt-3">
                                            <p className="text-xs text-text-muted mb-2">Try an example:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {examplePrompts.map((example, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setIdeaDescription(example.text)}
                                                        className="group px-3 py-2 bg-primary-900/20 hover:bg-primary-900/40 text-primary-300 text-sm rounded-lg border border-primary-800/30 hover:border-primary-600/50 transition-all flex items-center gap-2"
                                                    >
                                                        <span className="text-base">{example.icon}</span>
                                                        <span className="group-hover:text-primary-200 transition-colors">{example.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <Input
                                            label="Target Market (Optional)"
                                            placeholder="e.g., Small businesses"
                                            value={targetMarket}
                                            onChange={(e) => setTargetMarket(e.target.value)}
                                        />
                                        <p className="text-xs text-text-muted mt-1">Helps size your market opportunity</p>
                                    </div>
                                    <div>
                                        <Input
                                            label="Country (Optional)"
                                            placeholder="e.g., United States"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        />
                                        <p className="text-xs text-text-muted mt-1">Tailors regional insights</p>
                                    </div>
                                    <div>
                                        <Input
                                            label="Business Type (Optional)"
                                            placeholder="e.g., SaaS, E-commerce"
                                            value={businessType}
                                            onChange={(e) => setBusinessType(e.target.value)}
                                        />
                                        <p className="text-xs text-text-muted mt-1">Identifies relevant competitors</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <div className="flex-1">
                                        <Button
                                            onClick={handleGenerate}
                                            loading={loading}
                                            fullWidth
                                            variant="primary"
                                            className="shadow-lg hover:shadow-glow"
                                        >
                                            {loading ? 'Generating Your Plan...' : 'Generate My Business Plan'}
                                        </Button>
                                        <p className="text-xs text-center text-text-muted mt-2">
                                            Takes ~30 seconds • Powered by AI
                                        </p>
                                    </div>
                                    {planData && (
                                        <Button
                                            onClick={handleDownloadPDF}
                                            variant="outline"
                                        >
                                            📄 Download PDF
                                        </Button>
                                    )}
                                    {planData && user && (
                                        <Button
                                            onClick={handleSave}
                                            loading={saving}
                                            variant="outline"
                                        >
                                            Save Plan
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Generated Plan Sections */}
                        {(loading || planData) && (
                            <div className="space-y-6">
                                {sectionsConfig.map((config) => (
                                    <PlanSection
                                        key={config.id}
                                        config={config}
                                        data={planData?.[config.dataKey]}
                                        isLoading={loading}
                                        onEdit={handleEditSection}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Authentication Prompt Modal */}
            {showAuthPrompt && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-dark-card rounded-xl shadow-2xl max-w-md w-full p-8 border border-dark-border">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-text mb-2">
                                Sign In Required
                            </h3>
                            <p className="text-text-muted mb-6">
                                Please sign in or create an account to generate your business plan
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push('/login')}
                                    className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-glow transition-all"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => router.push('/signup')}
                                    className="w-full px-6 py-3 bg-dark-surface hover:bg-dark-hover text-text font-semibold rounded-lg border border-dark-border hover:border-primary-500 transition-all"
                                >
                                    Create Account
                                </button>
                                <button
                                    onClick={() => setShowAuthPrompt(false)}
                                    className="w-full px-6 py-3 text-text-muted hover:text-text transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const examplePrompts = [
    {
        icon: '🤖',
        label: 'AI for Restaurants',
        text: 'AI tool that helps small restaurants manage inventory, predict demand, and reduce food waste using machine learning'
    },
    {
        icon: '💪',
        label: 'Fitness App',
        text: 'Fitness app for busy professionals using 15-minute science-backed workouts that can be done anywhere without equipment'
    },
    {
        icon: '💰',
        label: 'Invoice Automation',
        text: 'SaaS that automates invoice follow-ups for freelancers, tracks payment status, and sends smart reminders to clients'
    },
    {
        icon: '🌱',
        label: 'Sustainability Platform',
        text: 'Platform connecting eco-conscious consumers with local sustainable businesses and carbon-neutral delivery options'
    }
];

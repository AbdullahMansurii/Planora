'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import PlanSection from '@/components/generate/PlanSection';
import { sectionsConfig } from '@/components/generate/sectionConfig';
import { PlanData } from '@/lib/huggingface';
import { dbHelpers } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function PlanViewPage() {
    const params = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [planData, setPlanData] = useState<PlanData | null>(null);
    const [ideaDescription, setIdeaDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user && params.id) {
            loadPlan();
        }
    }, [user, params.id]);

    const loadPlan = async () => {
        if (!user || !params.id) return;

        setLoading(true);
        const { data, error } = await dbHelpers.getPlanById(
            params.id as string,
            user.id
        );

        if (error) {
            setError('Failed to load plan');
            console.error(error);
            setLoading(false);
            return;
        }

        if (!data) {
            setError('Plan not found');
            setLoading(false);
            return;
        }

        setIdeaDescription(data.idea_description);
        setPlanData(data.generated_data);
        setLoading(false);
    };

    if (authLoading || loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-background flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-text-muted">Loading plan...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-background flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">⚠️</span>
                        </div>
                        <h2 className="text-2xl font-bold text-text mb-2">{error}</h2>
                        <Link href="/dashboard">
                            <Button variant="primary">Back to Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar isGenerating={false} hasPlan={!!planData} />

                <main className="flex-1 min-h-screen bg-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {/* Header */}
                        <div className="mb-12">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-text mb-2">
                                        Saved Business Plan
                                    </h1>
                                    <p className="text-lg text-text-muted">{ideaDescription}</p>
                                </div>
                                <Link href="/dashboard">
                                    <Button variant="outline">Back to Dashboard</Button>
                                </Link>
                            </div>
                        </div>

                        {/* Plan Sections */}
                        {planData && (
                            <div className="space-y-6">
                                {sectionsConfig.map((config) => (
                                    <PlanSection
                                        key={config.id}
                                        config={config}
                                        data={planData[config.dataKey]}
                                        isLoading={false}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { dbHelpers } from '@/lib/supabase';

interface Plan {
    id: string;
    idea_description: string;
    created_at: string;
}

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            loadPlans();
        }
    }, [user]);

    const loadPlans = async () => {
        if (!user) return;

        setLoading(true);
        const { data, error } = await dbHelpers.getUserPlans(user.id);

        if (error) {
            setError('Failed to load plans');
            console.error(error);
        } else {
            setPlans(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (planId: string) => {
        if (!user) return;
        if (!confirm('Are you sure you want to delete this plan?')) return;

        const { error } = await dbHelpers.deletePlan(planId, user.id);

        if (error) {
            alert('Failed to delete plan');
            console.error(error);
        } else {
            setPlans(plans.filter((p) => p.id !== planId));
        }
    };

    if (authLoading || !user) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-background flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-text-muted">Loading...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-text mb-2">Your Plans</h1>
                            <p className="text-text-muted">
                                Manage and view your saved business plans
                            </p>
                        </div>
                        <Link href="/generate">
                            <Button variant="primary">Create New Plan</Button>
                        </Link>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-card rounded-xl shadow-sm border border-gray-200/50 p-6">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
                                        <div className="flex space-x-2">
                                            <div className="h-10 bg-gray-200 rounded flex-1"></div>
                                            <div className="h-10 bg-gray-200 rounded w-20"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : plans.length === 0 ? (
                        <Card>
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-4xl">📋</span>
                                </div>
                                <h3 className="text-xl font-semibold text-text mb-2">
                                    No plans yet
                                </h3>
                                <p className="text-text-muted mb-6">
                                    Create your first business plan to get started
                                </p>
                                <Link href="/generate">
                                    <Button variant="primary">Create Your First Plan</Button>
                                </Link>
                            </div>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {plans.map((plan) => (
                                <Card key={plan.id} hover>
                                    <div className="mb-4">
                                        <p className="text-text font-medium line-clamp-2 mb-2">
                                            {plan.idea_description}
                                        </p>
                                        <p className="text-sm text-text-muted">
                                            {new Date(plan.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link href={`/plan/${plan.id}`} className="flex-1">
                                            <Button variant="outline" fullWidth>
                                                View Plan
                                            </Button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(plan.id)}
                                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            aria-label="Delete plan"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

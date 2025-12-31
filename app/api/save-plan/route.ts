import { NextRequest, NextResponse } from 'next/server';
import { dbHelpers, authHelpers } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        // Verify authentication
        const { user, error: authError } = await authHelpers.getCurrentUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { ideaDescription, generatedData } = body;

        if (!ideaDescription || !generatedData) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        console.log('[API] Saving plan for user:', user.id);

        const { data, error } = await dbHelpers.savePlan(
            user.id,
            ideaDescription,
            generatedData
        );

        if (error) {
            console.error('[API] Save failed:', error);
            return NextResponse.json(
                { error: 'Failed to save plan' },
                { status: 500 }
            );
        }

        console.log('[API] Plan saved successfully:', data?.id);
        return NextResponse.json({ success: true, planId: data?.id });

    } catch (error: any) {
        console.error('[API] Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

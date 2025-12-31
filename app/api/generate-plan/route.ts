import { NextRequest, NextResponse } from 'next/server';
import { generatePlan } from '@/lib/huggingface';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { ideaDescription, targetMarket, country, businessType } = body;

        if (!ideaDescription || typeof ideaDescription !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Idea description is required' },
                { status: 400 }
            );
        }

        console.log('[API] Generating plan for idea:', ideaDescription.substring(0, 50) + '...');

        const result = await generatePlan(
            ideaDescription,
            targetMarket,
            country,
            businessType
        );

        if (!result.success) {
            console.error('[API] Generation failed:', result.error);
            return NextResponse.json(result, { status: 500 });
        }

        console.log('[API] Plan generated successfully');
        return NextResponse.json(result);

    } catch (error: any) {
        console.error('[API] Unexpected error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

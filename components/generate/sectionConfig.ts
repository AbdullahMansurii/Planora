export interface SectionConfig {
    id: string;
    title: string;
    icon: string;
    group: string;
    displayType: 'text' | 'list' | 'colors' | 'code' | 'names' | 'schema';
    dataKey: keyof PlanData;
}

import { PlanData } from '@/lib/huggingface';

export const sectionGroups = [
    { id: 'overview', title: 'Overview' },
    { id: 'audience', title: 'Target Audience' },
    { id: 'website', title: 'Website' },
    { id: 'dynamics', title: 'User Dynamics' },
    { id: 'competitive', title: 'Competitive Landscape' },
    { id: 'industry', title: 'Industry Insights' },
];

export const sectionsConfig: SectionConfig[] = [
    {
        id: 'overview',
        title: 'Overview',
        icon: '📋',
        group: 'overview',
        displayType: 'text',
        dataKey: 'overview',
    },
    {
        id: 'name-suggestions',
        title: 'Name Suggestions',
        icon: '💡',
        group: 'overview',
        displayType: 'names',
        dataKey: 'startup_name_suggestions',
    },
    {
        id: 'target-audience',
        title: 'Target Audience',
        icon: '👥',
        group: 'audience',
        displayType: 'text',
        dataKey: 'target_audience',
    },
    {
        id: 'ui-design',
        title: 'UI Design',
        icon: '🎨',
        group: 'website',
        displayType: 'text',
        dataKey: 'ui_design_suggestions',
    },
    {
        id: 'database-schema',
        title: 'Database Schema',
        icon: '🗄️',
        group: 'website',
        displayType: 'schema',
        dataKey: 'database_schema',
    },
    {
        id: 'typography',
        title: 'Typography',
        icon: '🔤',
        group: 'website',
        displayType: 'text',
        dataKey: 'typography_suggestions',
    },
    {
        id: 'color-palette',
        title: 'Color Palette',
        icon: '🎨',
        group: 'website',
        displayType: 'colors',
        dataKey: 'color_palette',
    },
    {
        id: 'pain-points',
        title: 'User Pain Points',
        icon: '⚠️',
        group: 'dynamics',
        displayType: 'text',
        dataKey: 'user_pain_points',
    },
    {
        id: 'features',
        title: 'Required Features',
        icon: '✨',
        group: 'dynamics',
        displayType: 'text',
        dataKey: 'required_features',
    },
    {
        id: 'competitors',
        title: 'Competitors',
        icon: '🏢',
        group: 'competitive',
        displayType: 'text',
        dataKey: 'competitors',
    },
    {
        id: 'industry-insights',
        title: 'Industry Insights',
        icon: '📊',
        group: 'industry',
        displayType: 'text',
        dataKey: 'industry_insights',
    },
];

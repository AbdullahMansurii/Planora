import Card from '@/components/ui/Card';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { useState } from 'react';
import { SectionConfig } from './sectionConfig';

interface PlanSectionProps {
    config: SectionConfig;
    data: any;
    isLoading?: boolean;
    onEdit?: (sectionId: string, newContent: string) => void;
}

export default function PlanSection({ config, data, isLoading, onEdit }: PlanSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editPrompt, setEditPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleEditWithAI = async () => {
        if (!editPrompt.trim() || !onEdit) return;

        setIsGenerating(true);
        // Call the parent's edit handler
        await onEdit(config.id, editPrompt);
        setIsGenerating(false);
        setIsEditing(false);
        setEditPrompt('');
    };
    if (isLoading) {
        return (
            <div id={config.id} className="scroll-mt-20">
                <Card>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">{config.icon}</span>
                        <h2 className="text-2xl font-bold text-text">{config.title}</h2>
                    </div>
                    <SkeletonLoader variant="card" />
                </Card>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    const renderContent = () => {
        switch (config.displayType) {
            case 'text':
                return (
                    <div className="prose max-w-none">
                        <p className="text-text leading-relaxed whitespace-pre-wrap">{data}</p>
                    </div>
                );

            case 'names':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Array.isArray(data) && data.map((name: string, index: number) => (
                            <div
                                key={index}
                                className="px-4 py-3 bg-blue-50 dark:bg-primary-900/20 text-blue-900 dark:text-primary-300 rounded-lg font-medium text-center hover:bg-blue-100 dark:hover:bg-primary-900/30 transition-colors border border-blue-100 dark:border-primary-800/30"
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                );

            case 'colors':
                return (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {Array.isArray(data) && data.map((color: string, index: number) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <div
                                    className="w-full aspect-square rounded-xl border-2 border-gray-200 dark:border-dark-border shadow-sm dark:shadow-dark-md hover:scale-105 transition-transform"
                                    style={{ backgroundColor: color }}
                                />
                                <span className="text-sm font-mono text-text-light-muted dark:text-text-muted">{color}</span>
                            </div>
                        ))}
                    </div>
                );

            case 'schema':
                // Database schema - display as table cards with fields
                if (typeof data === 'object' && data.tables && Array.isArray(data.tables)) {
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {data.tables.map((table: { name: string; fields: string[] }, index: number) => (
                                <div key={index} className="bg-blue-50 dark:bg-primary-900/20 rounded-lg p-5 border border-blue-100 dark:border-primary-800/30">
                                    <h3 className="font-bold text-lg mb-3 text-blue-900 dark:text-primary-300 border-b border-blue-200 dark:border-primary-700/50 pb-2">
                                        {table.name}
                                    </h3>
                                    <div className="space-y-1.5">
                                        {table.fields.map((field, idx) => (
                                            <div key={idx} className="text-sm text-blue-700 dark:text-primary-400">
                                                {field}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                }
                // Fallback if data is not in expected format
                return <p className="text-text">Invalid schema format</p>;

            case 'code':
                // Database schema - display as table
                if (config.id === 'database-schema') {
                    const lines = data.split('\n').filter((line: string) => line.trim());
                    const tables: { [key: string]: string[] } = {};
                    let currentTable = '';

                    lines.forEach((line: string) => {
                        if (line.includes('table:')) {
                            currentTable = line.split(':')[0].trim();
                            tables[currentTable] = [];
                        } else if (currentTable && line.trim()) {
                            tables[currentTable].push(line.trim());
                        }
                    });

                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(tables).map(([tableName, fields]) => (
                                <div key={tableName} className="bg-blue-50 dark:bg-primary-900/20 rounded-lg p-4 border border-blue-100 dark:border-primary-800/30">
                                    <h3 className="font-bold text-lg mb-3 text-blue-900 dark:text-primary-300">{tableName}</h3>
                                    <div className="space-y-1">
                                        {fields.map((field, idx) => (
                                            <div key={idx} className="text-sm text-blue-800 dark:text-primary-400 font-mono">
                                                {field}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                }

                // Typography - display as font cards with live font preview
                if (config.id === 'typography') {
                    // Handle comma-separated font names
                    const fonts = typeof data === 'string'
                        ? data.split(',').map((f: string) => f.trim()).filter((f: string) => f && f.length > 2 && !f.includes('('))
                        : [];

                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {fonts.map((font: string, index: number) => (
                                <div
                                    key={index}
                                    className="bg-blue-50 dark:bg-primary-900/20 rounded-lg p-6 border border-blue-100 dark:border-primary-800/30 hover:border-blue-300 dark:hover:border-primary-600/50 transition-all"
                                >
                                    <p
                                        className="text-2xl font-semibold text-blue-900 dark:text-primary-300 text-center"
                                        style={{ fontFamily: `'${font}', sans-serif` }}
                                    >
                                        {font}
                                    </p>
                                </div>
                            ))}
                        </div>
                    );
                }

                // Default code display
                return (
                    <pre className="bg-gray-50 dark:bg-dark-surface p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-dark-border">
                        <code className="text-sm text-gray-800 dark:text-gray-300">{data}</code>
                    </pre>
                );

            case 'list':
                // Handle bullet points and newline-separated items
                let items: string[] = [];

                // Check if data contains bullet points (•) or newlines
                if (data.includes('•')) {
                    items = data.split('•').map((item: string) => item.trim()).filter((item: string) => item.length > 0);
                } else if (data.includes('\n')) {
                    items = data.split('\n').map((item: string) => item.trim()).filter((item: string) => item.length > 0);
                } else {
                    items = data.split('.').map((item: string) => item.trim()).filter((item: string) => item.length > 0);
                }

                // Special handling for competitors
                if (config.id === 'competitors') {
                    const competitors = items.filter((item: string) => item.match(/^\d+\)/));
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {competitors.map((comp: string, index: number) => {
                                // Extract company name and description
                                const match = comp.match(/^\d+\)\s*(.+?)\s*-\s*(.+)$/);
                                const name = match ? match[1].trim() : comp.replace(/^\d+\)/, '').trim();
                                const description = match ? match[2].trim() : '';

                                return (
                                    <div key={index} className="bg-blue-50 dark:bg-primary-900/20 rounded-lg p-4 border border-blue-100 dark:border-primary-800/30">
                                        <h4 className="text-lg font-bold text-blue-900 dark:text-primary-300 mb-2">{name}</h4>
                                        {description && (
                                            <p className="text-sm text-blue-700 dark:text-primary-400">{description}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                }

                // Special handling for features and pain points - display as bullet list
                if (config.id === 'features' || config.id === 'pain-points') {
                    return (
                        <div className="space-y-3">
                            {items.map((item: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 px-4 py-3 bg-blue-50 dark:bg-primary-900/20 rounded-lg border border-blue-100 dark:border-primary-800/30"
                                >
                                    <span className="text-primary-600 dark:text-primary-400 text-xl mt-0.5">•</span>
                                    <p className="flex-1 text-blue-900 dark:text-primary-300">{item}</p>
                                </div>
                            ))}
                        </div>
                    );
                }

                // Default list display
                return (
                    <div className="space-y-2">
                        {items.map((item: string, index: number) => (
                            <div
                                key={index}
                                className="px-4 py-3 bg-blue-50 dark:bg-primary-900/20 text-blue-900 dark:text-primary-300 rounded-lg border border-blue-100 dark:border-primary-800/30"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                );

            default:
                return <p className="text-text">{String(data)}</p>;
        }
    };

    return (
        <>
            <div id={config.id} className="scroll-mt-20 group relative">
                <Card className="relative">
                    {/* Edit with AI Button - appears on hover */}
                    {onEdit && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-glow"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit with AI
                        </button>
                    )}

                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">{config.icon}</span>
                        <h2 className="text-2xl font-bold text-text-light dark:text-text">{config.title}</h2>
                    </div>
                    {renderContent()}
                </Card>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-dark-card rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-gray-200 dark:border-dark-border">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-text-light dark:text-text">
                                Edit {config.title} with AI
                            </h3>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-text-muted hover:text-text transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <p className="text-text-muted mb-4">
                            Describe how you&apos;d like to modify this section. Be specific about what changes you want.
                        </p>

                        <textarea
                            value={editPrompt}
                            onChange={(e) => setEditPrompt(e.target.value)}
                            placeholder="E.g., 'Make the names more creative and modern' or 'Add more technical details'"
                            className="w-full h-32 px-4 py-3 rounded-lg border bg-white dark:bg-dark-surface text-gray-900 dark:text-text placeholder-gray-400 dark:placeholder-text-muted border-gray-300 dark:border-dark-border focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                        />

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border text-text-light dark:text-text rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditWithAI}
                                disabled={!editPrompt.trim() || isGenerating}
                                className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-glow"
                            >
                                {isGenerating ? 'Generating...' : 'Generate'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

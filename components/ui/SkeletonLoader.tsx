interface SkeletonLoaderProps {
    variant?: 'text' | 'title' | 'card' | 'list';
    count?: number;
}

export default function SkeletonLoader({ variant = 'card', count = 1 }: SkeletonLoaderProps) {
    const renderSkeleton = () => {
        switch (variant) {
            case 'text':
                return (
                    <div className="space-y-2">
                        <div className="h-4 skeleton rounded w-full"></div>
                        <div className="h-4 skeleton rounded w-5/6"></div>
                        <div className="h-4 skeleton rounded w-4/6"></div>
                    </div>
                );

            case 'title':
                return <div className="h-8 skeleton rounded w-1/3 mb-4"></div>;

            case 'list':
                return (
                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <div className="w-2 h-2 skeleton rounded-full"></div>
                                <div className="h-4 skeleton rounded flex-1"></div>
                            </div>
                        ))}
                    </div>
                );

            case 'card':
            default:
                return (
                    <div className="bg-card rounded-xl shadow-sm border border-gray-200/50 p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 skeleton rounded-lg"></div>
                            <div className="h-6 skeleton rounded w-1/3"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 skeleton rounded w-full"></div>
                            <div className="h-4 skeleton rounded w-5/6"></div>
                            <div className="h-4 skeleton rounded w-4/6"></div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            {[...Array(count)].map((_, i) => (
                <div key={i}>{renderSkeleton()}</div>
            ))}
        </>
    );
}

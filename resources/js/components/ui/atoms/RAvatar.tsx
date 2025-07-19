import React, { useRef, useState, useEffect, memo } from 'react';
import { Icon } from '@iconify/react';

interface RAvatarProps {
    src: string;
    className?: string;
    size?: string;
    isChanging?: boolean;
    onChange?: (file: File) => void;
    circle?: boolean;
}

const RAvatar: React.FC<RAvatarProps> = memo(({
    src,
    className = '',
    size = 'w-12 h-12',
    isChanging = false,
    onChange,
    circle = false,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const borderRadiusClass = circle ? 'rounded-full' : 'rounded-md';

    useEffect(() => {
        setIsLoading(true);
    }, [src]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            onChange?.(file);
        }
    };

    return (
        <div key={src}>
            <input
                disabled={!isChanging}
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                    relative ${borderRadiusClass} overflow-hidden ${size} ${className}
                    group
                    ${isChanging ? 'custom-pulse cursor-pointer' : ''}
                `}
            >
                <img
                    src={src}
                    className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                />

                {isChanging && (
                    <div className={`
                        absolute inset-0 bg-black bg-opacity-30 opacity-0
                        group-hover:opacity-100
                        transition-opacity duration-300
                        pointer-events-none
                        ${borderRadiusClass}
                    `}>
                        <Icon
                            icon="mdi:pencil"
                            className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </div>
                )}
            </div>

            <style>{`
                @keyframes customPulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
                    }
                    50% {
                        box-shadow: 0 0 0 8px rgba(0, 0, 0, 0);
                    }
                }

                .custom-pulse {
                    position: relative;
                    animation: customPulse 2s infinite;
                    z-index: 1;
                }
            `}</style>
        </div>
    );
});

export default RAvatar;

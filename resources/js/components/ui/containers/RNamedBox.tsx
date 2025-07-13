import React from 'react';

interface RNamedBoxProps {
    text: string;
    children: React.ReactNode;
    className?: string;
}

const RNamedBox: React.FC<RNamedBoxProps> = ({ text, children, className = "" }) => {
    return (
        <div
            className={`
                relative flex items-center mt-4
                rounded-lg w-[300px] px-2 py-4
                border border-light-border dark:border-dark-border
                ${className}
            `}
        >
            <span className="absolute -top-2.5 left-3 px-1 bg-white dark:bg-dark-bg text-sm font-medium">
                {text}
            </span>

            {children}
        </div>
    );
};

export default RNamedBox;

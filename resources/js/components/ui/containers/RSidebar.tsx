import React, { useRef, useEffect } from 'react';

interface RSidebarProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    width?: number | string;
}

const RSidebar: React.FC<RSidebarProps> = ({
    open,
    onClose,
    children,
    className = '',
    width = 300,
}) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onClose]);

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onClose}
                />
            )}

            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
                    open ? 'translate-x-0' : 'translate-x-full'
                } ${className}`}
                style={{ width }}
            >
                <div className="p-4 h-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
};

export default RSidebar;

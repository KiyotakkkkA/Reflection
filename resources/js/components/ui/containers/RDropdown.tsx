import React, { useRef, useEffect, useState } from 'react';
import { createPopper } from '@popperjs/core';

interface RDropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const RDropdown: React.FC<RDropdownProps> = ({ trigger, children, className }) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (open && triggerRef.current && dropdownRef.current) {
            createPopper(triggerRef.current, dropdownRef.current, {
                placement: 'bottom-end',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 10],
                        },
                    },
                ],
            });
        }
    }, [open]);

    return (
        <div className="relative inline-block text-left">
            <div ref={triggerRef} onClick={() => setOpen(!open)}>
                {trigger}
            </div>

            {open && (
                <div
                    ref={dropdownRef}
                    className={`bg-white shadow-lg rounded-lg py-2 z-10 border border-gray-200 ${className}`}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default RDropdown;


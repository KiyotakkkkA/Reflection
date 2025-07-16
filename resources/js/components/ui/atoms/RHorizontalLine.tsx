interface RHorizontalLineProps {
    title?: string;
    className?: string;
}

const RHorizontalLine = ({ title, className }: RHorizontalLineProps) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="w-full border-b border-gray-300"></div>
            {title && <span className="px-4 bg-white text-gray-500 whitespace-nowrap">{title}</span>}
            <div className="w-full border-b border-gray-300"></div>
        </div>
    );
};

export default RHorizontalLine;

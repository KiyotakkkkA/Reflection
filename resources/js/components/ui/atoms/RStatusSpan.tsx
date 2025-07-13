
interface RStatusSpanProps {
    status: string;

    className?: string;
}

const RStatusSpan = ({ status, className }: RStatusSpanProps) => {
    return (
        <span className={`px-2 py-1 rounded-full text-sm inline-flex items-center
            ${className}
        `}
        >
            {status}
        </span>
    );
};

export default RStatusSpan;

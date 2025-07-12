interface RPanelProps {
    children: React.ReactNode;
    className?: string;

    shadowed?: boolean;
}

const RPanel: React.FC<RPanelProps> = ({children, shadowed = false, className = ""}) => {
    return (
        <div className={`
            flex justify-center items-center mt-4
            ${shadowed ? "shadow-lg" : ""}
            rounded-lg w-[300px] px-2 py-4
            border border-light-border dark:border-dark-border
            ${className}
        `}>
            {children}
        </div>
    );
};

export default RPanel;

interface RPanelProps {
    children: React.ReactNode;
    className?: string;

    shadowed?: boolean;
    bordered?: boolean;
}

const RPanel: React.FC<RPanelProps> = ({children, shadowed = false, className = "", bordered = false}) => {
    return (
        <div className={`
            flex mt-4
            ${shadowed ? "shadow-lg" : ""}
            rounded-lg w-[300px] px-2 py-4
            ${bordered ? "border border-light-border dark:border-dark-border" : ""}
            ${className}
        `}>
            {children}
        </div>
    );
};

export default RPanel;

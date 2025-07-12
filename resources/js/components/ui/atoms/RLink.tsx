import { Link } from "react-router-dom";

interface RLinkProps {
    text: string;
    className?: string;
    to: string;

    primary?: boolean;
    primaryOutline?: boolean;
}

const RLink: React.FC<RLinkProps> = ({
    text,
    to,
    className,
    primary = false,
    primaryOutline = false
}: RLinkProps) => {
    return (
        <Link to={to}
        className={`px-4 py-2 rounded-md transition-colors duration-300
            ${className}
            ${primary ? "bg-black border border-black text-white hover:bg-white hover:text-black" : ""}
            ${primaryOutline ? "border border-black hover:bg-black hover:text-white" : ""}
        `}>{text}</Link>
    );
};

export default RLink;

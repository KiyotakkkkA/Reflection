import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface RLinkProps {
    link: string;
    className?: string;
    children?: React.ReactNode;

    icon?: string;
    iconHeight?: number;
    iconWidth?: number;

    primary?: boolean;
    primaryOutline?: boolean;
    light?: boolean;

    disabled?: boolean;

    onClick?: () => void;

}

const RLink: React.FC<RLinkProps> = ({
    link,
    className = "",
    children,

    icon,
    iconHeight = 20,
    iconWidth = 20,

    primary = false,
    primaryOutline = false,
    light = false,

    disabled = false,

    onClick,
}: RLinkProps) => {

    return (
        <Link
            to={link}
            onClick={onClick}
            className={`px-4 py-2 rounded-md transition-colors duration-300
                ${className}
                ${primary ? "bg-black border border-black text-white hover:bg-white hover:text-black" : ""}
                ${primaryOutline ? "border border-black hover:bg-black hover:text-white" : ""}
                ${light ? "hover:bg-gray-100" : ""}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
        >
            <div className={ icon ? `flex flex-row items-center gap-2` : ``}>
                {
                    icon && (
                        <Icon icon={icon} width={iconWidth} height={iconHeight}/>
                    )
                }
                {children}
            </div>
        </Link>
    );
};

export default RLink;

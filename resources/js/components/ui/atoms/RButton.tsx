import { Icon } from "@iconify/react";

interface RButtonProps {
    text: string;
    className?: string;

    icon?: string;
    iconHeight?: number;
    iconWidth?: number;

    primary?: boolean;
    primaryOutline?: boolean;
    light?: boolean;

    disabled?: boolean;

    onClick?: () => void;

}

const RButton: React.FC<RButtonProps> = ({
    text,
    className = "",

    icon,
    iconHeight = 20,
    iconWidth = 20,

    primary = false,
    primaryOutline = false,
    light = false,

    disabled = false,

    onClick,
}: RButtonProps) => {

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-md transition-colors duration-300 text-sm font-medium
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
                {text}
            </div>
        </button>
    );
};

export default RButton;

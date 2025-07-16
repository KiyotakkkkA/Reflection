import { Link } from "react-router-dom";

interface RLogoProps {
    withText?: boolean;
    color?: string;
}

const RLogo = ({ withText, color = "text-black" }: RLogoProps) => {
    return (
        <Link to="/main" className="flex items-center">
            <svg className={`h-8 w-8 ${color}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 12L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 12L20 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 12L4 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {withText && <span className={`ml-2 text-xl font-bold ${color}`}>Reflection</span>}
        </Link>
    );
};

export default RLogo;


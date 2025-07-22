import {
    RLogo,
} from "../ui";

const Footer = () => {
    return (
        <footer className="mb-5 bg-white">
            <div className="border-t border-gray-200 my-1"></div>
            <div className="flex justify-center items-center py-3">
                <RLogo color="text-gray-500"/>
                <div className="ml-2 text-gray-500 text-sm">
                    © {new Date().getFullYear()} Reflection.
                </div>
            </div>
        </footer>
    );
};

export default Footer;


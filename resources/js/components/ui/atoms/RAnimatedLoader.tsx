interface AnimatedLoaderProps {
    className?: string;
}

const AnimatedLoader = ({ className = "" }: AnimatedLoaderProps) => {
    return (
        <div className={`flex justify-center ${className}`}>
            <div
                className="animate-spin w-12 h-12 border-4 border-black
                          border-t-transparent rounded-full"
            ></div>
        </div>
    );
};

export default AnimatedLoader;

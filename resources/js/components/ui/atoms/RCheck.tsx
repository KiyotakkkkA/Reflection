type BindObjectType<T> = [
    state: T,
    key: keyof T,
    setState: React.Dispatch<React.SetStateAction<T>>
];

interface RCheckProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
    text: string;
    bind: BindObjectType<T>;
}

const RCheck = <T extends Record<string, any>>({ bind, text }: RCheckProps<T>) => {
    const [state, key, setState] = bind;
    const id = key.toString();

    return (
        <div className="flex items-center gap-2">
            <input
                id={id}
                type="checkbox"
                checked={state[key]}
                onChange={(e) => setState({ ...state, [key]: e.target.checked })}
                className={`border
                    rounded-md
                    transition-colors duration-300
                    hover:border-black
                    hover:outline-black
                    hover:text-black
                    focus:ring-black
                    focus:border-black
                    checked:text-black`}
            />
            <label htmlFor={id}>{text}</label>
        </div>
    );
};

export default RCheck;

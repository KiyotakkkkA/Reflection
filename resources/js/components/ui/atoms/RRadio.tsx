type BindObjectType<T> = [
    state: T,
    key: keyof T,
    setState: React.Dispatch<React.SetStateAction<T>>
];

interface RRadioProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
    text: string;
    bind: BindObjectType<T>;
}

const RRadio = <T extends Record<string, any>>({ bind, text }: RRadioProps<T>) => {
    const [state, key, setState] = bind;
    const id = key.toString();

    return (
        <div className="flex items-center gap-2">
            <input
                id={id}
                type="radio"
                checked={state[key]}
                onChange={(e) => setState({ ...state, [key]: e.target.checked })}
                className={`border
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

export default RRadio;

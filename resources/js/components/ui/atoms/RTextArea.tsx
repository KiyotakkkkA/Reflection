import { Icon } from "@iconify/react";

type BindObjectType<T> = [
    state: T,
    key: keyof T,
    setState: React.Dispatch<React.SetStateAction<T>>
];

interface RTextAreaProps<T> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder: string;
    icon?: string;
    rows?: number;
    maxLength?: number;
    bind: BindObjectType<T>;
}

const RTextArea = <T,>({placeholder, icon, rows = 3, maxLength, bind}: RTextAreaProps<T>) => {

    const [state, key, setState] = bind;

    return (
        <div className="relative">
            {
                icon && (
                    <Icon icon={icon} className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2" />
                )
            }
            <textarea
                placeholder={placeholder}
                value={state[key] as string}
                onChange={(e) => setState({...state, [key]: e.target.value})}
                rows={rows}
                maxLength={maxLength}
                className={`border
                    border-gray-300
                    rounded-lg
                    px-2
                    py-1
                    w-full
                    transition-colors duration-300
                    hover:border-black
                    focus:ring-black
                    focus:border-black
                    ${icon ? "pl-9" : ""}`}
            />
        </div>
    );
};

export default RTextArea;

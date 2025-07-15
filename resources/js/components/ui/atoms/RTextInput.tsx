import { Icon } from "@iconify/react";
import { useState } from "react";

type BindObjectType<T> = [
    state: T,
    key: keyof T,
    setState: React.Dispatch<React.SetStateAction<T>>
];

interface RTextInputProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    icon?: string;
    maxLength?: number;
    type?: "text" | "password";
    bind: BindObjectType<T>;
}

const RTextInput = <T,>({placeholder, icon, type, bind, maxLength}: RTextInputProps<T>) => {

    const [state, key, setState] = bind;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            {
                icon && (
                    <Icon icon={icon} className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2" />
                )
            }
            <input
                type={type === "password" ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                value={state[key] as string}
                onChange={(e) => setState({...state, [key]: e.target.value})}
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

            {
                type === "password" && (
                    <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                    className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    />
                )
            }
        </div>
    );
};

export default RTextInput;

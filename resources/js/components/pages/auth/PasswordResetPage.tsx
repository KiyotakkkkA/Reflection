import {
    RTextInput,
    RButton,
    RPanel,
} from "../../ui";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useResetPassword } from "@/hooks/useAuth";
import { PasswordResetFormType } from "@/services/api";

const PasswordResetPage = () => {
    const location = useLocation();

    const search = location.search;

    const params = new URLSearchParams(search);
    const token = params.get('token') || "";

    useEffect(() => {
        if (token) {
            setState({
                ...state,
                token: token,
            });
        }
    }, [token]);

    const [state, setState] = useState<PasswordResetFormType>({
        token: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const { mutate, isPending, instruction: resetPasswordInstruction, error: resetPasswordError } = useResetPassword();

    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-40">
                <h1 className="text-2xl font-bold mb-4">ВОССТАНОВЛЕНИЕ ПАРОЛЯ</h1>
                {resetPasswordError && <div className="mb-2 w-[300px] text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                    <p className="text-red-500">{resetPasswordError}</p>
                </div>}
                {resetPasswordInstruction && <div className="mb-2 w-[300px] text-center bg-green-100 px-2 py-1 rounded-md border-green-500 border">
                    <p className="text-green-500">{resetPasswordInstruction}</p>
                </div>}
                <RPanel shadowed bordered className="justify-center items-center">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-2">
                            <span className="text-md font-medium">Пароль</span>
                            <RTextInput
                                icon="mdi:lock"
                                placeholder="•••••"
                                bind={[state, "new_password", setState]}
                                type="password"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="text-md font-medium">Повтор пароля</span>
                            <RTextInput
                                icon="mdi:lock"
                                placeholder="•••••"
                                bind={[state, "new_password_confirmation", setState]}
                                type="password"
                            />
                        </div>
                        <div>
                            <RButton
                                text={
                                    isPending ? "Обработка..." : "Сменить пароль"
                                }
                                className="w-full mb-2"
                                primary
                                onClick={() => {
                                    mutate(state);
                                }}
                            />
                        </div>
                    </form>
                </RPanel>
            </div>
        </div>
    );
};

export default PasswordResetPage;

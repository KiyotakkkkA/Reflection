import Header from "../../layouts/Header";
import {
    RTextInput,
    RButton,
    RPanel,
    RLink,
} from "../../ui";
import { useState } from "react";

import { useRegister } from "@/hooks/useAuth";
import { RegistrationFormType } from "@/services/api";

const RegisterPage = () => {

    const [state, setState] = useState<RegistrationFormType>({
        email: "",
        password: "",
        password_confirmation: "",
    });

    const { mutate: register, isPending, error } = useRegister();

    return (
        <>
            <Header />
            <div className="flex flex-col justify-center items-center mt-40">
                <h1 className="text-2xl font-bold mb-4">РЕГИСТРАЦИЯ</h1>
                {error && <div className="mb-2 w-[300px] text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                    <p className="text-red-500">{error}</p>
                </div>}
                <RPanel shadowed className="justify-center items-center">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-2">
                            <span className="text-md font-medium">Email</span>
                            <RTextInput
                                icon="mdi:email"
                                placeholder="example@example.com"
                                bind={[state, "email", setState]}
                            />
                        </div>
                        <div className="mb-2">
                            <span className="text-md font-medium">Пароль</span>
                            <RTextInput
                                icon="mdi:lock"
                                placeholder="•••••"
                                bind={[state, "password", setState]}
                                type="password"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="text-md font-medium">Повтор пароля</span>
                            <RTextInput
                                icon="mdi:lock"
                                placeholder="•••••"
                                bind={[state, "password_confirmation", setState]}
                                type="password"
                            />
                        </div>

                        <div>
                            <RButton
                                text={isPending ? "Загрузка..." : "Зарегистрироваться"}
                                className="w-full mb-2"
                                primary
                                onClick={() => register(state)}
                                disabled={isPending}
                            />
                        </div>

                        <div className="flex items-center justify-center mb-2">
                            <div className="w-full border-b border-gray-300"></div>
                            <span className="px-4 bg-white text-gray-500">ИЛИ</span>
                            <div className="w-full border-b border-gray-300"></div>
                        </div>

                        <div className="flex flex-row gap-2 mb-2">
                            <RButton
                                disabled={true}
                                text="Google"
                                icon="mdi:google"
                                className="w-full"
                                iconWidth={20}
                                iconHeight={20}
                                primaryOutline
                            />
                            <RButton
                                disabled={true}
                                text="GitHub"
                                icon="mdi:github"
                                className="w-full"
                                iconWidth={20}
                                iconHeight={20}
                                primaryOutline
                            />
                        </div>

                        <div>
                            <span className="text-sm text-gray-500">Уже есть аккаунт?</span>
                            <RLink className="text-sm" text="Войти" to="/auth/login" />
                        </div>
                    </form>
                </RPanel>
            </div>
        </>
    );
};

export default RegisterPage;

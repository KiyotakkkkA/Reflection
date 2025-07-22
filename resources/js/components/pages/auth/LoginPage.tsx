import {
    RTextInput,
    RButton,
    RPanel,
    RLink,
    RCheck,
} from "../../ui";
import { useState } from "react";

import { useLogin } from "@/hooks/useAuth";
import { LoginFormType } from "@/services/api";
import { Link } from "react-router-dom";

const LoginPage = () => {

    const [state, setState] = useState<LoginFormType>({
        email: "",
        password: "",
        remember: false,
    });

    const { mutate: login, isPending, error } = useLogin();

    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-40">
                <h1 className="text-2xl font-bold mb-4">ВХОД</h1>
                {error && <div className="mb-2 w-[300px] text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                    <p className="text-red-500">{error}</p>
                </div>}
                <RPanel shadowed bordered className="justify-center items-center bg-white">
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
                            {error && <div className="w-full text-right">
                                <Link
                                    to="/auth/recovery-password"
                                    className="text-sm text-gray-500 px-0"
                                >
                                    Забыли пароль?
                                </Link>
                            </div>}
                        </div>

                        <div className="mb-2">
                            <RCheck bind={[state, "remember", setState]} text="Запомнить меня" />
                        </div>

                        <div>
                            <RButton
                                text={isPending ? "Загрузка..." : "Войти"}
                                className="w-full mb-2"
                                primary
                                onClick={() => login(state)}
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

                        <div className="flex flex-row items-center gap-2">
                            <span className="text-sm text-gray-500">Нет аккаунта?</span>
                            <RLink className="text-sm" link="/auth/register">
                                Зарегистрироваться
                            </RLink>
                        </div>
                    </form>
                </RPanel>
            </div>
        </div>
    );
};

export default LoginPage;

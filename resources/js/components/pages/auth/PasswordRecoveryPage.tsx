import { useState, useRef, useEffect } from "react";
import { RButton, RPanel, RTextInput } from "@/components/ui";
import { useRecoveryPassword } from "@/hooks/useAuth";

const TIMER_KEY = "recoveryCodeTimerEndTime";

const PasswordRecoveryPage = () => {
    const RECOVERY_CODE_TIME = 15;

    const [state, setState] = useState({
        email: "",
    });
    const [isRecoveryDisabled, setIsRecoveryDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { mutate: recoveryPassword,
        isPending: isRecoveryPending,
        instruction: recoveryPasswordInstruction,
        error: recoveryPasswordError } = useRecoveryPassword();

    useEffect(() => {
        const savedEndTime = localStorage.getItem(TIMER_KEY);

        if (savedEndTime) {
            const endTime = parseInt(savedEndTime, 10);
            const now = new Date().getTime();

            if (endTime > now) {
                const timeLeft = Math.ceil((endTime - now) / 1000);

                setRemainingTime(timeLeft);
                setIsRecoveryDisabled(true);

                timerRef.current = setInterval(() => {
                    setRemainingTime((prev) => {
                        if (prev <= 1) {
                            if (timerRef.current) clearInterval(timerRef.current);
                            setIsRecoveryDisabled(false);
                            localStorage.removeItem(TIMER_KEY);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                localStorage.removeItem(TIMER_KEY);
            }
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleRecoveryCode = () => {
        if (isRecoveryDisabled) return;

        const now = new Date().getTime();
        const endTime = now + RECOVERY_CODE_TIME * 1000;

        localStorage.setItem(TIMER_KEY, endTime.toString());
        setRemainingTime(RECOVERY_CODE_TIME);
        setIsRecoveryDisabled(true);

        recoveryPassword({ email: state.email });

        timerRef.current = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setIsRecoveryDisabled(false);
                    localStorage.removeItem(TIMER_KEY);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-40">
                <h1 className="text-2xl font-bold mb-4">ВОССТАНОВЛЕНИЕ ПАРОЛЯ</h1>
                {recoveryPasswordError && <div className="mb-2 w-[300px] text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                    <p className="text-red-500">{recoveryPasswordError}</p>
                </div>}
                {recoveryPasswordInstruction && <div className="mb-2 w-[300px] text-center bg-green-100 px-2 py-1 rounded-md border-green-500 border">
                    <p className="text-green-500">{recoveryPasswordInstruction}</p>
                </div>}
                <RPanel shadowed bordered className="w-[300px]">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <span className="text-md font-medium">Email</span>
                            <RTextInput
                                icon="mdi:email"
                                placeholder="example@example.com"
                                bind={[state, "email", setState]}
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <RButton
                                className="w-full mb-2"
                                onClick={handleRecoveryCode}
                                disabled={isRecoveryDisabled || isRecoveryPending}
                                text={isRecoveryDisabled ? `Подождите (${remainingTime} сек.)` : "Восстановить пароль"}
                                primary
                            />
                        </div>
                    </form>
                </RPanel>
            </div>
        </div>
    );
};

export default PasswordRecoveryPage;

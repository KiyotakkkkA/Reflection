import React, { useState, useRef, useEffect } from "react";
import { RButton, RPanel } from "@/components/ui";
import { useSendVerificationCode, useVerifyEmail } from "@/hooks/useAuth";

const TIMER_KEY = "resendCodeTimerEndTime";

const EmailVerification = () => {
    const RESEND_CODE_TIME = 15;

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { mutate: sendVerificationCode, error: sendVerificationCodeError } = useSendVerificationCode();
    const { mutate: verifyEmail, error: verifyEmailError } = useVerifyEmail();

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const savedEndTime = localStorage.getItem(TIMER_KEY);

        if (savedEndTime) {
            const endTime = parseInt(savedEndTime, 10);
            const now = new Date().getTime();

            if (endTime > now) {
                const timeLeft = Math.ceil((endTime - now) / 1000);

                setRemainingTime(timeLeft);
                setIsResendDisabled(true);

                timerRef.current = setInterval(() => {
                    setRemainingTime((prev) => {
                        if (prev <= 1) {
                            if (timerRef.current) clearInterval(timerRef.current);
                            setIsResendDisabled(false);
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

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleResendCode = () => {
        if (isResendDisabled) return;

        const now = new Date().getTime();
        const endTime = now + RESEND_CODE_TIME * 1000;

        localStorage.setItem(TIMER_KEY, endTime.toString());
        setRemainingTime(RESEND_CODE_TIME);
        setIsResendDisabled(true);

        sendVerificationCode();

        timerRef.current = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setIsResendDisabled(false);
                    localStorage.removeItem(TIMER_KEY);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value[0];
        }

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && code[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        const newCode = [...code];

        for (let i = 0; i < pastedData.length; i++) {
            if (i < 6) {
                newCode[i] = pastedData[i];
            }
        }

        setCode(newCode);

        const lastIndex = Math.min(pastedData.length - 1, 5);
        inputRefs.current[lastIndex]?.focus();
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-40">
                <h1 className="text-2xl font-bold mb-4">ПОДТВЕРЖДЕНИЕ ПОЧТЫ</h1>
                {sendVerificationCodeError && <div className="mb-2 w-[300px] text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                    <p className="text-red-500">{sendVerificationCodeError}</p>
                </div>}
                {verifyEmailError && <div className="mb-2 w-[300px] text-center bg-red-100 px-2 py-1 rounded-md border-red-500 border">
                    <p className="text-red-500">{verifyEmailError}</p>
                </div>}
                <RPanel shadowed bordered className="w-[400px]">
                    <form className="p-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex justify-center gap-2 mb-6">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) =>
                                        handleChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className={`w-12 h-12 text-center text-2xl font-semibold rounded-xl border border-black
                                        focus:border-black focus:ring-2 focus:ring-black`}
                                />
                            ))}
                        </div>

                        <div className="mt-4 text-center">
                            <RButton
                                className="w-full mb-2"
                                onClick={handleResendCode}
                                disabled={isResendDisabled}
                                text={isResendDisabled ? `Подождите (${remainingTime} сек.)` : "Отправить код"}
                                primaryOutline
                            />
                            <RButton
                                text="Подтвердить"
                                className="w-full"
                                disabled={code.some((digit) => digit === "")}
                                primary
                                onClick={() => {
                                    verifyEmail(code.join(""));
                                }}
                            />
                        </div>
                    </form>
                </RPanel>
            </div>
        </div>
    );
};

export default EmailVerification;

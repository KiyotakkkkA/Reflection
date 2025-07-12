import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../services";
import { RegistrationFormType, LoginFormType, PasswordResetFormType } from "../services/api";

import { User } from "@/store/userStore";

import axios from "axios";

const useRegister = () => {

    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: RegistrationFormType) => {
            return api.auth.register(data);
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message);
            }
        },
        onSuccess(data) {
            localStorage.setItem("temp_token", data.token);
            navigate("/auth/verify");
        }
    });

    return {
        mutate,
        isPending,
        error
    };
};

const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: LoginFormType) => {
            return api.auth.login(data);
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message);
            }
        },
        onSuccess() {
            window.location.reload();
            navigate("/main");
        }
    });

    return {
        mutate,
        isPending,
        error
    };
};

const useVerifyToken = () => {
    const { data, isPending } = useQuery({
        queryKey: ["verify"],
        queryFn: async () => {
            return api.auth.verifyToken(localStorage.getItem("temp_token")!);
        }
    });

    return {
        data,
        isPending,
    };
};

const useVerifyEmail = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: async (code: string) => {
            return api.auth.verifyEmail({
                token: localStorage.getItem("temp_token")!,
                code: code
            });
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message);
            }
        },
        onSuccess() {
            localStorage.removeItem("temp_token");
            navigate("/auth/login");
        }
    });

    return {
        mutate,
        isPending,
        error
    };
};

const useSendVerificationCode = () => {
    const [error, setError] = useState<string | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            return api.auth.sendVerificationCode(localStorage.getItem("temp_token")!);
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message);
            }
        }
    });

    return {
        mutate,
        isPending,
        error
    };
};

const useGetSession = () => {
    const { data, isPending } = useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            return api.auth.session();
        }
    });

    return {
        data: data as User,
        isPending,
    };
};

const useLogout = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            return api.auth.logout();
        },
        onSuccess() {
            window.location.reload();
            navigate("/auth/login");
        }
    });

    return {
        mutate,
        isPending,
    };
};

const useRecoveryPassword = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [instruction, setInstruction] = useState<string | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: { email: string }) => {
            return api.auth.recoveryPassword(data);
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message);
            }
        },
        onSuccess(data) {
            setInstruction(data.message);
        }
    });

    return {
        mutate,
        isPending,
        instruction,
        error,
    };
};

const useResetPassword = () => {
    const [error, setError] = useState<string | null>(null);
    const [instruction, setInstruction] = useState<string | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: PasswordResetFormType) => {
            return api.auth.resetPassword(data);
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message);
            }
        },
        onSuccess(data) {
            setInstruction(data.message);
        }
    });

    return {
        mutate,
        isPending,
        instruction,
        error,
    };
};

export {
    useRegister,
    useLogin,
    useVerifyToken,
    useVerifyEmail,
    useSendVerificationCode,
    useGetSession,
    useLogout,
    useRecoveryPassword,
    useResetPassword
};

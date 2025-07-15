import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../services";
import { RegistrationFormType, LoginFormType, PasswordResetFormType } from "../services/api";

import { User } from "@/store/userStore";

import { AxiosError } from "axios";

interface ErrorResponse {
    message: string;
}

const useRegister = () => {

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (data: RegistrationFormType) => {
            return api.auth.register(data);
        },
        onSuccess(data) {
            localStorage.setItem("temp_token", data.token);
            navigate("/auth/verify");
        }
    });

    const axiosError = mutation.error as AxiosError<ErrorResponse> | null;

    return {
        mutate: mutation.mutate,
        isPending: mutation.isPending,
        error: axiosError?.response?.data?.message
    };
};

const useLogin = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (data: LoginFormType) => {
            return api.auth.login(data);
        },
        onSuccess() {
            window.location.reload();
            navigate("/main");
        }
    });

    const axiosError = mutation.error as AxiosError<ErrorResponse> | null;

    return {
        mutate: mutation.mutate,
        isPending: mutation.isPending,
        error: axiosError?.response?.data?.message
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

    const mutation = useMutation({
        mutationFn: async (code: string) => {
            return api.auth.verifyEmail({
                token: localStorage.getItem("temp_token")!,
                code: code
            });
        },
        onSuccess() {
            localStorage.removeItem("temp_token");
            navigate("/auth/login");
        }
    });

    const axiosError = mutation.error as AxiosError<ErrorResponse> | null;

    return {
        mutate: mutation.mutate,
        isPending: mutation.isPending,
        error: axiosError?.response?.data?.message
    };
};

const useSendVerificationCode = () => {
    const mutation = useMutation({
        mutationFn: async () => {
            return api.auth.sendVerificationCode(localStorage.getItem("temp_token")!);
        },
    });

    const axiosError = mutation.error as AxiosError<ErrorResponse> | null;

    return {
        mutate: mutation.mutate,
        isPending: mutation.isPending,
        error: axiosError?.response?.data?.message
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
    const [instruction, setInstruction] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: async (data: { email: string }) => {
            return api.auth.recoveryPassword(data);
        },
        onSuccess(data) {
            setInstruction(data.message);
        }
    });

    const axiosError = mutation.error as AxiosError<ErrorResponse> | null;

    return {
        mutate: mutation.mutate,
        isPending: mutation.isPending,
        instruction,
        error: axiosError?.response?.data?.message,
    };
};

const useResetPassword = () => {
    const [instruction, setInstruction] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: async (data: PasswordResetFormType) => {
            return api.auth.resetPassword(data);
        },
        onSuccess(data) {
            setInstruction(data.message);
        }
    });

    const axiosError = mutation.error as AxiosError<ErrorResponse> | null;

    return {
        mutate: mutation.mutate,
        isPending: mutation.isPending,
        instruction,
        error: axiosError?.response?.data?.message,
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

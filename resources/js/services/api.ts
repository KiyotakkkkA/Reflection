import { axios } from "../utils";

type RegistrationFormType = {
    email: string;
    password: string;
    password_confirmation: string;
};

type LoginFormType = {
    email: string;
    password: string;
    remember: boolean;
};

type PasswordResetFormType = {
    token: string;
    new_password: string;
    new_password_confirmation: string;
};

export type {
    RegistrationFormType,
    LoginFormType,
    PasswordResetFormType,
}

export const api = {
    auth: {
        login: async (data: LoginFormType) => {
            const response = await axios.post("/auth/login", data);
            return response.data;
        },
        register: async (data: RegistrationFormType) => {
            const response = await axios.post("/auth/register", data);
            return response.data;
        },
        verifyToken: async (token: string) => {
            const response = await axios.post("/auth/verify-token", { token });
            return response.data;
        },
        verifyEmail: async ({
            token,
            code
        }: {
            token: string;
            code: string;
        }) => {
            const response = await axios.post("/auth/verify-email", { token, code });
            return response.data;
        },
        sendVerificationCode: async (token: string) => {
            const response = await axios.post("/auth/send-verification-code", { token });
            return response.data;
        },
        session: async () => {
            const response = await axios.get("/auth/session");
            return response.data.user;
        },
        logout: async () => {
            const response = await axios.post("/auth/logout");
            return response.data;
        },
        recoveryPassword: async (data: { email: string }) => {
            const response = await axios.post("/auth/recovery-password", data);
            return response.data;
        },
        resetPassword: async (data: PasswordResetFormType) => {
            const response = await axios.post("/auth/reset-password", data);
            return response.data;
        },
    },
    profile: {
        get: async (username: string) => {
            const response = await axios.get(`/api/profile/${username}`);
            return response.data;
        },
    }
}

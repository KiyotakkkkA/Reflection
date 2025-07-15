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

type ProfileChangingFormType = {
    fullname: string;
    old_username: string;
    new_username: string;
    phone: string;
    telegram_link: string;
    github_link: string;
    vk_link: string;
    discord_link: string;
}

export type {
    RegistrationFormType,
    LoginFormType,
    PasswordResetFormType,
    ProfileChangingFormType,
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
        update: async (data: ProfileChangingFormType) => {
            const response = await axios.put(`/api/profile/${data.old_username}`, data);
            return response.data;
        },
        updateAvatar: async (data: FormData) => {
            const response = await axios.post(`/api/profile/avatar`, data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        },
        checkUsername: async (username: string) => {
            const response = await axios.post(`/api/profile/check-username`, { username });
            return response.data;
        },
    }
}

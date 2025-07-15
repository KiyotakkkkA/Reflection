import { useQuery, useMutation } from "@tanstack/react-query";
import { api, ProfileChangingFormType } from "../services/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/config/clients";
import { userStore } from "@/store";

interface ErrorResponse {
    message: string;
}

type Profile = {
    id: number | null;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    patronymic: string | null;
    phone: string | null;
    avatar: string | null;

    telegram_link: string | null;
    github_link: string | null;
    vk_link: string | null;
    discord_link: string | null;
}

const useProfile = (username: string) => {
    const mutation = useQuery({
        queryKey: ["profile", username],
        queryFn: () => api.profile.get(username),
        enabled: !!username,
    });

    return {
        data: mutation.data,
        isPending: mutation.isPending,
    };
};

const useCheckUsername = () => {
    const mutation = useMutation({
      mutationFn: async (username: string) => {
        return api.profile.checkUsername(username);
      },
    });

    const axiosError = mutation.error as AxiosError<ErrorResponse> | null;

    return {
      mutate: mutation.mutate,
      data: mutation.data,
      isPending: mutation.isPending,
      error: axiosError?.response?.data?.message,
      reset: mutation.reset,
    };
};

const useUpdateProfile = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
      mutationFn: async (data: ProfileChangingFormType) => {
        return api.profile.update(data);
      },
      onSuccess: (data) => {

        userStore.setUser({
            ...userStore.user,
            username: data.profile.username,
            name: data.profile.fullname || userStore.user.name,
            avatar: data.profile.avatar || userStore.user.avatar,
            custom_login_set: data.user.custom_login_set,
        });

        navigate(`/profile/${data.profile.username}`);
        window.location.reload();
      },
    });

    const axiosError = mutation.error as AxiosError<ErrorResponse> | null;

    return {
      mutate: mutation.mutate,
      data: mutation.data,
      isPending: mutation.isPending,
      error: axiosError?.response?.data?.message,
      reset: mutation.reset,
    };
};

const useUpdateAvatar = () => {
    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            return api.profile.updateAvatar(formData);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    ["profile", data.username],
                    ["session"],
                ],
            });
        },
    });

    const axiosError = mutation.error as AxiosError<ErrorResponse> | null;

    return {
        mutate: mutation.mutate,
        data: mutation.data,
        isPending: mutation.isPending,
        error: axiosError?.response?.data?.message,
        reset: mutation.reset,
    };
};

export type {
    Profile,
};

export {
    useProfile,
    useCheckUsername,
    useUpdateProfile,
    useUpdateAvatar,
};


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
    fullname: string | null;
    phone: string | null;
    avatar: string | null;
    about: string | null;

    telegram_link: string | null;
    github_link: string | null;
    vk_link: string | null;
    discord_link: string | null;

    followers_count: number;
    followings_count: number;
    is_current_user_followed: boolean;
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
            avatar: data.profile.avatar,
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

const useFollow = () => {
    const mutation = useMutation({
        mutationFn: async (username: string) => {
            return api.profile.follow(username);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    ["profile", data.to_profile_username],
                ],
            });
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

const useUnfollow = () => {
    const mutation = useMutation({
        mutationFn: async (username: string) => {
            return api.profile.unfollow(username);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    ["profile", data.to_profile_username],
                ],
            });
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

const useFollowers = (username: string) => {
    const mutation = useQuery({
        queryKey: ["followers", username],
        queryFn: () => api.profile.getFollowersList(username),
        enabled: !!username,
    });

    return {
        data: mutation.data,
        isPending: mutation.isPending,
    };
};

const useFollowings = (username: string) => {
    const mutation = useQuery({
        queryKey: ["followings", username],
        queryFn: () => api.profile.getFollowingsList(username),
        enabled: !!username,
    });

    return {
        data: mutation.data,
        isPending: mutation.isPending,
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
    useFollow,
    useUnfollow,
    useFollowers,
    useFollowings,
};


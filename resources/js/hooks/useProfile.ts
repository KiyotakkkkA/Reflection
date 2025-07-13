import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";


type Profile = {
    id: number | null;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    patronymic: string | null;
    phone: string | null;
    avatar: string | null;
}

const useProfile = (username: string) => {
    const { data, isPending } = useQuery({
        queryKey: ["profile", username],
        queryFn: () => api.profile.get(username),
        enabled: !!username,
    });

    return {
        data,
        isPending,
    };
};

export type {
    Profile,
};

export {
    useProfile,
};


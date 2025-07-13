import { makeAutoObservable, runInAction } from "mobx";

type User = {
    id: number | null;
    name: string | null;
    email: string | null;
    profile_id: number | null;
    username: string | null;
    avatar: string | null;
}

export const userStore = new class UserStore {

    user: User = {
        id: null,
        name: null,
        email: null,
        profile_id: null,
        username: null,
        avatar: null,
    };

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: User) {
        runInAction(() => {
            this.user = user;
        });
    }
}

export type {
    User,
};

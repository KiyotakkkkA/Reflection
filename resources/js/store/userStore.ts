import { makeAutoObservable, runInAction } from "mobx";

type User = {
    id: number | null;
    name: string | null;
    email: string | null;
    custom_login_set: boolean | null;
    profile_id: number | null;
    username: string | null;
    avatar: string | null;
}

export const userStore = new class UserStore {

    user: User = {
        id: null,
        name: null,
        email: null,
        custom_login_set: null,
        profile_id: null,
        username: null,
        avatar: null,
    };

    constructor() {
        makeAutoObservable(this);
    }

    checkIfUserInHisProfile(profileUsername: string) {
        return this.user.username === profileUsername;
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

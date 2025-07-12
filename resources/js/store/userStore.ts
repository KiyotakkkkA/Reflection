import { makeAutoObservable, runInAction } from "mobx";

type User = {
    id: number | null;
    name: string | null;
    email: string | null;
}

export const userStore = new class UserStore {

    user: User = {
        id: null,
        name: null,
        email: null,
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

export type { User };

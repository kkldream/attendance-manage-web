import {defineStore} from "pinia";

export const useLoginStatusStore = defineStore('loginStatus', {
    state: () => {
        // const token = tokenCookie.value ?? null;
        const token: string | null = null;
        return {
            token: token as string | null,
        }
    },
    getters: {
        isLoggedIn: (state): boolean => state.token === null,
    },
    actions: {
        setLogIn(token: string) {
            this.token = token;
        },
        setToken(token: string | null) {
            this.token = token;
        },
    },
});

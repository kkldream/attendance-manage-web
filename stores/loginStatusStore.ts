import {defineStore} from "pinia";
// import {useCookies} from "vue3-cookies";

// const {cookies} = useCookies();

export const useLoginStatusStore = defineStore('loginStatus', {
  state: () => {
    // const token = cookies.get('token') ?? null;
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
    setLogOut() {
      // cookies.remove('token');
      this.token = null;
    },
  },
});

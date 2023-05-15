import { createStore } from "vuex";

export default createStore({
  state: {
    loading: false,
  },
  getters: {},
  mutations: {},
  actions: {
    async login() {
      console.log("login");
    },
    // ==================================================================================
    async register() {
      console.log("register");
    },
    // ==================================================================================
    async setLoading({ commit }, type) {
      commit("Chamge_Loding", type);
    },
  },
  modules: {},
});

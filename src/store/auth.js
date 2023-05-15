import { createStore } from "vuex";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";

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

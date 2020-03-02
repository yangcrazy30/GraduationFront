import { login, getInfo, updateUserInfo } from "@/api/account/account";
import { getAvatar } from "../../api/account/account";

const state = {
  username: "",
  role: "",
  email: "",
  avatar: "",
  id: ""
};

const getters = {
  isLoggedIn: state => {
    return !!state.email && !!state.role;
  }
};

const actions = {
  async login({ commit, getters }, { email, password }) {
    if (getters.isLoggedIn) return;
    if (localStorage.getItem("ujs")) {
      const response = await getInfo();
      commit("login", response.data.data);
      return;
    }
    if (!email || !password) return;

    let response = await login({ email: email, password: password });
    if (response.data.success) {
      localStorage.setItem("ujs", response.data.data.token);
      commit("login", response.data.data);
      return response;
    } else {
      throw new Error(response.data.data.err);
    }

  },
  async logout({ commit }) {
    commit("logout");
  },
  async updateAvatar({ commit }) {
    const userinfo = await getInfo();
    commit("login", userinfo);
  },
  async changeUserInfo({ commit }, userinfo) {
    await updateUserInfo(userinfo);
    const newuserinfo = await getInfo();
    localStorage.setItem("ujs", newuserinfo.data.data.token);
    commit("login", newuserinfo);
  }
};

const mutations = {
  login(state, payload) {
    state.email = payload.email;
    state.username = payload.username;
    state.role = payload.role;
    state.avatar = payload.avatar;
    state.id = payload.id;
  },
  logout(state) {
    state.username = "";
    state.role = "";
    state.email = "";
    state.avatar = "";
    state.id = "";
    localStorage.clear();
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

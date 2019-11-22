import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loginState: false,
    nameCurrentUser: 'Dat ngu si',
    token: null
  },
  getters: {},
  mutations: {
    changeStateLogin: state => {
      state.loginState = !state.loginState;
    }
  },
  actions:{}
});

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loginState: false,
    nameCurrentUser: 'Dat ngu si',
    token: null,
    dataPost: null,
    currentPage: 1,
    totalPost: 0,
    linkshareFB: "https://www.imdb.com/title/tt0117500/"
  },
  getters: {},
  mutations: {
    changeStateLogin: state => {
      state.loginState = !state.loginState;
    }
  },
  actions:{}
});

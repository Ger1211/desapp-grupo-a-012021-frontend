import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    platform: "",
    apiKey: "",
    language: 'en'
  },
  mutations: {
    updateToken(state, newToken) {
      state.token = newToken;
    },
    updatePlatform(state, newPlatform) {
      state.platform = newPlatform;
    },
    updateApiKey(state, newApiKey) {
      state.apiKey = newApiKey;
    },
    updateLanguage(state, newLanguage) {
      state.language = newLanguage;
    }
  },
  getters: {
    token(state) {
      return state.token;
    },
    platform(state) {
      return state.platform;
    },
    apiKey(state) {
      return state.apiKey;
    },
    language(state) {
      return state.language;
    }
  }
});

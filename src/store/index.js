import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    platform: "",
    apiKey: "",
    credits: 0,
    requests: 0 ,
    priceRequest: 0,
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
    },
    updateCredits(state, newCredits) {
      state.credits = newCredits;
    },
    updateRequests(state, newRequests) {
      state.requests = newRequests;
    },
    updatePriceRequest(state, newPriceRequest) {
      state.priceRequest = newPriceRequest;
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
    },
    credits(state) {
      return state.credits;
    },
    requests(state) {
      return state.requests;
    },
    priceRequest(state) {
      return state.priceRequest;
    }
  }
});

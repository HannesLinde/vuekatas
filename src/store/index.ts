import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    SET_USER_AND_TOKEN(state, payload) {
      const user = payload.user;
      const token = payload.token;
      state.user = user;
      state.token = token;
    }
  },
  actions: {
  },
  modules: {
  }
})

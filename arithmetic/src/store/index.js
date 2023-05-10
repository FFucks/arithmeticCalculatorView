import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/services/api.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    desserts: []
  },
  getters: {
    getdesserts(state) {
      return state.desserts;
    }
  },
  mutations: {
    setdesserts(state, desserts) {
      state.desserts = desserts
    }
  },
  actions: {
    async fetchRecords({commit}) {
      await api.get(`/records/${localStorage.getItem("userId")}`).then(response => {
        commit('setdesserts', response.data);
      });
    }
  },
  modules: {
  }
})

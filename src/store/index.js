import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import mapStore from './modules/mapStore';
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    mapStore
  },
  state: {
    loading: true
  },
  mutations: {
    SET_LOADING: (state, loading = !state.loading) => {
      state.loading = loading
    }
  },
  getters
})

export default store

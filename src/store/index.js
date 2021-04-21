import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true
  },
  mutations: {
    loadStatus (state, flag) {
      state.loading = flag
    }
  },
  modules: {
    common
  }
})

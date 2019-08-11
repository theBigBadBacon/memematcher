import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    memeSrc: null
  },

  getters: {
    src: state => state.memeSrc
  },

  mutations: {
    change(state, newSrc) {
        state.memeSrc = newSrc
    }
  },

  actions: {
    // Here we will create Larry
  }
});
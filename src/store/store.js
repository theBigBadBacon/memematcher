import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    memeSrc: null,
    imgPlaceholderText: 'Meme will go here'
  },

  getters: {
    src: state => state.memeSrc,
    imgPlaceholderText: state => state.imgPlaceholderText
  },

  mutations: {
    change(state, newSrc) {
        state.memeSrc = newSrc
    },
    loading(state) {
        state.imgPlaceholderText = 'Loading...'
    }
  },

  actions: {
  }
});
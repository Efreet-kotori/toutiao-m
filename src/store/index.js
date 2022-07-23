import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, setId } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {}
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setToken(payload)
    }
  },

  // 当前文章id
  setCurrentArticleId (state, payload) {
    state.currentArticleId = payload
    setId(state.currentArticleId)
  }
})

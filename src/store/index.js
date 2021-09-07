import { createStore } from 'vuex'
import ownerStore from './owner.store'
import authStore from './auth.store'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ownerStore,
    authStore
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import {DEBUG} from './settings'
import user from './apps/base/stores/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    history: {
      namespaced: true,
      state: {
        routes: [],
      },
      mutations: {
        addRoute(state,route) {
          if (route.meta.link) {
            const index = state.routes.findIndex(r => r.name === route.name)
            if (index !== -1) {
              state.routes[index] = route
            } else {
              state.routes.push(route)
            }
          }
        },
        removeRoute(state,route) {
          state.routes = state.routes.filter(r => r.name !== route.name)
        },
        clearRoutes(state) {
          state.routes = []
        }
      }
    }
  },
  strict: DEBUG
})

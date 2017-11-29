import Vue from 'vue'
import Vuex from 'vuex'
import {DEBUG} from './settings'
import user from './apps/base/stores/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  strict: DEBUG
})

import {
  refreshRequest,
  loginRequest,
  logoutRequest,
  mailNoticeRequest,
  onlineNoticeRequest
} from '../services/user'
import {RESPONSE_STATUS} from "src/settings";

const namespaced = true

function stateInitial() {
  return {
    id: 0,
    username: null,
    first_name: null,
    last_name: null,
    is_active: false,
    email: null,
    phone: null,
    mail_notice: false,
    online_notice: false,
    address: null,
    permissions: new Set([]),
    groups: new Set([])
  }
}

const state = stateInitial()

const getters = {
  fullName: state => `${state.first_name} ${state.last_name}`
}

const mutations = {
  refreshPermissions(state, permissions) {
    state.permissions = new Set(permissions)
  },
  addPermissions(state, ...permissions) {
    permissions.forEach(perm => state.permissions.add(perm))
  },
  removePermissions(state, ...permissions) {
    permissions.forEach(perm => state.permissions.delete(perm))
  },
  clearPermissions(state) {
    state.permissions.clear()
  },
  activeToggle(state) {
    state.is_active = !state.is_active
  },
  mailNoticeToggle(state) {
    state.mail_notice = !state.mail_notice
  },
  onlineNoticeToggle(state) {
    state.online_notice = !state.online_notice
  },
  refresh(state,user) {
    for (let key of Object.keys(user)) {
      state[key] = user[key]
    }
  },
  clear(state) {
    const initial = stateInitial()
    for (let key of Object.keys(initial)) {
      state[key] = initial[key]
    }
  }
}

const actions = {
  async initial({commit}) {
    const response = await refreshRequest()
    if (response.status === RESPONSE_STATUS.OK) {
      commit('refresh',response.data)
      return true
    }
    return false
  },
  async login({commit},{username,password}) {
    const response = await loginRequest({username,password})
    if (response.status === RESPONSE_STATUS.OK) {
      commit('refresh',response.data)
      return true
    }
    return false
  },
  async logout({commit}) {
    const response = await logoutRequest()
    if (response.status === RESPONSE_STATUS.OK) {
      commit('clear')
      return true
    }
    return false
  },
  async mailNoticeTrigger({state,commit}) {
    const response = await mailNoticeRequest({mail_notice:!state.mail_notice})
    if (response.status === RESPONSE_STATUS.OK) {
      commit('mailNoticeToggle')
      return true
    }
    return false
  },
  async onlineNoticeTrigger({state,commit}) {
    const response = await onlineNoticeRequest({online_notice:!state.online_notice})
    if (response.status === RESPONSE_STATUS.OK) {
      commit('onlineNoticeToggle')
      return true
    }
    return false
  },
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}

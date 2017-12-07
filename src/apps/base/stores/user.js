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
    address_detail: {
      region: null,
      name: null,
    },
    permissions: [],
    groups: [],
    groups_detail: [],
    socket: null,
    talks: [],
  }
}

const state = stateInitial()

const getters = {
  fullName: state => `${state.first_name} ${state.last_name}`,
  initialData: state => stateInitial()
}

const mutations = {
  refreshTalks(state, talks) {
    state.talks = [...talks]
  },
  addTalks(state, ...talks) {
    const oldTalks = new Set(state.talks)
    talks.forEach(talk => oldTalks.add(talk))
    state.talks = [...oldTalks]
  },
  removeTalks(state, ...talks) {
    const oldTalks = new Set(state.talks)
    talks.forEach(talk => oldTalks.delete(talk))
    state.talks = [...oldTalks]
  },
  clearTalks(state) {
    state.talks = []
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
  },
  joinSocket(state,socket) {
    state.socket = socket
  },
  leaveSocket(state) {
    state.socket = null
  },
}

export default {
  namespaced,
  state,
  getters,
  mutations
}

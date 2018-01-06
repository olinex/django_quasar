const namespaced = true

function initial() {
  return {
    id: 0,
    login: false,
    username: null,
    first_name: null,
    last_name: null,
    is_active: false,
    avatar: '',
    email: null,
    phone: null,
    mail_notice: false,
    online_notice: false,
    address: null,
    address_detail: {region: null, name: null},
    permissions: [],
    groups: [],
    groups_detail: [],
    socket: null,
    talkers: [],
    talks: [],
  }
}

const state = initial()

const getters = {
  fullName: state => `${state.first_name} ${state.last_name}`,
  initialData: () => initial()
}

const mutations = {
  refreshTalkers(state, talkers) {
    state.talkers = [...talkers]
  },
  addTalker(state, talker) {
    const oldTalkers = new Set(state.talkers)
    oldTalkers.add(talker)
    state.talkers = [...oldTalkers]
  },
  removeTalker(state, talker) {
    const oldTalkers = new Set(state.talkers)
    oldTalkers.delete(talker)
    state.talkers = [...oldTalkers]
  },
  clearTalkers(state) {
    state.talkers = []
  },
  addTalk(state, talk) {
    state.talks.push(talk)
    state.talks = [...state.talks]
  },
  clearUserTalks(state, user_id) {
    state.talks = state.talks.filter(
      talk => talk.from_user_id !== user_id && talk.to_user_id !== user_id
    )
  },
  readUserTalks(state, user_id) {
    state.talks.filter(
      talk => talk.from_user_id === user_id && talk.to_user_id === state.id
    ).map(
      talk => talk.readed = true
    )
    state.talks = [...state.talks]
  },
  clearAllTalks(state) {
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
  refresh(state, user) {
    for (let key of Object.keys(user)) {
      state[key] = user[key]
    }
  },
  clear(state) {
    const initial = initial()
    for (let key of Object.keys(initial)) {
      state[key] = initial[key]
    }
  },
  joinSocket(state, socket) {
    state.socket = socket
  },
  leaveSocket(state) {
    state.socket = null
  },
  login(state) {
    state.login = true
  },
}

export default {
  namespaced,
  state,
  getters,
  mutations,
}

const namespaced = true

function stateInitial() {
  return {}
}

const state = stateInitial()

const getters = {
  initialData: state => stateInitial()
}

const mutations = {
  clear(state) {
    const initial = stateInitial()
    for (let key of Object.keys(initial)) {
      state[key] = initial[key]
    }
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations
}

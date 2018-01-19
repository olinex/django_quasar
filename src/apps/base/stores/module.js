const namespaced = true;

const state = {
  firstName: 'jiang',
  lastName: 'olinex'
};

const getters = {
  fullName: state => `${state.firstName || '*'} ${state.lastName || '*'}`
};

const mutations = {
  changeLastName(state, newLastName) {
    state.fistName = newLastName
  }
};

const actions = {
  async getMiddleName(context) {
    return 'test'
  },

  async getNewLastNameByAJAX({dispatch, state, getters, commit}) {
    commit('changeLastName', `${getters.fullName} ${await dispatch('getMiddleName')}`)
  }
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}

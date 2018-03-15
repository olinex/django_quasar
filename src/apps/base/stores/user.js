import settings from "src/settings";
import {Toast} from "quasar";
import {baseSocket} from "../services/user";
import {refreshRequest} from "../services/user";
import store from "../../../stores";

const namespaced = true;

function initial() {
  return {
    id: 0,
    login: false,
    username: null,
    first_name: null,
    last_name: null,
    is_active: false,
    avatar: null,
    email: null,
    phone: null,
    mail_notice: false,
    online_notice: false,
    region: null,
    region__name: null,
    region__city: null,
    region__city__name: null,
    region__city__province: null,
    region__city__province__name: null,
    address: null,
    permissions: [],
    new_messages_count: 0,
    groups: [],
    groups_detail: [],
    socket: null,
    talkers: [],
    talks: [],
  }
}

function getColor(status) {
  switch (status) {
    case "success":
      return "positive";
    case "error":
      return "negative";
    default:
      return status
  }
}

function getIcon(status) {
  switch (status) {
    case "success":
      return "done";
    default:
      return status
  }
}

const state = initial();

const getters = {
  fullName: state => `${state.first_name || "*"} ${state.last_name || "*"}`,
  initialData: () => initial()
};

const mutations = {
  setNewMessagesCount(state, count) {
    state.new_messages_count = count
  },
  decrNewMessagesCount(state) {
    state.new_messages_count -= 1
  },
  refreshTalkers(state, talkers) {
    state.talkers = [...talkers]
  },
  addTalker(state, talker) {
    const oldTalkers = new Set(state.talkers);
    oldTalkers.add(talker);
    state.talkers = [...oldTalkers]
  },
  removeTalker(state, talker) {
    const oldTalkers = new Set(state.talkers);
    oldTalkers.delete(talker);
    state.talkers = [...oldTalkers]
  },
  clearTalkers(state) {
    state.talkers = []
  },
  addTalk(state, talk) {
    state.talks.push(talk);
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
    );
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
    const init = initial();
    for (let key of Object.keys(init)) {
      state[key] = init[key]
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
  }
};

const actions = {
  async refreshAction({commit}) {
    const response = await refreshRequest();
    if (response.status === settings.RESPONSE_STATUS.OK) {
      commit("refresh", response.data);
      commit("login");
    } else {
      commit("clear")
    }
  },
  async socketToggleAction({commit, state, dispatch}) {
    if (state.socket) {
      state.socket.close();
      commit("leaveSocket")
    } else {
      const socket = await baseSocket(
      async function(event) {
        const data = JSON.parse(event.data);
        await dispatch("socketResponseAction",data);
      }
      );
      commit("joinSocket",socket)
    }
  },
  socketResponseAction({commit,state},data) {
    const color = getColor(data.status);
    const icon = getIcon(data.status);
    switch (data.type) {
      case "talk":
        commit("addTalk",data);
        commit("addTalker",data.from_user_id);
        break;
      case "response":
        Toast.create[color]({
          icon: icon,
          html: data.detail,
        });
        break;
      case "notice":
        // {user_id,username, avatar, type, detail, content, status, create_time}
        Toast.create.info({
          image: data.avatar,
          timeout: 6000,
          html: `NOTICE: ${data.username} ${data.content}`
        });
        break;
      case "message":
        store.commit("setNewMessagesCount",data.count);
        Toast.create.info({
          image: data.avatar,
          timeout: 6000,
          html: `MESSAGE: ${data.username} ${data.text}`
        });
        break;
  }
}
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}

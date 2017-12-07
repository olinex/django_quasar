import {SessionStorage} from 'quasar'

function initialData() {
  return {
    new_talks: [],
    old_talks: []
  }
}

export default class {
  constructor({user_id}) {
    this.user_id = user_id
  }

  toString() {
    return `talkManager:${this.user_id}`;
  }

  key(user_id) {
    return `self_${this.self_id}_user_talks_${user_id}`
  }
  getTalks(user_id) {
    if (SessionStorage.has(this.key(user_id))) {
      return SessionStorage.get.item(this.key(user_id))
    } else {
      return initialData()
    }
  }
  receiveTalk(user_id,talk) {
    const talks = this.getTalks(user_id)
    SessionStorage.set(
      this.key(user_id),
      {...talks,new_talks:[...talks.new_talks,talk]}
    )
  }
  readTalks(user_id) {
    const talks = this.getTalks(user_id)
    SessionStorage.set(
      this.key(user_id),
      {new_talks:[],old_talks:[...talks.old_talks,...talks.new_talks]}
    )
  }
  clearTalks(user_id) {
    SessionStorage.set(
      this.key(user_id),
      initialData()
    )
  }
  deleteTalks(user_id) {
    SessionStorage.remove(this.key(user_id))
  }
  userNewTalksCount(user_id) {
    return this.getTalks(user_id).new_talks.length
  }
}

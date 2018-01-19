export default function (url) {
  return {
    MESSAGE_URL: (id) => `${url}${id}/message/`,
    CREATE_MESSAGE_URL: (id) => `${url}${id}/create_message/`,
    ADD_FOLLOWER_URL: (id) => `${url}${id}/add_follower/`,
    REMOVE_FOLLOWER_URL: (id) => `${url}${id}/remove_follower/`,
  }
}

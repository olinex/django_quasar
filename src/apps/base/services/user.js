import {corsRequest, newSocket} from "src/utils/request";
import {http, socket} from "../urls/user";

const refreshRequest = async () => {
  return await corsRequest({
    url: http.REFRESH_URL(),
    options: {method: 'GET'}
  })
}

const loginRequest = async ({username, password}) => {
  return await corsRequest({
    url: http.LOGIN_URL(),
    options: {
      method: 'POST',
      data: {username, password}
    }
  })
}

const logoutRequest = async () => {
  return await corsRequest({
    url: http.LOGOUT_URL(),
    options: {method: 'GET'}
  })
}

const passwordRequest = async ({old_password, new_password: {password1, password2}}) => {
  return await corsRequest({
    url: http.PASSWORD_URL(),
    options: {
      method: 'POST',
      data: {old_password, new_password: {password1, password2}}
    }
  })
}

const mailNoticeRequest = async ({mail_notice}) => {
  return await corsRequest({
    url: http.MAIL_NOTICE_URL(),
    options: {
      method: 'POST',
      data: {mail_notice}
    }
  })
}

const onlineNoticeRequest = async ({online_notice}) => {
  return await corsRequest({
    url: http.ONLINE_NOTICE_URL(),
    options: {
      method: 'POST',
      data: {online_notice}
    }
  })
}

const onlineUserRequest = async () => {
  return await corsRequest({
    url: http.ONLINE_USERS_URL(),
    options: {method: 'GET'}
  })
}

const updateRequest = async ({id}, {first_name, last_name, email, phone}) => {
  return await corsRequest({
    url: http.DETAIL_URL(id),
    options: {
      method: 'PATCH',
      data: {first_name, last_name, email, phone}
    }
  })
}

const baseSocket = async (message) => {
  return await newSocket({
    url: socket.base(),
    message: message
  })
}

export {
  refreshRequest,
  loginRequest,
  logoutRequest,
  passwordRequest,
  mailNoticeRequest,
  onlineUserRequest,
  onlineNoticeRequest,
  updateRequest,
  baseSocket
}

import {corsRequest} from "src/utils/request";
import {http} from "../urls/user";

const refreshRequest = async () => {
  return corsRequest(
    http.REFRESH_URL,
    {method: 'GET'}
  )
}

const loginRequest = async ({username, password}) => {
  return corsRequest(
    http.LOGIN_URL,
    {method: 'POST', data: {username, password}}
  );
};

const logoutRequest = async () => {
  return corsRequest(
    http.LOGOUT_URL,
    {method: 'GET'}
  );
};

const mailNoticeRequest = async ({mail_notice}) => {
  return corsRequest(
    http.MAIL_NOTICE_URL,
    {method: 'POST', data: {mail_notice}}
  );
};

const onlineNoticeRequest = async ({online_notice}) => {
  return corsRequest(
    http.ONLINE_NOTICE_URL,
    {method: 'POST', data: {online_notice}}
  );
};

export {
  refreshRequest,
  loginRequest,
  logoutRequest,
  mailNoticeRequest,
  onlineNoticeRequest
}

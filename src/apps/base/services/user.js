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

const passwordRequest = async ({old_password,new_password:{password1,password2}}) => {
  return corsRequest(
    http.LOGOUT_URL,
    {method: 'POST', data:{old_password,new_password:{password1,password2}}}
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
  passwordRequest,
  mailNoticeRequest,
  onlineNoticeRequest
}

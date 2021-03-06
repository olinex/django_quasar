const http = {
  DETAIL_URL: id => `/base/user/${id}/`,
  LOGIN_URL: () => "/base/user/login/",
  LOGOUT_URL: () => "/base/user/logout/",
  REFRESH_URL: () => "/base/user/myself/",
  PASSWORD_URL: () => "/base/user/password/",
  MAIL_NOTICE_URL: () => "/base/user/mail-notice/",
  ONLINE_NOTICE_URL: () => "/base/user/online-notice/",
  ONLINE_USERS_URL: () => "/base/user/online-users/",
};

const socket = {
  base: () => `/`
};

export {
  http, socket
}

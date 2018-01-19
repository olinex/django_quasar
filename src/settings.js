// the status of the debug
const DEBUG = process.env.NODE_ENV !== 'production';

const PROJECT_NAME = 'django vue';

// the most import route: home and main
const HOME_NAME = 'Home';
const HOME_PATH = '/home';
const MAIN_NAME = 'Main';
const MAIN_PATH = '';

// search param settings
const PAGE_KEY = 'page';
const PAGE_SIZE_KEY = 'page_size';
const ORDERING_KEY = 'ordering';

const DEFAULT_PAGE_SIZE = 10;

// message levels of this framework
const LEVELS = {
  EVERYTHING: 2,
  SUCCESS: 1,
  INFO: 0,
  WARNING: -1,
  ERROR: -2,
};

// the name of the csrftoken cookie for request
const XSRFCOOKIENAME = 'csrftoken';

// the name of the csrftoken header for request
const XSRFHEADERNAME = 'X-CSRFToken';

// the level for framework to determine which log will be print
const LOG_LEVEL = LEVELS.WARNING;

// the http location of the server side for program
const HTTP_HOST = DEBUG ? 'http://127.0.0.1:8000' : 'http://127.0.0.1:8000';

// the socket location for program
const SOCKET_HOST = DEBUG ? 'ws://127.0.0.1:8000' : 'ws://127.0.0.1:8000';

// the status of socket connections
const SOCKET_STATUS = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSEING: 2,
  CLOSED: 3
};

// the status of response
const RESPONSE_STATUS = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  RESERVED: 306,
  TEMPORARY_REDIRECT: 307,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  REQUEST_ENTITY_TOO_LARGE: 413,
  REQUEST_URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  INSUFFICIENT_STORAGE: 507,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};

export {
  DEBUG,
  PROJECT_NAME,
  HOME_NAME,
  HOME_PATH,
  MAIN_NAME,
  MAIN_PATH,
  LEVELS,
  LOG_LEVEL,
  XSRFHEADERNAME,
  XSRFCOOKIENAME,
  HTTP_HOST,
  SOCKET_HOST,
  SOCKET_STATUS,
  RESPONSE_STATUS,
  PAGE_KEY,
  PAGE_SIZE_KEY,
  ORDERING_KEY,
  DEFAULT_PAGE_SIZE
}

export default {
  DEBUG,
  PROJECT_NAME,
  HOME_NAME,
  HOME_PATH,
  MAIN_NAME,
  MAIN_PATH,
  LEVELS,
  LOG_LEVEL,
  XSRFHEADERNAME,
  XSRFCOOKIENAME,
  HTTP_HOST,
  SOCKET_HOST,
  SOCKET_STATUS,
  RESPONSE_STATUS,
  PAGE_KEY,
  PAGE_SIZE_KEY,
  ORDERING_KEY,
  DEFAULT_PAGE_SIZE
}

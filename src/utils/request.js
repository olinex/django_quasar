import axios from 'axios'
import {Toast} from 'quasar'
import {
  DEBUG, LOG_LEVEL, LEVELS, FILTER_TYPES,
  HTTP_HOST, SOCKET_HOST, RESPONSE_STATUS,
  XSRFHEADERNAME, XSRFCOOKIENAME,
  PAGE_SIZE_KEY, PAGE_KEY, ORDERING_KEY, DEFAULT_PAGE_SIZE
} from '../settings'

// default method for search param name
const searchName = {
  startswith: field => `${field}__startswith`,
  exact: field => field,
  pageSize: PAGE_SIZE_KEY,
  page: PAGE_KEY,
  ordering: ORDERING_KEY
};


// the serialize helper for develop
const serializer = (response) => {
  console.log({
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  })
};

axios.defaults.xsrfCookieName = XSRFCOOKIENAME;
axios.defaults.xsrfHeaderName = XSRFHEADERNAME;

axios.interceptors.response.use(
  (response) => {
    // if debug mode is open, print the details of the response
    if (DEBUG) {
      serializer(response)
    }
    // if the log level greater than success,it will print the log detail
    if (LOG_LEVEL >= LEVELS.SUCCESS) {
      Toast.create.positive(response.statusText)
    }
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.status >= RESPONSE_STATUS.BAD_REQUEST) {
      if (LOG_LEVEL >= LEVELS.ERROR) {
        Toast.create.negative(error.response.data.detail);
      }
    } else if (error.response.status >= RESPONSE_STATUS.MULTIPLE_CHOICES) {
      if (LOG_LEVEL >= LEVELS.WARNING) {
        Toast.create.warning(error.response.data.detail);
      }
    }
    return Promise.reject(error)
  }
);

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const request = async ({url, options = {}}) => {
  if (DEBUG) {
    console.log('request: ' + url + JSON.stringify(options))
  }
  return await axios(
    {
      url: url,
      baseURL: HTTP_HOST,
      ...options
    }
  ).catch(
    error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        return error.response
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return {
          data: {detail: 'The request was made but no response was received'},
          status: RESPONSE_STATUS.BAD_GATEWAY,
          statusText: error.message,
          headers: {},
          config: error.config,
          request: error.request
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        return {
          data: {detail: 'Something happened in setting up the request that triggered an Error'},
          status: RESPONSE_STATUS.BAD_GATEWAY,
          statusText: error.message,
          headers: {},
          config: error.config,
          request: null
        }
      }
    }
  )
};

const corsRequest = async ({url, options = {}}) => {
  const coptions = {
    ...options,
    data: options.data && JSON.stringify(options.data),
    headers: {...options.headers, 'Content-Type': 'application/json'},
    withCredentials: true,
  };
  return await request({url, options: coptions})
};

let open_handler = () => {
  if (LOG_LEVEL >= LEVELS.INFO) {
    message.info('new socket opened!')
  }
};

let error_handler = () => {
  if (LOG_LEVEL >= LEVELS.ERROR) {
    message.error('socket connect error!')
  }
};

let close_handler = () => {
  if (LOG_LEVEL >= LEVELS.INFO) {
    message.info('socket closed!')
  }
};

// factory method for create a single socket
const newSocket = ({url, message, open = open_handler, error = error_handler, close = close_handler}) => {
  const uri = SOCKET_HOST + url;
  if (DEBUG) {
    console.log('web socket client:', uri)
  }
  const socket = new WebSocket(uri);
  socket.onopen = open;
  socket.onmessage = message;
  socket.onerror = error;
  socket.onclose = close;
  return socket
};

function listRequestCreater(url) {
  return async ({field, terms, pageSize, page, direct, ordering}) => {
    const search = field ? {[searchName.exact(field)]: terms} : {};
    return await corsRequest({
      url: url,
      options: {
        params: {
          ...search,
          [searchName.pageSize]: pageSize || DEFAULT_PAGE_SIZE,
          [searchName.page]: page || 1,
          [searchName.ordering]: ordering ? (direct ? ordering : `-${ordering}`) : '-id',
        }
      }
    })
  }
}

export {
  searchName,
  request,
  corsRequest,
  newSocket,
  listRequestCreater
}

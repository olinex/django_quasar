import axios from 'axios'
import {Toast} from 'quasar'
import {
  DEBUG, LOG_LEVEL, LEVELS,FILTER_TYPES,
  HTTP_HOST, SOCKET_HOST,
  XSRFHEADERNAME, XSRFCOOKIENAME,
} from '../settings'


// the serialize helper for develop
const serializer = (response) => {
  console.log({
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  })
}

axios.defaults.xsrfCookieName = XSRFCOOKIENAME
axios.defaults.xsrfHeaderName = XSRFHEADERNAME

axios.interceptors.response.use(
  (response) => {
    // if debug mode is open, print the details of the response
    if (DEBUG) {serializer(response)}
    // if the log level greater than success,it will print the log detail
    if (LOG_LEVEL >= LEVELS.SUCCESS) {
      Toast.create.positive(response.statusText)
    }
    return response;
  },
  (error) => {
    if (DEBUG) {serializer(error.response)}
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
)

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const request = (url, options = {}) => {
  const uri = HTTP_HOST + url;
  if (DEBUG) {console.log('request: ' + uri + JSON.stringify(options))}
  return axios({url: uri.toString(), ...options}).catch(err => (err.response))
}

const corsRequest = (url, options = {}) => {
  const coptions = {
    ...options,
    data: options.data && JSON.stringify(options.data),
    headers: {...options.headers, 'Content-Type': 'application/json'},
    withCredentials: true,
  }
  return request(url, coptions)
}

let open_handler = () => {
  if (LOG_LEVEL >= LEVELS.INFO) {
    message.info('new socket opened!')
  }
}

let error_handler = () => {
  if (LOG_LEVEL >= LEVELS.ERROR) {
    message.error('socket connect error!')
  }
}

let close_handler = () => {
  if (LOG_LEVEL >= LEVELS.INFO) {
    message.info('socket closed!')
  }
}

// factory method for create a single socket
const newSocket = ({url, message, open = open_handler, error = error_handler, close = close_handler}) => {
  const uri = SOCKET_HOST + url;
  if (DEBUG) {
    console.log('web socket client:', uri)
  }
  const socket = new WebSocket(uri)
  socket.onopen = open
  socket.onmessage = message
  socket.onerror = error
  socket.onclose = close
  return socket
}

export {
  request,
  corsRequest,
  newSocket
}

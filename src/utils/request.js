import axios from "axios";
import {Alert,Toast} from "quasar";
import {
  DEBUG, LOG_LEVEL, LEVELS, FILTER_TYPES,
  HTTP_HOST, SOCKET_HOST,
  XSRFHEADERNAME, XSRFCOOKIENAME,
  PAGE_SIZE_KEY, PAGE_KEY, ORDERING_KEY, DEFAULT_PAGE_SIZE
} from "../settings";

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

axios.interceptors.request.use(
  function (config) {
    if (DEBUG) {
      console.log(config)
    }
    return config
  }
);

axios.interceptors.response.use(
  function (response) {
    // if debug mode is open, print the details of the response
    if (DEBUG) {
      serializer(response);
    }
    return response;
  },

);

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const request = async ({url, options = {}}) => {
  return await axios(
    {
      url: url,
      baseURL: HTTP_HOST,
      ...options
    }).catch(function (error) {
      if (error.response) {
        Alert.create({
          position: "bottom-left",
          color: "warning",
          icon: "warning",
          enter: "bounceInLeft",
          leave: "bounceOutLeft",
          html: Object.entries(error.response.data).map(entry => entry.join(": ")).join("; "),
        });
        return error.response
      } else if (error.request) {
        Toast.create.negative("The request was made but no response was received");
      } else {
        Toast.create.negative("Something happened in setting up the request that triggered an Error");
      }
      return Promise.reject(error)
    }
  )
};

const corsRequest = async ({url, options = {}}) => {
  const coptions = {
    ...options,
    data: options.data && JSON.stringify(options.data),
    headers: {...options.headers, "Content-Type": "application/json"},
    withCredentials: true,
  };
  return await request({url, options: coptions})
};

let open_handler = () => {
  if (LOG_LEVEL >= LEVELS.INFO) {
    message.info("new socket opened!")
  }
};

let error_handler = () => {
  if (LOG_LEVEL >= LEVELS.ERROR) {
    message.error("socket connect error!")
  }
};

let close_handler = () => {
  if (LOG_LEVEL >= LEVELS.INFO) {
    message.info("socket closed!")
  }
};

// factory method for create a single socket
const newSocket = ({url, message, open = open_handler, error = error_handler, close = close_handler}) => {
  const uri = SOCKET_HOST + url;
  if (DEBUG) {
    console.log("web socket client:", uri)
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
    console.log({field, terms, pageSize, page, direct, ordering});
    const search = field ? {[searchName.exact(field)]: terms} : {};
    return await corsRequest({
      url: url,
      options: {
        params: {
          ...search,
          [searchName.pageSize]: pageSize || DEFAULT_PAGE_SIZE,
          [searchName.page]: page || 1,
          [searchName.ordering]: ordering ? (direct > 0 ? ordering : `-${ordering}`) : "-id",
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

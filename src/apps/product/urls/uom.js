const http = {
  LIST_URL: () => `/product/uom/`,
  DETAIL_URL: (id) => `/product/uom/${id}/`,
  CONVERT_URL: (id) => `/product/uom/${id}/convert-to-uom/`
};

const socket = {};

export {
  http, socket
}

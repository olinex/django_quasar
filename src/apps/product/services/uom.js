import {corsRequest, searchName} from "src/utils/request";
import {http} from "../urls/uom";
import {DEFAULT_PAGE_SIZE} from "src/settings";

const searchRequest = async ({ name, pageSize, page = 1, ordering = "-id"}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      params: {
        [searchName.startswith("name")]: name,
        [searchName.pageSize]: pageSize || DEFAULT_PAGE_SIZE,
        [searchName.page]: page,
        [searchName.ordering]: ordering,
      }
    }
  })
};

const detailRequest = async (id) => {
  return await corsRequest({
    url: http.DETAIL_URL(id),
    options: {method: "GET"}
  })
};

const updateRequest = async ({id,name,symbol,decimal_places,round_method,ratio,category,sequence}) => {
  return await corsRequest({
    url: http.DETAIL_URL(id),
    options: {
      method: "PATCH",
      data: {
        name,symbol,decimal_places,round_method,ratio,category,sequence
      }
    }
  })
};

const createRequest = async ({name,symbol,decimal_places,round_method,ratio,category,sequence}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      method: "POST",
      data: {
        name,symbol,decimal_places,round_method,ratio,category,sequence
      }
    }
  })
};

const convertRequest = async ({id, to_uom, value}) => {
  return await corsRequest({
    url: http.CONVERT_URL(id),
    options: {
      method: "GET",
      params: {
        to_uom, value
      }
    }
  })
};

export {
  searchRequest,
  updateRequest,
  detailRequest,
  createRequest,
  convertRequest,
}

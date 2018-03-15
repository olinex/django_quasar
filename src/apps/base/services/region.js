import {corsRequest, searchName} from "src/utils/request";
import {http} from "../urls/region";
import {DEFAULT_PAGE_SIZE} from "src/settings";

const searchRequest = async ({city, name, pageSize, page, ordering}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      params: {
        city,
        [searchName.startswith("name")]: name,
        [searchName.pageSize]: pageSize || DEFAULT_PAGE_SIZE,
        [searchName.page]: page || 1,
        [searchName.ordering]: ordering || "-id",
      }
    }
  })
};

const cityLimitSearchRequest = (city) => {
  return ({name, pageSize, page, ordering}) => {
    return searchRequest({
      city, name, pageSize, page, ordering
    })
  }
};

const detailRequest = async (id) => {
  return await corsRequest({
    url: http.DETAIL_URL(id),
    options: {method: "GET"}
  })
};

const updateRequest = async ({id,name,country,sequence}) => {
  return await corsRequest({
    url: http.DETAIL_URL(id),
    options: {
      method: "PATCH",
      data: {
        name,country,sequence
      }
    }
  })
};

const createRequest = async ({name,city,sequence}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      method: "POST",
      data: {
        name,city,sequence
      }
    }
  })
};

export {
  searchRequest,
  cityLimitSearchRequest,
  detailRequest,
  updateRequest,
  createRequest
}

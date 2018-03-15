import {corsRequest, searchName} from "src/utils/request";
import {http} from "../urls/province";
import {DEFAULT_PAGE_SIZE} from "src/settings";

const searchRequest = async ({country, name, pageSize, page, ordering}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      params: {
        country,
        [searchName.startswith("name")]: name,
        [searchName.pageSize]: pageSize || DEFAULT_PAGE_SIZE,
        [searchName.page]: page || 1,
        [searchName.ordering]: ordering || "-id",
      }
    }
  })
};

const countryLimitSearchRequest = (country) => {
  return ({name, pageSize, page, ordering}) => {
    return searchRequest({
      country, name, pageSize, page, ordering
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

const createRequest = async ({name,country,sequence}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      method: "POST",
      data: {
        name,country,sequence
      }
    }
  })
};

export {
  searchRequest,
  countryLimitSearchRequest,
  detailRequest,
  updateRequest,
  createRequest
}

import {corsRequest, searchName} from "src/utils/request";
import {http} from "../urls/city";
import {DEFAULT_PAGE_SIZE} from "src/settings";

const searchRequest = async ({province, name, pageSize, page, ordering}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      params: {
        province,
        [searchName.startswith("name")]: name,
        [searchName.pageSize]: pageSize || DEFAULT_PAGE_SIZE,
        [searchName.page]: page || 1,
        [searchName.ordering]: ordering || "-id",
      }
    }
  })
};

const provinceLimitSearchRequest = (province) => {
  return ({name, pageSize, page, ordering}) => {
    return searchRequest({
      province, name, pageSize, page, ordering
    })
  }
};

const detailRequest = async (id) => {
  return await corsRequest({
    url: http.DETAIL_URL(id),
    options: {method: "GET"}
  })
};

const updateRequest = async ({id,name,province,sequence}) => {
  return await corsRequest({
    url: http.DETAIL_URL(id),
    options: {
      method: "PATCH",
      data: {
        name,province,sequence
      }
    }
  })
};

const createRequest = async ({name,province,sequence}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      method: "POST",
      data: {
        name,province,sequence
      }
    }
  })
};

export {
  searchRequest,
  provinceLimitSearchRequest,
  detailRequest,
  updateRequest,
  createRequest
}

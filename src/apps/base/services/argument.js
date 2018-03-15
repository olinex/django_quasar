import {corsRequest, searchName} from "src/utils/request";
import {http} from "../urls/argument";
import {DEFAULT_PAGE_SIZE} from "src/settings";

const searchRequest = async ({name, pageSize, page, ordering}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      params: {
        [searchName.startswith("name")]: name,
        [searchName.pageSize]: pageSize || DEFAULT_PAGE_SIZE,
        [searchName.page]: page || 1,
        [searchName.ordering]: ordering || "-id",
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

const updateRequest = async ({id,value,sequence}) => {
  return await corsRequest({
    url: http.DETAIL_URL(id),
    options: {
      method: "PATCH",
      data: {
        value,sequence
      }
    }
  })
};

export {
  searchRequest,
  detailRequest,
  updateRequest,
}

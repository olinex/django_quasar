import {corsRequest, searchName} from "src/utils/request";
import {http} from "../urls/region";
import {DEFAULT_SEARCH_SIZE} from "src/settings";

const searchRequest = async ({city, name, pageSize, page = 1, ordering = '-id'}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      params: {
        city,
        [searchName.startswith('name')]: name,
        [searchName.pageSize]: pageSize || DEFAULT_SEARCH_SIZE,
        [searchName.page]: page,
        [searchName.ordering]: ordering,
      }
    }
  })
}

const cityLimitSearchRequest = (city) => {
  return ({name, pageSize, page = 1, ordering = '-id'}) => {
    return searchRequest({
      city,
      name,
      pageSize,
      page,
      ordering
    })
  }
}

export {
  searchRequest,
  cityLimitSearchRequest
}

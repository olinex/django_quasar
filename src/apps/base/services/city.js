import {corsRequest, searchName} from "src/utils/request";
import {http} from "../urls/city";
import {DEFAULT_SEARCH_SIZE} from "src/settings";

const searchRequest = async ({province, name, pageSize, page = 1, ordering = '-id'}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      params: {
        province,
        [searchName.startswith('name')]: name,
        [searchName.pageSize]: pageSize || DEFAULT_SEARCH_SIZE,
        [searchName.page]: page,
        [searchName.ordering]: ordering,
      }
    }
  })
}

const provinceLimitSearchRequest = (province) => {
  return ({name, pageSize, page = 1, ordering = '-id'}) => {
    console.log('province',province)
    return searchRequest({
      province,
      name,
      pageSize,
      page,
      ordering
    })
  }
}

export {
  searchRequest,
  provinceLimitSearchRequest
}

import {corsRequest, searchName} from "src/utils/request";
import {http} from "../urls/demo";
import {DEFAULT_SEARCH_SIZE} from "src/settings";

const searchRequest = async ({ name, pageSize, page = 1, ordering = '-id'}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      params: {
        [searchName.startswith('name')]: name,
        [searchName.pageSize]: pageSize || DEFAULT_SEARCH_SIZE,
        [searchName.page]: page,
        [searchName.ordering]: ordering,
      }
    }
  })
}

export {
  searchRequest
}

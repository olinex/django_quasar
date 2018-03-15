import {corsRequest, searchName} from "src/utils/request";
import {http} from "../urls/product";
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

const updateRequest = async ({
  id, template, attributes, prices, in_code, out_code, salable, purchasable, rentable, weight, volume, sequence
}) => {
  return await corsRequest({
    url: http.DETAIL_URL(id),
    options: {
      method: "PATCH",
      data: {
        template, attributes, prices,
        in_code, out_code, salable,
        purchasable, rentable, weight, volume, sequence
      }
    }
  })
};

const createRequest = async ({
  id, template, attributes, prices, in_code, out_code, salable, purchasable, rentable, weight, volume, sequence
}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      method: "POST",
      data: {
        id, template, attributes,
        prices, in_code, out_code,
        salable, purchasable, rentable,
        weight, volume, sequence
      }
    }
  })
};

export {
  searchRequest,
  updateRequest,
  detailRequest,
  createRequest,
}

import {corsRequest, searchName} from "src/utils/request";
import {http} from "../urls/productTemplate";
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
  id, name, stock_type, attributes, uom,
  detail, in_description, out_description, category, sequence
}) => {
  return await corsRequest({
    url: http.DETAIL_URL(id),
    options: {
      method: "PATCH",
      data: {
        name, stock_type, attributes, uom,
        detail, in_description, out_description, category, sequence
      }
    }
  })
};

const createRequest = async ({
  name, stock_type, attributes, uom,
  detail, in_description, out_description, category, sequence
}) => {
  return await corsRequest({
    url: http.LIST_URL(),
    options: {
      method: "POST",
      data: {
        name, stock_type, attributes, uom,
        detail, in_description, out_description, category, sequence
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

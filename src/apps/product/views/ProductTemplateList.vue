<template>
  <base-table
    title="product template" :columns="columns" :url="url"
    create="product:ProductTemplateCreate"
    detail="product:ProductTemplateForm" confirm lock active remove
  >
  </base-table>
</template>

<script>
  import {http} from "../urls/productTemplate";
  import {dataColumns} from "src/utils/columns";
  import {STOCK_TYPIES} from "../options";
  import listSelector from "src/utils/list-selector";

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: dataColumns([
          {label: "name", field: "name", width: "100px", filter: true, sort: true, type: "string"},
          {
            label: "stock type", field: "stock_type", width: "50px", filter: true, sort: true, type: "string",
            format: listSelector(STOCK_TYPIES)
          },
          {label: "detail", field: "detail", width: "100px", filter: false, sort: false, type: "string"},
          {label: "uom", field: "uom__name", width: "50px", filter: true, sort: true, type: "string"},
          {label: "category", field: "category__name", width: "50px", filter: true, sort: true, type: "string"},
        ])
      }
    },
  }
</script>

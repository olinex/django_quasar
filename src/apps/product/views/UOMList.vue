<template>
  <base-table
    title="uom" :columns="columns" :url="url"
    create="product:UOMCreate"
    detail="product:UOMForm" confirm lock active remove
  >
  </base-table>
</template>

<script>
  import {http} from "../urls/uom";
  import {dataColumns} from "src/utils/columns";
  import {ROUND_METHODS,CATEGORIES} from "../options";
  import listSelector from "src/utils/list-selector";

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: dataColumns([
          {label: "name", field: "name", width: "100px", filter: true, sort: true, type: "string"},
          {label: "symbol", field: "symbol", width: "50px", filter: true, sort: true, type: "string"},
          {label: "decimal places", field: "decimal_places", width: "50px", filter: true, sort: true, type: "number"},
          {label: "ratio", field: "ratio", width: "50px", filter: true, sort: true, type: "number"},
          {
            label: "round method", field: "round_method", width: "50px", filter: true, sort: false, type: "string",
            format: listSelector(ROUND_METHODS)
          },
          {
            label: "category", field: "category", width: "50px", filter: true, sort: false, type: "string",
            format: listSelector(CATEGORIES)
          },
        ])
      }
    },
  }
</script>

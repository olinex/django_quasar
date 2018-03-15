<template>
  <base-table
    title="product" :columns="columns" :url="url"
    create="product:ProductCreate"
    detail="product:ProductForm" confirm lock active remove
  >
  </base-table>
</template>

<script>
  import {http} from "../urls/product";
  import {dataColumns} from "src/utils/columns";

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: dataColumns([
          {label: "template", field: "template__name", width: "100px", filter: true, sort: true, type: "string"},
          {label: "in code", field: "in_code", width: "50px", filter: true, sort: true, type: "string"},
          {label: "out code", field: "out_code", width: "50px", filter: true, sort: true, type: "string"},
          {label: "attributes", field: "attributes", width: "100px", filter: false, sort: false, type: "dict"},
          {label: "prices", field: "prices", width: "100px", filter: false, sort: false, type: "dict"},
          {label: "weight", field: "weight", width: "50px", filter: true, sort: true, type: "number"},
          {label: "volume", field: "volume", width: "50px", filter: true, sort: true, type: "number"},
          {label: "salable", field: "salable", width: "50px", filter: true, sort: true, type: "boolean"},
          {label: "purchasable", field: "purchasable", width: "50px", filter: true, sort: true, type: "boolean"},
          {label: "rentable", field: "rentable", width: "50px", filter: true, sort: true, type: "boolean"},
        ])
      }
    },
  }
</script>

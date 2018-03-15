<template>
  <base-table
    title="product category" :columns="columns" :url="url"
    create="product:ProductCategoryCreate"
    detail="product:ProductCategoryForm" confirm lock active remove
  >
  </base-table>
</template>

<script>
  import {http} from "../urls/productCategory";
  import {dataColumns} from "src/utils/columns";

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: dataColumns([
          {label: "name", field: "name", width: "100px", filter: true, sort: true, type: "string"}
        ])
      }
    },
  }
</script>

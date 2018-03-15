<template>
  <base-table
    title="Province" :columns="columns" :url="url"
    create="base:ProvinceCreate"
    detail="base:ProvinceForm" confirm active lock remove
  />
</template>

<script>
  import {http} from "../urls/province";
  import {dataColumns} from "src/utils/columns";
  import {COUNTRIES} from "../options";
  import listSelector from "src/utils/list-selector";

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: dataColumns([
          {
            label: "country", field: "country", width: "50px", filter: true, sort: true, type: "string",
            format: listSelector(COUNTRIES)
          },
          {label: "name", field: "name", width: "100px", filter: true, sort: true, type: "string"},
        ])
      }
    },
  }
</script>

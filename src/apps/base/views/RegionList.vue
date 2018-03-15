<template>
  <base-table
    title="Region" :columns="columns" :url="url"
    create="base:RegionCreate"
    detail="base:RegionForm" confirm active lock remove
  />
</template>

<script>
  import {http} from "../urls/region";
  import {dataColumns} from "src/utils/columns";
  import {COUNTRIES} from "../options";
  import listSelector from "src/utils/list-selector";

  export default {
    data() {
      return {
        url: http.LIST_URL(),
        columns: dataColumns([
          {
            label: "country", field: "city__province__country", width: "50px", filter: true, sort: true, type: "string",
            format: listSelector(COUNTRIES)
          },
          {label: "province", field: "city__province__name", width: "50px", filter: true, sort: true, type: "string"},
          {label: "city", field: "city__name", width: "50px", filter: true, sort: true, type: "string"},
          {label: "name", field: "name", width: "100px", filter: true, sort: true, type: "string"},
        ])
      }
    },
  }
</script>

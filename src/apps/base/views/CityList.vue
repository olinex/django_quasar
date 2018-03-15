<template>
  <base-table
    title="City" :columns="columns" :url="url"
    create="base:CityCreate"
    detail="base:CityForm" confirm active lock remove
  >
  </base-table>
</template>

<script>
  import {http} from "../urls/city";
  import {dataColumns} from "src/utils/columns";
  import {COUNTRIES} from "../options";
  import listSelector from "src/utils/list-selector";

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: dataColumns([
          {
            label: "country", field: "province__country", width: "50px", filter: true, sort: true, type: "string",
            format: listSelector(COUNTRIES)
          },
          {label: "province", field: "province__name", width: "50px", filter: true, sort: true, type: "string"},
          {label: "name", field: "name", width: "100px", filter: true, sort: true, type: "string"},
        ])
      }
    },
  }
</script>

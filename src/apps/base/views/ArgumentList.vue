<template>
  <history-table title="Argument" :columns="columns" :url="url" detail="base:ArgumentForm"/>
</template>

<script>
  import {http} from "../urls/argument"
  import {sequence, historyColumns} from "src/utils/columns";

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: historyColumns([
          {label: "name", field: "name", width: "100px", filter: true, sort: true, type: "string"},
          {label: "form", field: "form", width: "40px", filter: true, sort: true, type: "string"},
          {
            label: "value", field: "value", width: "100px", filter: true, sort: true, type: "string",
            format(value) {
              return JSON.stringify(value)
            }
          },
          sequence
        ])
      }
    },
  }
</script>

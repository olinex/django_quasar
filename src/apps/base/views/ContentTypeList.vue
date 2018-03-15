<template>
  <history-table
    title="Content Type"
    :columns="columns"
    :url="url"
  />
</template>

<script>
  import {http} from "../urls/contentType";
  import {id} from "src/utils/columns";

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: [
          id,
          {label: "app label", field: "app_label", width: "200px", filter: true, sort: true, type: "string"},
          {label: "model", field: "model", width: "200px", filter: true, sort: true, type: "string"},
        ]
      }
    },
  }
</script>

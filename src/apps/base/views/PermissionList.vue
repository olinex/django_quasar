<template>
  <history-table title="Permission" :columns="columns" :url="url"/>
</template>

<script>
  import {http} from "../urls/permission";
  import {id} from "src/utils/columns"

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: [
          id,
          {label: "name", field: "name", width: "120px", filter: true, sort: true, type: "string"},
          {label: "code name", field: "codename", width: "120px", filter: true, sort: true, type: "string"},
          {label: "app label", field: "content_type__app_label", width: "80px", filter: true, sort: true, type: "string"},
          {label: "model", field: "content_type__model", width: "80px", filter: true, sort: true, type: "string"},

        ]
      }
    },
  }
</script>

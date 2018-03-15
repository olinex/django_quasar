<template>
  <history-table
    title="Attribute" :columns="columns" :url="url"
    create="product:AttributeCreate"
    detail="product:AttributeForm" remove
  >
  </history-table>
</template>

<script>
  import {http} from "../urls/attribute";
  import {sequence, historyColumns} from "src/utils/columns";

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: historyColumns([
          {label: "name", field: "name", width: "100px", filter: true, sort: true, type: "string"},
          {label: "value", field: "value", width: "100px", filter: false, sort: false, type: "list"},
          sequence
        ])
      }
    },
  }
</script>

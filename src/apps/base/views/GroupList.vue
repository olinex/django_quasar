<template>
  <history-table
    create="base:GroupCreate"
    detail="base:GroupForm"
    remove
    title="Group"
    :columns="columns"
    :url="url"
  />
</template>

<script>
  import {http} from "../urls/group";
  import {id} from "src/utils/columns";

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: [
          id,
          {label: "name", field: "name", width: "200px", filter: true, sort: true, type: "string"},
        ]
      }
    },
  }
</script>

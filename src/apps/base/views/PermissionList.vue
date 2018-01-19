<template>
  <base-table
    title="Permission"
    :columns="columns"
    :url="url"
  />
</template>

<script>
  import {http} from '../urls/permission'

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: [
          {label: 'id', field: 'id', width: '40px', filter: true, sort: true, type: 'number'},
          {label: 'name', field: 'name', width: '200px', filter: true, sort: true, type: 'string'},
          {label: 'code name', field: 'codename', width: '200px', filter: true, sort: true, type: 'string'},
        ]
      }
    },
  }
</script>

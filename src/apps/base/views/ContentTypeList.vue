<template>
  <base-table
    title="Content Type"
    :columns="columns"
    :url="url"
  />
</template>

<script>
  import {http} from '../urls/contentType'

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: [
          {label: 'id', field: 'id', width: '40px', filter: true, sort: true, type: 'number'},
          {label: 'app label', field: 'app_label', width: '200px', filter: true, sort: true, type: 'string'},
          {label: 'model', field: 'model', width: '200px', filter: true, sort: true, type: 'string'},
        ]
      }
    },
  }
</script>

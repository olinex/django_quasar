<template>
  <base-table
    title="Attribute" :columns="columns" :url="url"
    create="product:AttributeCreate"
    detail="product:AttributeForm" remove
  >
  </base-table>
</template>

<script>
  import {http} from '../urls/attribute'

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: [
          {label: 'id', field: 'id', width: '40px', filter: true, sort: true, type: 'number'},
          {label: 'name', field: 'name', width: '100px', filter: true, sort: true, type: 'string'},
          {label: 'value', field: 'value', width: '100px', filter: true, sort: false, type: 'list'},
          {label: 'create time', field: 'create_time', width: '50px', filter: false, sort: true, type: 'datetime'},
          {label: 'last modify time', field: 'last_modify_time', width: '50px', filter: false, sort: true, type: 'datetime'},
        ]
      }
    },
  }
</script>

<template>
  <base-table title="Argument" :columns="columns" :url="url" detail="base:ArgumentForm"/>
</template>

<script>
  import {http} from '../urls/argument'

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: [
          {label: 'id', field: 'id', width: '40px', filter: true, sort: true, type: 'number'},
          {label: 'name', field: 'name', width: '100px', filter: true, sort: true, type: 'string'},
          {label: 'form', field: 'form', width: '40px', filter: true, sort: true, type: 'string'},
          {
            label: 'value', field: 'value', width: '100px', filter: false, sort: false, type: 'string',
            format(value) {
              return JSON.stringify(value)
            }
          },
          {
            label: 'create time', field: 'create_time', width: '50px', filter: false, sort: true, type: 'string',
            format(value) {
              return new Date(value).toLocaleString()
            }
          },
          {
            label: 'last modify time', field: 'last_modify_time', width: '50px', filter: false, sort: true, type: 'string',
            format(value) {
              return new Date(value).toLocaleString()
            }
          },
        ]
      }
    },
  }
</script>

<template>
  <base-table create="base:GroupCreate" title="Group" :columns="columns" :url="url" detail="base:GroupForm"/>
</template>

<script>
  import {http} from '../urls/group'

  export default {
    data() {
      return {
        url:http.LIST_URL(),
        columns: [
          {label: 'id', field: 'id', width: '40px', filter: true, sort: true, type: 'number'},
          {label: 'name', field: 'name', width: '200px', filter: true, sort: true, type: 'string'},
        ]
      }
    },
  }
</script>

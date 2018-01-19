<template>
  <base-table
    title="Region" :columns="columns" :url="url"
    create="base:RegionCreate"
    detail="base:RegionForm" confirm active lock remove
  />
</template>

<script>
  import {http} from '../urls/region'

  export default {
    data() {
      return {
        url: http.LIST_URL(),
        columns: [
          {label: 'id', field: 'id', width: '40px', filter: true, sort: true, type: 'number'},
          {label: 'country', field: 'city__province__country', width: '50px', filter: true, sort: true, type: 'string'},
          {label: 'province', field: 'city__province__name', width: '50px', filter: true, sort: true, type: 'string'},
          {label: 'city', field: 'city__name', width: '50px', filter: true, sort: true, type: 'string'},
          {label: 'name', field: 'name', width: '100px', filter: true, sort: true, type: 'string'},
          {label: 'draft status', field: 'is_draft', width: '50px', filter: true, sort: true, type: 'boolean'},
          {label: 'active status', field: 'is_active', width: '50px', filter: true, sort: true, type: 'boolean'},
          {
            label: 'create time', field: 'create_time', width: '50px', filter: false, sort: true, type: 'string',
            format(value) {
              return new Date(value).toLocaleString()
            }
          },
          {
            label: 'last modify time',
            field: 'last_modify_time',
            width: '50px',
            filter: false,
            sort: true,
            type: 'string',
            format(value) {
              return new Date(value).toLocaleString()
            }
          },
        ]
      }
    },
  }
</script>

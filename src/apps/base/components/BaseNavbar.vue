<template>
  <q-tabs slot="navigation" color="blue-4" inverted>
    <q-route-tab
      slot="title"
      :to="{name: routeName('ProvinceList')}"
      replace hide="icon" label="province"
    />

    <q-route-tab
      slot="title"
      :to="{name: routeName('CityList')}"
      replace hide="icon" label="city"
    />

    <q-route-tab
      slot="title"
      :to="{name: routeName('RegionList')}"
      replace hide="icon" label="region"
    />

    <q-route-tab
      slot="title"
      :to="{name: routeName('ArgumentList')}"
      replace hide="icon" label="argument"
    />

    <q-route-tab
      slot="title"
      :to="{name: routeName('GroupList')}"
      replace hide="icon" label="group"
    />

    <q-route-tab
      slot="title"
      :to="{name: routeName('PermissionList')}"
      replace hide="icon" label="permission"
    />

    <q-route-tab
      slot="title"
      :to="{name: routeName('ContentTypeList')}"
      replace hide="icon" label="content type"
    />
  </q-tabs>
</template>

<script>
  import {routeName} from "../apps";

  export default {
    data() {
      return {}
    },
    methods: {
      routeName
    }
  }
</script>

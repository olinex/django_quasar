<template>
  <q-tabs slot="navigation" color="blue-4">
    <q-route-tab
      slot="title"
      :to="{name:'base:ProvinceList'}"
      replace hide="icon" label="province"
    ></q-route-tab>

    <q-route-tab
      slot="title"
      :to="{name:'base:CityList'}"
      replace hide="icon" label="city"
    ></q-route-tab>

    <q-route-tab
      slot="title"
      :to="{name:'base:RegionList'}"
      replace hide="icon" label="region"
    ></q-route-tab>

    <q-route-tab
      slot="title"
      :to="{name:'base:ArgumentList'}"
      replace hide="icon" label="argument"
    ></q-route-tab>

    <q-route-tab
      slot="title"
      :to="{name:'base:GroupList'}"
      replace hide="icon" label="group"
    ></q-route-tab>
  </q-tabs>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<template>
  <q-tabs slot="navigation" color="blue-4" inverted>
    <q-route-tab
      slot="title"
      :to="{name: routeName('AboutUs')}"
      replace hide="icon" label="about us"
    />

    <q-route-tab
      slot="title"
      :to="{name: routeName('Support')}"
      replace hide="icon" label="support"
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

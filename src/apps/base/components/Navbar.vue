<template>
  <q-tabs slot="navigation" color="blue-4">
    <q-route-tab slot="title" icon="error" to="/401" replace hide="icon" label="401"/>
    <q-route-tab slot="title" icon="error" to="/404" replace hide="icon" label="404"/>
  </q-tabs>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

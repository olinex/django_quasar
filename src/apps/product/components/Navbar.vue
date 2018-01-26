<template>
  <q-tabs slot="navigation" color="blue-4" inverted>
    <q-route-tab
      slot="title"
      :to="{name:'product:AttributeList'}"
      replace hide="icon" label="attribute"
    />
  </q-tabs>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

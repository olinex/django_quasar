<template>
  <q-tabs slot="navigation" color="blue-4" inverted>
    <q-route-tab
      slot="title"
      :to="{name: routeName('ProductList')}"
      replace hide="icon" label="product"
    />

    <q-route-tab
      slot="title"
      :to="{name: routeName('ProductTemplateList')}"
      replace hide="icon" label="product template"
    />

    <q-route-tab
      slot="title"
      :to="{name: routeName('ProductCategoryList')}"
      replace hide="icon" label="product category"
    />

    <q-route-tab
      slot="title"
      :to="{name: routeName('AttributeList')}"
      replace hide="icon" label="attribute"
    />

    <q-route-tab
      slot="title"
      :to="{name: routeName('UOMList')}"
      replace hide="icon" label="UOM"
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

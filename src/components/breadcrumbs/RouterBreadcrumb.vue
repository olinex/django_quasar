<template>
  <ul class="breadcrumb">
    <li>
      <router-link :to="{name:homeName,path:homePath}">
        {{ homeName }}
      </router-link>
    </li>
    <li v-for="route in routes" :key="route.name">
      <router-link :to="route">
        {{ route.meta && route.meta.verboseName || route.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "router-breadcrumb",
    data() {
      return {
        homeName: this.$settings.HOME_NAME,
        homePath: this.$settings.HOME_PATH
      }
    },
    computed: {
      routes() {
        return this.$route.matched.filter(
          route => route.name !== this.homeName && route.meta && route.meta.link
        )
      }
    }
  }
</script>

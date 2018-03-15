<template>
  <div>
    <div style="margin-bottom: 10px"><navbar/></div>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from "../components/BaseNavbar.vue"
  export default {
    components:{
      Navbar
    }
  }
</script>


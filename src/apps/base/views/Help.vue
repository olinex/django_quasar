<template>
  <div>
    <div style="margin-bottom: 10px"><navbar/></div>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from "../components/HelpNavbar.vue"
  export default {
    components:{
      Navbar
    }
  }
</script>


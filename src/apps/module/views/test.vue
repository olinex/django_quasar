<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapState, mapGetters, mapActions} = createNamespacedHelpers('module')
  export default {
    name: 'test',
    data () {
      return {
        message: 'test'
      }
    },
    computed: {
      test() {
        return `${this.$data.test} a`
      }
    }
  }
</script>

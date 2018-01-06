<template>
  <div class="row items-center">
    <div class="col-11">
      <div class="row no-wrap scroll">
        <q-chip
          class="cursor-pointer"
          tag closable small v-for="route in routes"
          @close="closeHandler(route)" :key="route.name"
          :color="route.name === $route.name ? 'positive' : 'faded'"
          @click="$router.replace({name:route.name,params:route.params})"
        >
          {{route.meta.verboseName}}
        </q-chip>
      </div>
    </div>
    <div class="col-1">
      <q-btn icon="more_vert" color="faded" flat round small>
        <q-popover ref="popover">
          <q-list link class="no-border">
            <q-item @click="clearOthers(),$refs.popover.close()">
              <q-item-main label="clear others"></q-item-main>
            </q-item>
            <q-item @click="clearAll(),$refs.popover.close()">
              <q-item-main label="clear all"></q-item-main>
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </div>
  </div>
</template>

<script>
  import {MAIN_NAME} from "src/settings";

  export default {
    name: "",
    props: {},
    beforeCreate() {
      // after initial,before data observer and event/watcher
    },
    created() {
      // after data boserver/event/watcher/computed/method,before render
    },
    beforeMount() {
      // after render,before mount to virtial-DOM
    },
    mounted() {
      // after mount to virtual-DOM,before destory
    },
    beforeUpdate() {
      // always called when data changes,after mouted,before destory
    },
    updated() {
      // always called when data changes,after beforeUpdate
    },
    beforeDestroy() {
      // after vm.$destroy is called
    },
    destroyed() {
      // after element was destroy
    },
    data() {
      return {}
    },
    computed: {
      routes() {
        return this.$store.state.history.routes
      }
    },
    methods: {
      clearAll() {
        this.$store.commit('history/clearRoutes')
        this.$router.replace({name:MAIN_NAME})
      },
      clearOthers() {
        this.$store.commit('history/clearRoutes')
        this.$store.commit('history/addRoute',this.$route)
      },
      closeHandler(route) {
        console.log(route)
        this.$store.commit('history/removeRoute',route)
        const next = (
          (this.$store.state.history.routes && {...this.$store.state.history.routes[0]}) ||
          {name:MAIN_NAME}
          )
        this.$router.replace(next)
      }
    },
    watch: {},
  }
</script>

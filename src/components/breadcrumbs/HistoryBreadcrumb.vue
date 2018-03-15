<template>
  <div class="row items-center bg-light">
    <div class="col-11">
      <div class="row no-wrap scroll">
        <q-chip
          class="cursor-pointer"
          tag closable small v-for="route in routes"
          @close="closeHandler(route)" :key="route.name"
          :color="route.name === $route.name ? 'positive' : 'faded'"
          @click="$router.replace({name:route.name,params:route.params})"
        >
          <span class="ellipsis" style="width: 30px">{{route.meta.verboseName}}</span>
          <q-tooltip anchor="bottom middle" self="top middle" :delay="1000" :offset="[10,10]">
            {{route.meta.verboseName}}
          </q-tooltip>
        </q-chip>
      </div>
    </div>
    <div class="col-1">
      <q-btn icon="more_vert" color="faded" flat round small>
        <q-popover ref="popover">
          <q-list link class="no-border">
            <q-item @click="clearOthers(),$refs.popover.close()">
              <q-item-main label="clear others"/>
            </q-item>
            <q-item @click="clearAll(),$refs.popover.close()">
              <q-item-main label="clear all"/>
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </div>
  </div>
</template>

<script>

  export default {
    name: "",
    props: {},
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
        this.$store.commit("history/clearRoutes");
        this.$router.replace({name:this.$settings.MAIN_NAME})
      },
      clearOthers() {
        this.$store.commit("history/clearRoutes");
        this.$store.commit("history/addRoute",this.$route)
      },
      closeHandler(route) {
        this.$store.commit("history/removeRoute",route);
        if (this.$store.state.history.routes.length !== 0) {
          this.$router.replace({...this.$store.state.history.routes[0]})
        } else {
          this.$router.replace({name:this.$settings.MAIN_NAME})
        }
      }
    },
    watch: {},
  }
</script>

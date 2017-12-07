<template>
  <q-layout ref="layout" view="lhh Lpr lff">
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu"></q-icon>
      </q-btn>
      <q-toolbar-title>
        django quasar
      </q-toolbar-title>
      <router-breadcrumb></router-breadcrumb>
      <q-btn flat round small @click="fullScreenToggler">
        <q-icon :name="fullScreen ? 'fullscreen_exit' : 'fullscreen'"/>
      </q-btn>
      <q-btn flat round small @click="$refs.chatModal.trigger()" :color="allNewCount > 0 ? 'primary':'nagetive'">
        <q-icon name="mail"/>
      </q-btn>
      <q-btn flat round small @click="$router.push({name:'base:UserEdit'})">
        <q-icon name="perm_identity"/>
      </q-btn>
      <q-btn flat round small @click="logout">
        <q-icon name="exit_to_app"/>
      </q-btn>
    </q-toolbar>

    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-side-link item to="/twitter">
          <q-item-side icon="rss feed"/>
          <q-item-main label="Twitter"/>
        </q-side-link>
      </q-list>
    </div>
    <router-view></router-view>
    <chat-modal ref="chatModal"></chat-modal>
    <fixed-button ref="fixedButton"></fixed-button>
  </q-layout>
</template>

<script>
  import {mapState} from 'vuex'
  import {Toast,AppFullscreen} from 'quasar'
  import {RESPONSE_STATUS} from 'src/settings'
  import Talk from 'src/storages/talks'
  import {FixedButton} from './buttons'
  import {RouterBreadcrumb} from './breadcrumbs'
  import {ChatModal} from './modals'
  import {logoutRequest, refreshRequest} from 'src/apps/base/services/user'

  export default {
    data() {
      return {
        fullScreen: false
      }
    },
    components: {
      ChatModal,
      FixedButton,
      RouterBreadcrumb
    },
    computed: {
      allNewCount() {
        const userTalk = new Talk({self_id: this.$store.state.user.id})
        const countList = this.talks.map(talk => userTalk.userNewTalksCount(talk))
        return countList.reduce((a, b) => a + b, 0)
      },
      ...mapState('user', {talks: state => state.talks})
    },
    mounted: async function () {
      const response = await refreshRequest()
      if (response.status === RESPONSE_STATUS.OK) {
        this.$store.commit('user/refresh', response.data)
        this.$refs.fixedButton.socketToggler()
      } else {
        this.$router.replace({name: 'Login'})
        Toast.create.negative(response.data.detail)
      }
    },
    methods: {
      async logout() {
        const response = await logoutRequest()
        if (response.status === RESPONSE_STATUS.OK) {
          this.$store.commit('user/clear')
          this.$router.replace({name: 'Login'})
        } else {
          Toast.create.negative(response.data.detail)
        }
      },
      fullScreenToggler() {
        if (this.fullScreen) {
          AppFullscreen.exit()
        } else {
          AppFullscreen.request()
        }
        this.fullScreen = !this.fullScreen
      },
    }
  }
</script>

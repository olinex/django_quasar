<template>
  <q-layout ref="layout" view="lhh Lpr lff">
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu"></q-icon>
      </q-btn>
      <q-toolbar-title>
        django quasar
      </q-toolbar-title>
      <q-btn flat round small @click="fullScreenToggler">
        <q-icon :name="fullScreen ? 'fullscreen_exit' : 'fullscreen'"></q-icon>
      </q-btn>
      <q-btn flat round small @click="$refs.chatModal.trigger()">
        <q-icon name="mail"/>
        <q-chip v-if="allNewCount > 0" floating small color="negative">{{allNewCount}}</q-chip>
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
        <q-side-link item :to="{name:'base:Base'}">
          <q-item-side icon="settings"/>
          <q-item-main label="Settings"/>
        </q-side-link>
      </q-list>
    </div>
    <history-breadcrumb/>
    <router-view/>
    <chat-modal ref="chatModal"/>
    <fixed-button ref="fixedButton"/>
  </q-layout>
</template>

<script>
  import {mapState} from 'vuex'
  import {Toast,AppFullscreen} from 'quasar'
  import {RESPONSE_STATUS} from 'src/settings'
  import {FixedButton} from './buttons'
  import {HistoryBreadcrumb} from './breadcrumbs'
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
      HistoryBreadcrumb
    },
    computed: mapState(
      'user',
      {
        talks: state => state.talks,
        allNewCount: state => state.talks.filter(talk => !talk.readed).length
      }
      ),
    async mounted() {
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

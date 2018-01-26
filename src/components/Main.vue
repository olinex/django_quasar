<template>
  <q-layout ref="layout" view="lhh Lpr lff">
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu"/>
      </q-btn>
      <q-toolbar-title>
        django quasar
      </q-toolbar-title>
      <q-btn flat round small @click="fullScreenToggler">
        <q-icon :name="fullScreen ? 'fullscreen_exit' : 'fullscreen'"/>
      </q-btn>
      <q-btn flat round small @click="$router.push({name:'base:MessageList'})">
        <q-icon name="message"/>
        <q-chip v-if="newMessagesCount > 0" floating small color="negative">{{newMessagesCount}}</q-chip>
      </q-btn>
      <q-btn flat round small @click="$refs.chatModal.trigger()">
        <q-icon name="mail"/>
        <q-chip v-if="allNewCount > 0" floating small color="negative">{{allNewCount}}</q-chip>
      </q-btn>
      <q-btn flat round small @click="logout">
        <q-icon name="exit_to_app"/>
      </q-btn>
      <q-chip class="cursor-pointer" small :avatar="avatar" @click="$router.push({name:'base:UserEdit'})">
        {{fullName}}
      </q-chip>
    </q-toolbar>

    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-side-link item :to="{name:'product:Base'}">
          <q-item-side icon="apps"/>
          <q-item-main label="Products"/>
        </q-side-link>

        <q-side-link item :to="{name:'base:Base'}">
          <q-item-side icon="settings"/>
          <q-item-main label="Settings"/>
        </q-side-link>
      </q-list>
    </div>
    <history-breadcrumb/>
    <router-view/>
    <chat-modal ref="chatModal"/>
    <fixed-button/>
  </q-layout>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import {Toast,AppFullscreen} from 'quasar'
  import {FixedButton} from './buttons'
  import {HistoryBreadcrumb} from './breadcrumbs'
  import {ChatModal} from './modals'
  import {logoutRequest} from 'src/apps/base/services/user'

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
    computed: {
      ...mapState('user', {
        talks: state => state.talks,
        avatar: state => state.avatar,
        allNewCount: state => state.talks.filter(talk => !talk.readed).length,
        newMessagesCount: state => state.new_messages_count
      }),
      ...mapGetters('user',['fullName'])
    },
    methods: {
      async logout() {
        const response = await logoutRequest();
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.$store.commit('user/clear');
          this.$router.replace({name: 'Login'});
          Toast.create.positive(response.data.detail)
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

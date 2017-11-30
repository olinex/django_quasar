<template>
  <q-layout ref="layout" view="lhh Lpr lff">
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu"></q-icon>
      </q-btn>
      <q-toolbar-title>
        django quasar
      </q-toolbar-title>
      <q-btn flat round small>
        <q-icon name="mail" />
      </q-btn>
      <q-btn flat round small>
        <q-icon name="perm_identity" />
      </q-btn>
      <q-btn flat round small @click="logout">
        <q-icon name="exit_to_app" />
      </q-btn>
    </q-toolbar>

    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-side-link item to="/twitter">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter"/>
        </q-side-link>
      </q-list>
    </div>
    <router-view/>
    <q-fixed-position corner="bottom-right" :offset="[18, 18]">
      <q-fab color="cyan" icon="keyboard_arrow_up" direction="up">
        <q-fab-action
          :color="mail_notice ? 'positive':'faded'"
          icon="mail"
          @click="mailNoticeTrigger"
        ></q-fab-action>
        <q-fab-action
          :color="online_notice ? 'positive':'faded'"
          icon="swap_vertical_circle"
          @click="onlineNoticeTrigger"
        ></q-fab-action>
      </q-fab>
    </q-fixed-position>
  </q-layout>
</template>

<script>
  import {Toast} from 'quasar'
  import {mapState} from 'vuex'
  import {RESPONSE_STATUS} from 'src/settings'
  import {mailNoticeRequest, onlineNoticeRequest, logoutRequest, refreshRequest} from 'src/apps/base/services/user'
  export default {
    data() {
      return {}
    },
    computed: mapState(
      'user',
      {
        mail_notice: state => state.mail_notice,
        online_notice: state => state.online_notice
      }
    ),
    mounted:async function () {
      const response = await refreshRequest()
      if (response.status === RESPONSE_STATUS.OK) {
        this.$store.commit('user/refresh',response.data)
      } else {
        Toast.create.negative(response.data.detail)
      }
    },
    methods: {
      async logout() {
        const response = await logoutRequest()
        if (response.status === RESPONSE_STATUS.OK) {
          this.$store.commit('user/clear')
          this.$router.replace({name:'Login'})
        } else {
          Toast.create.negative(response.data.detail)
        }
      },
      async mailNoticeTrigger() {
        const response = await mailNoticeRequest({mail_notice:!this.mail_notice})
        if (response.status === RESPONSE_STATUS.OK) {
          this.$store.commit('user/mailNoticeToggle')
          if (this.mail_notice) {
            Toast.create.positive('mail notice on')
          } else {
            Toast.create.positive('mail notice off')
          }
        } else {
          Toast.create.negative(response.data.detail)
        }
      },
      async onlineNoticeTrigger() {
        const response = await onlineNoticeRequest({online_notice:!this.online_notice})
        if (response.status === RESPONSE_STATUS.OK) {
          this.$store.commit('user/onlineNoticeToggle')
          if (this.online_notice) {
            Toast.create.positive('online notice on')
          } else {
            Toast.create.positive('online notice off')
          }
        } else {
          Toast.create.negative(response.data.detail)
        }
      }
    }
  }
</script>

<style>
</style>

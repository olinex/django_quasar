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
    <router-view name="navbar"/>
    <router-view name="content"/>
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
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState(
        'user',
        {
          mail_notice: state => state.mail_notice,
          online_notice: state => state.online_notice
        }
      )
    },
    mounted:async function () {
      await this.$store.dispatch('user/initial')
    },
    methods: {
      async logout() {
        const result = await this.$store.dispatch('user/logout')
        if (result) {
          this.$router.replace({name: 'login'})
        } else {
          Toast.create.negative('cannot logout')
        }
      },
      async mailNoticeTrigger() {
        const result = await this.$store.dispatch('user/mailNoticeTrigger')
        if (result) {
          if (this.mail_notice) {
            Toast.create.positive('mail notice on')
          } else {
            Toast.create.positive('mail notice off')
          }
        } else {
          Toast.create.negative('cannot toggle mail notice status')
        }
      },
      async onlineNoticeTrigger() {
        const result = await this.$store.dispatch('user/onlineNoticeTrigger')
        if (result) {
          if (this.online_notice) {
            Toast.create.positive('online notice on')
          } else {
            Toast.create.positive('online notice off')
          }
        } else {
          Toast.create.negative('cannot toggle online notice status')
        }
      }
    }
  }
</script>

<style>
</style>

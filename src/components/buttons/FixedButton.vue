<template>
  <q-fixed-position corner="bottom-left" :offset="[18, 18]">
    <q-fab color="cyan" icon="keyboard_arrow_up" direction="up">
      <q-fab-action
        :color="socket ? 'positive':'faded'"
        icon="insert_link"
        @click="$store.dispatch('user/socketToggleAction')"
      />
      <q-fab-action
        :color="mail_notice ? 'positive':'faded'"
        icon="mail"
        @click="mailNoticeTrigger"
      />
      <q-fab-action
        :color="online_notice ? 'positive':'faded'"
        icon="swap_vertical_circle"
        @click="onlineNoticeTrigger"
      />
    </q-fab>
  </q-fixed-position>
</template>

<script>
  import {Toast} from "quasar";
  import {mapState} from "vuex";
  import {onlineNoticeRequest,mailNoticeRequest} from "src/apps/base/services/user";

  export default {
    name: "fixed-button",
    computed: mapState(
      "user",
      {
        mail_notice: state => state.mail_notice,
        online_notice: state => state.online_notice,
        socket: state => state.socket
      }
    ),
    methods: {
      async mailNoticeTrigger() {
        const response = await mailNoticeRequest({mail_notice:!this.mail_notice});
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.$store.commit("user/mailNoticeToggle");
          if (this.mail_notice) {
            Toast.create.positive("mail notice on")
          } else {
            Toast.create.positive("mail notice off")
          }
        }
      },
      async onlineNoticeTrigger() {
        const response = await onlineNoticeRequest({online_notice:!this.online_notice});
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.$store.commit("user/onlineNoticeToggle");
          if (this.online_notice) {
            Toast.create.positive("online notice on")
          } else {
            Toast.create.positive("online notice off")
          }
        }
      }
    }
  }
</script>

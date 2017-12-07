<template>
  <q-fixed-position corner="bottom-right" :offset="[18, 18]">
    <q-fab color="cyan" icon="keyboard_arrow_up" direction="up">
      <q-fab-action
        :color="socket ? 'positive':'faded'"
        icon="insert_link"
        @click="socketToggler"
      ></q-fab-action>
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
</template>

<script>
  import {Toast} from 'quasar'
  import {mapState} from 'vuex'
  import {RESPONSE_STATUS} from 'src/settings'
  import {baseSocket,onlineNoticeRequest,mailNoticeRequest} from "src/apps/base/services/user"
  import {createResponse} from "src/utils/response"
  import Talk from 'src/storages/talks'

  export default {
    name: "fixed-button",
    computed: mapState(
      'user',
      {
        mail_notice: state => state.mail_notice,
        online_notice: state => state.online_notice,
        socket: state => state.socket
      }
    ),
    methods: {
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
      },
      async socketToggler() {
        console.log(this.socket)
        if (this.socket) {
          this.socket.close()
          this.$store.commit('user/leaveSocket')
        } else {
          const socket = await baseSocket(this.socketMessageHandler)
          this.$store.commit('user/joinSocket',socket)
        }
      },
      socketMessageHandler(event) {
        const data = JSON.parse(event.data)
        const user_id = data.user_id
        if (data.type === 'talk') {
          const userTalk = new Talk({
            self_id:this.$store.state.user.id
          })
          this.$store.commit('user/addTalks',user_id)
          userTalk.receiveTalk(user_id, data)
        } else {
          createResponse(data)
        }
      }
    }
  }
</script>

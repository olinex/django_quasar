<template>
  <q-field
    :error="$v.message.$error"
    :error-label="message_err"
    helper="chat message"
  >
    <q-input
      v-model="message" type="textarea" clearable placeholder="repeat to you friend..."
      @blur="$v.message.$touch" max-length="256" :min-rows="3" color="light"
      :after="[
        { icon: 'send', handler: sendTalk, error: false },
      ]"
    ></q-input>
  </q-field>
</template>

<script>
  import {mapState} from 'vuex'
  import {Toast} from 'quasar'
  import {mapErrorMessage} from "src/utils/error-messages"
  import {minLength, maxLength} from 'vuelidate/lib/validators'

  export default {
    name: "chat-text-field",
    props: {
      user_id: {type: Number, required: true}
    },
    data() {
      return {
        message: null
      }
    },
    validations: {
      message: {minLength: minLength(5), maxLength: maxLength(256)}
    },
    computed: {
      ...mapErrorMessage(['message']),
      ...mapState(
        'user',
        {socket: state => state.socket}
      )
    },
    methods: {
      async sendTalk() {
        if (!this.$v.message.$error) {
          const data = {
            type: 'talk',
            to_user: this.user_id,
            content: this.message,
          }
          if (this.socket) {
            this.socket.send(JSON.stringify(data))
            const talk = {
              from_user_id: this.$store.state.user.id,
              to_user_id: this.user_id,
              avatar: this.$store.state.user.avatar,
              from_username: this.$store.getters.fullName,
              type: "talk",
              detail: "new talk",
              content: this.message,
              status: "success",
              create_time: new Date().toISOString(),
              readed: true
            }
            this.$store.commit('user/addTalk', talk)
            this.$store.commit('user/readUserTalks', this.user_id)
            this.message = null
          } else {
            Toast.create.negative('socket is missed,please connect again')
          }
        } else {
          Toast.create.negative('error message!')
        }
      }
    },

  }
</script>

<template>
  <q-field
    :error="$v.message.$error"
    :error-label="message_err"
    helper="chat message"
  >
    <q-input
      type="textarea" clearable placeholder="repeat to you friend..."
      @blur="$v.message.$touch" max-length="256" :min-rows="7" color="light"
      :after="[
        { icon: 'send', handler: sendTalk, error: false }
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
    data() {
      return {
        message: null
      }
    },
    props: {
      user_id: {type: Number, required: true}
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
            content: this.message
          }
          this.socket.send(JSON.stringify(data))
        } else {
          Toast.create.negative('error message!')
        }
      }
    },

  }
</script>

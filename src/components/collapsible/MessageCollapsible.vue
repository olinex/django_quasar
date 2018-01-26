<template>
  <q-list class="no-border">
    <q-collapsible icon="message" label="Message" @open="initial">
      <div class="row justify-between">
        <div class="col-10">
          <q-btn small flat round icon="create" color="primary" @click="$refs.messageCreate.open()"/>
        </div>
        <div class="col-2">
          <q-btn small flat round icon="refresh" color="primary" @click="refresh"/>
          <q-btn small flat round
                 :icon="followed ? 'notifications' : 'notifications_off'"
                 :color="followed ? 'positive' : 'negative'"
                 @click="followTrigger"
          />
        </div>
      </div>
      <q-list multiline no-border separator>
        <q-item v-for="message in messages" :key="message.id">
          <q-item-side :avatar="message.creater__avatar">
            <q-item-tile label>
              {{`${message.creater__first_name || '*'} ${message.creater__last_name || '*'}`}}
            </q-item-tile>
          </q-item-side>
          <q-item-main
            :label="message.title" label-lines="1"
            :sublabel="message.text"
          />
          <q-item-side right :stamp="toNow(message.create_time)"/>
        </q-item>
      </q-list>
    </q-collapsible>
    <slot/>
    <q-modal ref="messageCreate" highlight :content-css="{minWidth: '40vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn flat small @click="$refs.messageCreate.close()" icon="keyboard_arrow_left"/>
          <div class="q-toolbar-title">message create</div>
        </q-toolbar>
        <div class="layout-padding row justify-center">
          <!-- title -->
          <q-field
            class="col-12" :error="$v.title.$error"
            :error-label="title_err"
            helper="required"
          >
            <q-input
              float-label="title" clearable
              v-model="title" @blur="$v.title.$touch"
            />
          </q-field>

          <!-- text -->
          <q-field
            class="col-12" :error="$v.text.$error"
            :error-label="text_err" helper="text"
          >
            <q-input
              v-model="text" type="textarea" clearable placeholder="your text input here..."
              @blur="$v.text.$touch" max-length="256" :min-rows="7" color="light"
              :after="[
                { icon: 'send', handler: sendMessage, error: false },
              ]"
            />
          </q-field>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-list>
</template>

<script>
  import {Toast} from 'quasar';
  import {toNowFormat} from "src/utils/format";
  import {corsRequest} from "src/utils/request";
  import {required, minLength} from 'vuelidate/lib/validators';
  import {mapErrorMessage} from 'src/utils/error-messages';

  export default {
    name: "message-collapsible",
    props: {
      url: {type: String, required: true},
      value: {type: Array}
    },
    data() {
      return {
        messages: [],
        title: '',
        text: '',
      }
    },
    validations: {
      title: {required, minLength: minLength(3)},
      text: {required, minLength: minLength(8)}
    },
    computed: {
      ...mapErrorMessage(['title', 'text']),
      followed() {
        return this.$props.value.includes(this.$store.state.user.id)
      }
    },
    methods: {
      toNow(value) {
        return toNowFormat(value)
      },
      async refresh() {
        const response = await corsRequest({
          url: `${this.$props.url}message/`,
          options: {method: 'GET'}
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.messages = response.data
        }
      },
      async initial() {
        if (this.messages.length === 0) {
          await this.refresh()
        }
      },
      async followTrigger() {
        const path = this.followed ? 'remove_follower' : 'add_follower';
        const response = await corsRequest({
          url: `${this.$props.url}${path}/`,
          options: {method: 'PATCH'}
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          if (this.followed) {
            this.$emit('input', this.$props.value.filter(id => id !== this.$store.state.user.id))
          } else {
            this.$emit('input', [...this.$props.value, this.$store.state.user.id])
          }
          Toast.create.positive(response.data.detail)
        } else {
          Toast.create.negative(response.data.detail)
        }
      },
      async sendMessage() {
        const response = await corsRequest({
          url: `${this.$props.url}create_message/`,
          options: {
            method: 'POST',
            data: {title: this.title, text: this.text}
          }
        });
        if (response.status === this.$settings.RESPONSE_STATUS.CREATED) {
          await this.refresh();
          this.title = '';
          this.text = '';
          Toast.create.positive(response.data.detail)
        } else {
          Toast.create.negative(response.data.detail)
        }
        this.$refs.messageCreate.close()
      }
    }
  }
</script>

<style scoped>

</style>

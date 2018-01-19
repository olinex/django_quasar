<template>
  <q-card>
    <q-card-title slot="overlay">
      Message
      <div slot="right">
        <q-btn small flat round icon="refresh" color="primary" @click="refresh"/>
        <q-btn small flat round icon="clear_all" color="negative"
               @click="clear" v-if="messages.length !== 0"
        />
      </div>
    </q-card-title>
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
        <q-item-side right :stamp="new Date(message.create_time).toLocaleString()" icon="more_vert">
          <q-popover>
            <q-list link>
              <q-item @click="remove(message.id)">
                <q-item-main label="remove" />
              </q-item>
              <q-item @click="goto(message)">
                <q-item-main label="goto" />
              </q-item>
            </q-list>
          </q-popover>
        </q-item-side>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
  import { format } from 'quasar'
  import {http} from '../urls/message'
  import {corsRequest} from "src/utils/request"

  export default {
    async mounted() {
      await this.refresh()
    },
    data() {
      return {
        messages: []
      }
    },
    methods: {
      async refresh() {
        const response = await corsRequest({
          url: `${http.LIST_URL()}new/`,
          options:{method:'GET'}
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.messages = response.data
        }
      },
      async remove(id) {
        const response = await corsRequest({
          url: `${http.DETAIL_URL(id)}remove/`,
          options: {method:'PATCH'}
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.messages = this.messages.filter(message => message.id !== id)
        }
      },
      async remove(id) {
        const response = await corsRequest({
          url: `${http.DETAIL_URL(id)}remove/`,
          options: {method:'PATCH'}
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.messages = this.messages.filter(message => message.id !== id)
        }
      },
      async clear() {
        const response = await corsRequest({
          url: `${http.LIST_URL}clear/`,
          options: {method:'PATCH'}
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.messages = []
        }
      },
      goto({content_type,object_id}) {
        this.$router.replace({
          name: `${content_type.app_label.split('_')[1]}:${format.capitalize(content_type.model)}Form`,
          params: {id:object_id}
        })
      }
    }
  }
</script>

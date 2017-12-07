<template>
  <q-modal highlight v-model="open" position="right" :content-css="{minWidth: '40vw', minHeight: '100vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn flat @click="open = false" icon="keyboard_arrow_left"></q-btn>
        <div class="q-toolbar-title">Chat</div>
      </q-toolbar>
      <div class="layout-padding">
        <q-tabs inverted align="center" ref="tabs">
          <q-tab default label="users" slot="title" name="users" icon="people"></q-tab>
          <q-tab-pane name="users">
            <q-scroll-area style="width: 30vw; height: 50vh;">
              <q-list separator highlight no-border>
                <q-item v-for="user in users" :key="user.id">
                  <q-item-main>
                    <q-item-tile label>{{ `${user.first_name} ${user.last_name}` }}</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-btn color="blue-6" flat icon="done" @click="createTalk(user.id)"></q-btn>
                  </q-item-side>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-tab-pane>
          <q-tab
            v-for="(user_id,index) in talks"
            :key="index"
            :count="talkManager.userNewTalksCount(user_id)"
            :label="getUserName(user_id)"
            slot="title" :name="user_id" icon="message"
          ></q-tab>
          <q-tab-pane v-for="user_id in talks" :key="user_id" :name="user_id">
            <q-scroll-area style="width: 30vw; height: 50vh;">
              <q-chat-message
                v-for="(talk,index) in talkManager.getTalks(user_id)"
                :key="index"
                :name="talk.username"
                :stamp="talk.create_time"
                :sent="talk.id === id"
                text-color="dark"
                :bg-color="talk.id === id ? 'positive' : 'light'"
              ></q-chat-message>
            </q-scroll-area>
            <chat-text-field :user_id="user_id"></chat-text-field>
          </q-tab-pane>
        </q-tabs>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import {mapState} from 'vuex'
  import {Talk} from 'src/storages'
  import {RESPONSE_STATUS} from "src/settings";
  import ChatTextField from '../fields/ChatTextField'
  import {onlineUserRequest} from "src/apps/base/services/user";

  export default {
    name: "chat-modal",
    components: {
      ChatTextField
    },
    data() {
      return {
        open: false,
        users: [],
      }
    },
    computed: mapState(
      'user',
      {
        id: state => state.id,
        talks: state => state.talks,
        talkManager: state => new Talk({self_id:state.id})
      }
    ),
    methods: {
      async trigger() {
        this.open = !this.open
        if (this.open) {
          const response = await onlineUserRequest()
          if (response.status === RESPONSE_STATUS.OK) {
            console.log(response.data.result)
            this.users = response.data.result
          }
        }
      },
      createTalk(user_id) {
        this.$store.commit('user/addTalks',user_id)
        this.$refs.tabs.selectTab(user_id)
      },
      getUserName(user_id) {
        const user = this.users.find(user => user.id === user_id)
        return `${user.first_name} ${user.last_name}`
      }
    }
  }
</script>

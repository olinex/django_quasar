<template>
  <q-modal highlight v-model="open" position="right" :content-css="{minWidth: '40vw', minHeight: '100vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn flat small round @click="open = false" icon="keyboard_arrow_left"/>
        <div class="q-toolbar-title">Chat</div>
      </q-toolbar>
      <div class="layout-padding">
        <q-tabs inverted align="center" ref="tabs">
          <q-tab default label="users" slot="title" name="users" icon="people"/>
          <q-tab-pane name="users">
            <q-scroll-area style="width: 30vw; height: 50vh;">
              <q-list separator highlight no-border>
                <q-item
                  class="cursor-pointer" v-for="user in users"
                  :key="user.id" @click="createTalker(user.id)"
                >
                  <q-item-main>
                    <q-item-tile label>
                      {{ `${user.first_name || '*'} ${user.last_name || '*'}` }}
                    </q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-tab-pane>
          <q-tab
            v-for="(user_id,index) in talkers"
            :key="index" :label="getUserName(user_id)"
            :count="talks.filter(talk => talk.from_user_id === user_id && !talk.readed).length"
            slot="title" :name="user_id" icon="message" @select="readTalks(user_id)"
          >
          </q-tab>
          <q-tab-pane v-for="user_id in talkers" :key="user_id" :name="user_id">
            <q-scroll-area style="width: 30vw; height: 50vh;">
              <q-chat-message
                v-for="(talk,index) in talks"
                v-if="(talk.from_user_id === user_id) || talk.to_user_id === user_id"
                :avatar="talk.avatar" :key="index" :name="talk.from_username"
                :stamp="time(talk.create_time)"
                :sent="talk.from_user_id === id" :text="[talk.content]"
              />
            </q-scroll-area>
            <q-btn icon="clear_all" small round flat @click="clearUserTalks(user_id)"/>
            <q-btn icon="close" small round flat @click="closeUserTalks(user_id)"/>
            <chat-text-field :user_id="user_id"/>
          </q-tab-pane>
        </q-tabs>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import {mapState} from 'vuex';
  import {QChatMessage} from 'quasar';
  import {timeFormat} from "src/utils/format";
  import {ChatTextField} from 'src/components/fields';
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
        talkers: state => state.talkers,
        talks: state => state.talks
      }
    ),
    methods: {
      time(value) {
        return timeFormat(value)
      },
      async trigger() {
        this.open = !this.open;
        if (this.open) {
          const response = await onlineUserRequest();
          if (response.status === this.$settings.RESPONSE_STATUS.OK) {
            this.users = response.data
          }
        }
      },
      createTalker(user_id) {
        this.$store.commit('user/addTalker',user_id);
        this.$refs.tabs.selectTab(user_id)
      },
      getUserName(user_id) {
        const user = this.users.find(user => user.id === user_id);
        if (user) {
          return `${user.first_name || '*'} ${user.last_name || '*'}`
        }
        return 'unknown'
      },
      readTalks(user_id) {
        this.$store.commit('user/readUserTalks',user_id)
      },
      closeUserTalks(user_id) {
        this.$store.commit('user/clearUserTalks',user_id);
        this.$store.commit('user/removeTalker',user_id);
        this.$refs.tabs.selectTab('users')
      },
      clearUserTalks(user_id) {
        this.$store.commit('user/clearUserTalks',user_id)
      }
    }
  }
</script>

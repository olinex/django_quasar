<template>
  <div class="row items-center justify-start">
    <div class="col-11">
      <slot/>
      <q-btn v-show="isDraft" icon="done" color="primary" @click="actionHandler('confirm')">
        <i>confirm</i>
      </q-btn>
      <q-btn v-show="isDraft" icon="delete" color="negative" @click="deleteHandler()">
        <i>remove</i>
      </q-btn>
      <q-btn v-show="audit" icon="assignment" color="warning" @click="actionHandler('audit')">
        <i>audit</i>
      </q-btn>
      <q-btn v-show="reject" icon="assignment_return" color="negative" @click="actionHandler('reject')">
        <i>reject</i>
      </q-btn>
      <q-btn v-show="allow" icon="assignment_turned_in" color="primary" @click="actionHandler('allow')">
        <i>allow</i>
      </q-btn>
      <q-btn v-show="cancel" icon="cancel" color="negative" @click="actionHandler('cancel')">
        <i>cancel</i>
      </q-btn>
    </div>
    <q-toggle
      v-show="!isDraft"
      :value="isActive" class="col-1 order-last"
      checked-icon="lock_open" unchecked-icon="lock"
      @blur="actionHandler(isActive ? 'lock' : 'active')"
    />
  </div>
</template>

<script>
  import {corsRequest} from "src/utils/request";
  import {Toast} from "quasar";

  export default {
    name: "button-group",
    props: {
      id: {type: Number, required: true},
      url: {type: String, required: true},
      isDraft: {type: Boolean, required: false},
      isActive: {type: Boolean, required: false},
      audit: {type: Boolean, required: false},
      reject: {type: Boolean, required: false},
      allow: {type: Boolean, required: false},
      cancel: {type: Boolean, required: false},
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
      async actionHandler(action) {
        const url = `${this.$props.url}${action}/`;
        const response = await corsRequest({
          url,
          options: {
            method: "PATCH",
            data: {ids: [this.$props.id]}
          }
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          await this.$emit("action");
          Toast.create.positive(response.data.detail)
        }
      },
      async deleteHandler() {
        const url = `${this.$props.url}delete/`;
        const response = await corsRequest({
          url,
          options: {
            method: "PATCH",
            data: {ids: [this.$props.id]}
          }
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.$store.commit("history/removeRoute",this.$route);
          this.$router.go(-1);
          Toast.create.positive(response.data.detail)
        }
      }
    }
  }
</script>

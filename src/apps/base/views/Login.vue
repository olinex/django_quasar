<template>
  <default-back-ground>
    <q-card color="white">
      <q-card-title class="text-black">
        Login
      </q-card-title>
      <q-card-main>
        <q-field
          icon="perm_identity"
          helper="it can be email or nickname"
          error-label="username length can not greater than 16"
          :count="16"
        >
          <q-input autofocus clearable max-length="16" float-label="usrname" v-model="username"/>
        </q-field>
        <q-field
          icon="lock"
          error-label="password length must greater than 6"
          helper="length must greater than 6"
        >
          <q-input
            @keyup.enter="login" type="password"
            float-label="password" v-model="password" clearable
          />
        </q-field>
      </q-card-main>
      <q-card-separator/>
      <q-card-actions align="center">
        <q-btn color="primary" @click="login">login</q-btn>
      </q-card-actions>
    </q-card>
  </default-back-ground>
</template>

<script>
  import {DefaultBackGround} from "src/components/backgrounds";
  import {HOME_NAME} from "src/settings";
  import {Toast} from "quasar";
  import {loginRequest} from "../services/user";

  export default {
    components: {
      DefaultBackGround
    },
    data() {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
      initial() {
        this.username = "";
        this.password = ""
      },
      async login() {
        const response = await loginRequest(this.$data);
        this.initial();
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.$store.commit("user/refresh", response.data);
          this.$router.replace({name: HOME_NAME})
        } else {
          Toast.create.negative("invalid password or username")
        }
      }
    }
  }
</script>

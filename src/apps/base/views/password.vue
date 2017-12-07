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
          <q-input autofocus clearable max-length="16" placeholder="usrname" v-model="username" />
        </q-field>
        <q-field
          icon="lock"
          error-label="password length must greater than 6"
          helper="length must greater than 6"
        >
          <q-input type="password" clearable placeholder="password" v-model="password" />
        </q-field>
      </q-card-main>
      <q-card-separator />
      <q-card-actions align="center">
        <q-btn color="primary" @click="login">login</q-btn>
      </q-card-actions>
    </q-card>
  </default-back-ground>
</template>

<script>
  import {DefaultBackGround} from 'src/components/backgrounds'
  import {HOME_NAME} from 'src/settings'
  import {Toast} from 'quasar'
  export default {
    components:{
      DefaultBackGround
    },
    data() {
      return {
        old_password: null,
        new_password: {
          password1: null,
          password2: null
        }
      }
    },
    methods: {
      async login() {
        const result = await this.$store.dispatch('user/login',this.$data)
        if (result) {
          this.$router.replace({name:HOME_NAME})
        } else {
          Toast.create.negative('cannot login')
        }
      }
    }
  }
</script>

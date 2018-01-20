<template>
  <q-card>
    <q-card-media>
      <img :src="avatar">
    </q-card-media>
    <q-card-separator/>
    <q-list>
      <q-collapsible icon="account_circle" label="base data" opened>
        <div class="row justify-center">
          <!-- first name -->
          <q-field
            class="col-6" :error="$v.first_name.$invalid"
            :error-label="first_name_err"
            helper="length must greater than 1 and less than 3"
          >
            <q-input clearable float-label="first name" v-model="first_name" @blur="$v.first_name.$touch"/>
          </q-field>
          <!-- last name -->
          <q-field
            class="col-6" :error="$v.last_name.$invalid"
            :error-label="last_name_err"
            helper="length must greater than 1 and less than 13"
          >
            <q-input clearable float-label="last name" v-model="last_name" @blur="$v.last_name.$touch"/>
          </q-field>
          <!-- emial -->
          <q-field
            class="col-12" :error="$v.email.$invalid"
            :error-label="email_err"
            helper="email address"
          >
            <q-input type="email" clearable float-label="email" v-model="email" @blur="$v.email.$touch"/>
          </q-field>
          <!-- phone -->
          <q-field
            class="col-12" :error="$v.phone.$invalid"
            :error-label="phone_err"
            helper="phone number"
          >
            <q-input type="number" clearable float-label="phone" v-model="phone" @blur="$v.phone.$touch"/>
          </q-field>
          <!-- avatar -->
          <q-uploader
            :headers="defaultHeader"
            method="PATCH" class="col-12"
            :url="uploadUrl" name="avatar"
            extensions=".gif,.jpg,.jpeg,.png"
          />
          <location
            v-model="address_detail.region"
            :error="$v.address_detail.region.$invalid"
            :error_label="address_detail__region_err"
          />
          <q-field
            class="col-12" :error="$v.address_detail.name.$invalid"
            :error-label="address_detail__name_err"
            helper="address name"
          >
            <q-input
              clearable float-label="address name"
              v-model="address_detail.name"
              @blur="$v.address_detail.name.$touch"
            />
          </q-field>
          <q-btn color="primary" @click="changeUserData" class="self-center col-3" :disable="!userDataValid">
            confirm
          </q-btn>
        </div>
      </q-collapsible>
      <q-collapsible icon="lock" label="password">
        <div class="row justify-center">
          <!-- old password -->
          <q-field
            class="col-12" :error="$v.old_password.$invalid"
            :error-label="old_password_err"
            helper="the last password user used to login"
          >
            <q-input
              type="password" clearable float-label="old password" v-model="old_password"
              @blur="$v.old_password.$touch"
            />
          </q-field>
          <!-- new password -->
          <q-field
            class="col-6" :error="$v.password1.$invalid"
            :error-label="password1_err"
            helper="the new password"
          >
            <q-input
              type="password" clearable float-label="new password" v-model="password1"
              @blur="$v.password1.$touch"
            />
          </q-field>
          <!-- new password repeat -->
          <q-field
            class="col-6" :error="$v.password2.$invalid"
            :error-label="password2_err"
            helper="repeat new password"
          >
            <q-input
              type="password" clearable float-label="repeat password" v-model="password2"
              @blur="$v.password2.$touch"
            />
          </q-field>
          <q-btn color="primary" @click="changePassword" class="self-center col-3" :disable="!passwordValid">
            change password
          </q-btn>
        </div>
      </q-collapsible>
    </q-list>
  </q-card>
</template>

<script>
  import {Toast} from 'quasar'
  import {mapErrorMessage} from 'src/utils/error-messages'
  import {http} from "../urls/user"
  import {passwordRequest, updateRequest} from '../services/user'
  import Location from '../components/Location'
  import {
    email, minLength, maxLength, numeric, requiredIf, sameAs, required
  } from 'vuelidate/lib/validators'
  import defaultHeader from 'src/utils/default-headers'

  export default {
    components: {Location},
    data() {
      return {
        first_name: this.$store.state.user.first_name,
        last_name: this.$store.state.user.last_name,
        email: this.$store.state.user.email,
        phone: this.$store.state.user.phone,
        address_detail: {
          region: this.$store.state.user.address_detail.region,
          name: this.$store.state.user.address_detail.name
        },
        avatar: this.$store.state.user.avatar,
        old_password: '',
        password1: '',
        password2: ''
      }
    },
    validations: {
      first_name: {minLength: minLength(1), maxLength: maxLength(12)},
      last_name: {minLength: minLength(1), maxLength: maxLength(12)},
      email: {email, minLength: minLength(6), maxLength: maxLength(25)},
      phone: {numeric, minLength: minLength(8), maxLength: maxLength(11)},
      address_detail: {
        region: {numeric, minLength: minLength(1)},
        name: {minLength: minLength(3), maxLength: maxLength(64)},
      },
      old_password: {required, minLength: minLength(6)},
      password1: {requiredIf: requiredIf('password2'), sameAs: sameAs('password2'), minLength: minLength(6)},
      password2: {requiredIf: requiredIf('password1'), sameAs: sameAs('password1'), minLength: minLength(6)},
    },
    computed: {
      uploadUrl() {
        return http.DETAIL_URL(this.$store.state.user.id)
      },
      defaultHeader() {
        return defaultHeader()
      },
      ...mapErrorMessage([
        'first_name', 'last_name', 'email', 'phone',
        'address_detail/region', 'address_detail/name',
        'old_password', 'password1', 'password2'
      ]),
      passwordValid() {
        return (
          !this.$v.old_password.$invalid &&
          !this.$v.password1.$invalid &&
          !this.$v.password2.$invalid
        )
      },
      userDataValid() {
        return (
          !this.$v.first_name.$invalid &&
          !this.$v.last_name.$invalid &&
          !this.$v.email.$invalid &&
          !this.$v.phone.$invalid
        )
      }
    },
    methods: {
      clearPassowrd() {
        this.old_password = '';
        this.password1 = '';
        this.password2 = ''
      },
      async changePassword() {
        if (this.passwordValid) {
          const response = await passwordRequest({
            old_password: this.old_password,
            new_password: {
              password1: this.password1,
              password2: this.password2
            }
          });
          if (response.status === this.$settings.RESPONSE_STATUS.OK) {
            this.clearPassowrd();
            Toast.create.positive('password changed successfully')
          } else {
            Toast.create.negative(response.data.detail)
          }
        }
      },
      async changeUserData() {
        if (this.userDataValid) {
          const data = {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            phone: this.phone,
          };
          const response = await updateRequest(
            {id: this.$store.state.user.id},
            data
          );
          if (response.status === this.$settings.RESPONSE_STATUS.OK) {
            this.$store.commit('user/refresh', data);
            Toast.create.positive('user data changed successfully')
          } else {
            Toast.create.negative(response.data.detail)
          }
        }
      }
    }
  }
</script>

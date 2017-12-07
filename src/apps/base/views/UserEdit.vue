<template>
  <q-card>
    <q-card-title>
      {{ storeFullName }}
    </q-card-title>
    <q-card-separator/>
    <q-list>
      <q-collapsible icon="account_circle" label="base data" opened>
        <div class="row justify-center">
          <!-- first name -->
          <q-field
            class="col-6" :error="$v.first_name.$error"
            :error-label="first_name_err"
            helper="length must greater than 1 and less than 3"
          >
            <q-input clearable placeholder="first name" v-model="first_name" @blur="$v.first_name.$touch"></q-input>
          </q-field>
          <!-- last name -->
          <q-field
            class="col-6" :error="$v.last_name.$error"
            :error-label="last_name_err"
            helper="length must greater than 1 and less than 13"
          >
            <q-input clearable placeholder="last name" v-model="last_name" @blur="$v.last_name.$touch"></q-input>
          </q-field>
          <!-- emial -->
          <q-field
            class="col-12" :error="$v.email.$error"
            :error-label="email_err"
            helper="email address"
          >
            <q-input type="email" clearable placeholder="email" v-model="email" @blur="$v.email.$touch"></q-input>
          </q-field>
          <!-- phone -->
          <q-field
            class="col-12" :error="$v.phone.$error"
            :error-label="phone_err"
            helper="phone number"
          >
            <q-input type="number" clearable placeholder="phone" v-model="phone" @blur="$v.phone.$touch"></q-input>
          </q-field>
          <location
            v-model="address_detail.region"
            :error="$v.address_detail.region.$error"
            :error_label="address_detail__region_err"
          ></location>
          <q-field
            class="col-12" :error="$v.address_detail.name.$error"
            :error-label="address_detail__name_err"
            helper="address name"
          >
            <q-input
              clearable placeholder="address name"
              v-model="address_detail.name"
              @blur="$v.address_detail.name.$touch"
            ></q-input>
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
            class="col-12" :error="$v.old_password.$error"
            :error-label="old_password_err"
            helper="the last password user used to login"
          >
            <q-input
              type="password" clearable placeholder="old password" v-model="old_password"
              @blur="$v.old_password.$touch"
            ></q-input>
          </q-field>
          <!-- new password -->
          <q-field
            class="col-6" :error="$v.password1.$error"
            :error-label="password1_err"
            helper="the new password"
          >
            <q-input
              type="password" clearable placeholder="new password" v-model="password1"
              @blur="$v.password1.$touch"
            ></q-input>
          </q-field>
          <!-- new password repeat -->
          <q-field
            class="col-6" :error="$v.password2.$error"
            :error-label="password2_err"
            helper="repeat new password"
          >
            <q-input
              type="password" clearable placeholder="repeat password" v-model="password2"
              @blur="$v.password2.$touch"
            ></q-input>
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
  import {mapGetters} from 'vuex'
  import {Toast} from 'quasar'
  import {mapErrorMessage} from 'src/utils/error-messages'
  import {RESPONSE_STATUS} from 'src/settings'
  import {passwordRequest, userUpdateRequest} from '../services/user'
  import Location from '../components/Location'
  import {
    email, minLength, maxLength, numeric, requiredIf, sameAs, required
  } from 'vuelidate/lib/validators'
  import ForeignKey from "../../../components/fields/ForeignKey.vue";

  export default {
    components: {Location},
    data() {
      return {
        first_name: this.$store.state.user.first_name,
        last_name: this.$store.state.user.last_name,
        email: this.$store.state.user.email,
        phone: this.$store.state.user.phone,
        address_detail: {
          region:this.$store.state.user.address_detail.region,
          name:this.$store.state.user.address_detail.name
        },
        old_password: '',
        password1: '',
        password2: '',
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
      ...mapGetters(
        'user',
        {
          storeFullName: state => state.fullName
        }
      ),
      ...mapErrorMessage([
        'first_name', 'last_name', 'email', 'phone',
        'address_detail/region', 'address_detail/name',
        'old_password', 'password1', 'password2'
      ]),
      passwordValid() {
        return (
          !this.$v.old_password.$error &&
          !this.$v.password1.$error &&
          !this.$v.password2.$error
        )
      },
      userDataValid() {
        return (
          !this.$v.first_name.$error &&
          !this.$v.last_name.$error &&
          !this.$v.email.$error &&
          !this.$v.phone.$error
        )
      }
    },
    methods: {
      clearPassowrd() {
        this.old_password = ''
        this.password1 = ''
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
          })
          if (response.status === RESPONSE_STATUS.OK) {
            this.clearPassowrd()
            Toast.create.positive('password changed successfully')
          } else {
            Toast.create.negative(response.data.detail)
          }
        }
      },
      async changeUserData() {
        if (this.userDataValid) {
          const response = await userUpdateRequest(
            {id: this.$store.state.user.id},
            {
              first_name: this.first_name,
              last_name: this.last_name,
              email: this.email,
              phone: this.phone,
            }
          )
          if (response.status === RESPONSE_STATUS.OK) {
            Toast.create.positive('user data changed successfully')
          } else {
            Toast.create.negative(response.data.detail)
          }
        }
      }
    }
  }
</script>

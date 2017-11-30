<template>
  <q-card>
    <q-card-title>
      {{ fullName }}
    </q-card-title>
    <q-card-separator/>
    <q-list>
      <q-collapsible icon="account_circle" label="base data">
        <div class="row">
          <!-- first name -->
          <q-field
            class="col-6" :error="$v.first_name.$error"
            :error-label="firstNameErr"
            helper="length must greater than 1 and less than 3"
          >
            <q-input clearable placeholder="first name" v-model="first_name" @blur="$v.first_name.$touch"></q-input>
          </q-field>
          <!-- last name -->
          <q-field
            class="col-6" :error="$v.last_name.$error"
            :error-label="''"
            helper="length must greater than 1 and less than 13"
          >
            <q-input clearable placeholder="last name" v-model="last_name" @blur="$v.last_name.$touch"></q-input>
          </q-field>
          <!-- emial -->
          <q-field
            class="col-12" :error="$v.email.$error"
            :error-label="''"
            helper="email isn't valid"
          >
            <q-input type="email" clearable placeholder="email" v-model="email" @blur="$v.email.$touch"></q-input>
          </q-field>
        </div>
      </q-collapsible>
    </q-list>
  </q-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapErrorMessage,getErrorMessage} from 'src/utils/error-messages'
  import {email, minLength, maxLength} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {...this.$store.state.user}
    },
    validations: {
      first_name: {
        minLength: minLength(1),
        maxLength: maxLength(3),
      },
      last_name: {
        minLength: minLength(1),
        maxLength: maxLength(13),
      },
      email: {
        email,
        minLength: minLength(3),
        maxLength: maxLength(13),
      }
    },
    computed: {
      ...mapGetters(
        'user',
        ['fullName']
      ),
      firstNameErr() {
        return getErrorMessage(({name:'first_name',validator:this.$v}))
      }
    }
  }
</script>

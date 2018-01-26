<template>
  <div>
    <q-card>
      <q-card-title class="text-black">
        city
        <span slot="subtitle">create</span>
      </q-card-title>
      <q-card-main>
        <div class="row">
          <q-btn icon="save" color="primary" :disable="$v.$invalid && !$v.$dirty" @click="save">
            <i>save</i>
          </q-btn>
        </div>
        <div class="row">
          <!-- name -->
          <q-field
            class="col-12" :error="$v.name.$invalid"
            :error-label="name_err"
            helper="required"
          >
            <q-input
              float-label="name" clearable
              v-model="name" @blur="$v.name.$touch"
            />
          </q-field>

          <!-- value -->
          <q-field
            class="col-12" :error="$v.value.$invalid"
            :error-label="value_err"
            helper="required"
          >
            <q-chips-input
              float-label="value" clearable
              v-model="value" @blur="$v.value.$touch"
            />
          </q-field>

          <!-- sequence -->
          <q-field
            class="col-6" :error="$v.sequence.$invalid"
            :error-label="sequence_err"
            helper="required"
          >
            <q-input
              type="number"
              float-label="sequence" clearable
              v-model="sequence" @blur="$v.sequence.$touch"
            />
          </q-field>
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import {Toast} from 'quasar'
  import {createRequest} from "../services/attribute"
  import {required,numeric,minValue,minLength} from 'vuelidate/lib/validators'
  import {mapErrorMessage} from 'src/utils/error-messages'

  export default {
    data() {
      return {
        name: '',
        value: [],
        sequence: 0,
      }
    },
    validations: {
      name: {required},
      value: {required,minLength:minLength(1)},
      sequence: {required,numeric,minValue:minValue(0)}
    },
    computed: {
      ...mapErrorMessage([
        'name','value','sequence'
      ])
    },
    methods: {
      async save() {
        const response = await createRequest({
          name: this.name,
          value: this.value,
          sequence: this.sequence
        });
        if (response.status === this.$settings.RESPONSE_STATUS.CREATED) {
          const id = response.data.id;
          this.$router.push({name:'base:AttributeForm',params: {id}});
          Toast.create.positive("update successfully")
        } else {
          Toast.create.negative(response.data.detail)
        }
      }
    },
  }
</script>

<template>
  <div>
    <q-card>
      <q-card-title class="text-black">
        {{name}}
        <span slot="subtitle">{{id}}</span>
      </q-card-title>
      <q-card-main>
        <div class="row items-center justify-start">
          <q-btn icon="save" color="primary" :disable="$v.$invalid && !$v.$dirty" @click="update">
            <i>update</i>
          </q-btn>
        </div>
        <div class="row">
          <!-- name -->
          <q-field
            class="col-6" :error="$v.name.$invalid"
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
          <q-field class="col-3" helper="readonly">
            <q-datetime
              float-label="create time"
              v-model="create_time" disable type="datetime"
            />
          </q-field>
          <q-field class="col-3" helper="readonly">
            <q-datetime
              float-label="last modify time"
              v-model="last_modify_time" disable type="datetime"
            />
          </q-field>
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import {Toast} from 'quasar'
  import {http} from "../urls/attribute"
  import {detailRequest,updateRequest} from "../services/attribute"
  import {required,numeric,minValue,minLength} from 'vuelidate/lib/validators'
  import {mapErrorMessage} from 'src/utils/error-messages'

  export default {
    props: {
      id: {type: Number, required: true}
    },
    async mounted() {
      await this.getData()
    },
    data() {
      return {
        name: '',
        sequence: 0,
        value: [],
        create_time: '',
        last_modify_time: ''
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
      ]),
      url() {
        return http.LIST_URL()
      }
    },
    methods: {
      refresh(data) {
        this.create_time = data.create_time;
        this.last_modify_time = data.last_modify_time;
        this.name = data.name;
        this.value = data.value;
      },
      async getData() {
        const response = await detailRequest(this.$props.id);
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.refresh(response.data)
        } else {
          Toast.create.negative(response.data.detail)
        }
      },
      async update() {
        const response = await updateRequest({
          id: this.$props.id,
          name: this.name,
          value: this.value,
          sequence: this.sequence
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.refresh(response.data);
          Toast.create.positive("update successfully")
        } else {
          Toast.create.negative(response.data.detail)
        }
      }
    }
  }
</script>

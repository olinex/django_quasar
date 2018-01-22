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
          <!-- value -->
          <q-field
            class="col-12" :error="$v.value.$invalid"
            :error-label="value_err"
            :helper="help_text"
          >
            <q-input
              v-if="form === 'int'"
              type="number" clearable float-label="value"
              v-model="value" @blur="$v.value.$touch"
            />

            <q-input
              v-else-if="form === 'str'" clearable float-label="value"
              v-model="value" @blur="$v.value.$touch"
            />

            <q-toggle
              v-else-if="form === 'bool'" clearable float-label="value"
              v-model="value" @blur="$v.value.$touch"
            />

            <q-input
              v-else clearable float-label="value"
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

        <div class="row">
          <message-collapsible v-model="followers" class="col-12" :url="detailUrl" />
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import {Toast} from 'quasar'
  import {http} from "../urls/argument"
  import {detailRequest,updateRequest} from "../services/argument"
  import {required,numeric,minValue} from 'vuelidate/lib/validators'
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
        form: null,
        value: true,
        help_text: true,
        sequence: 0,
        create_time: '',
        last_modify_time: '',
        followers: []
      }
    },
    validations: {
      value: {required},
      sequence: {required,numeric,minValue:minValue(0)}
    },
    computed: {
      ...mapErrorMessage([
        'value','sequence'
      ]),
      url() {
        return http.LIST_URL()
      },
      detailUrl() {
        return http.DETAIL_URL(this.$props.id)
      }
    },
    methods: {
      refresh(data) {
        this.create_time = data.create_time;
        this.last_modify_time = data.last_modify_time;
        this.form = data.form;
        this.value = data.value;
        this.help_text = data.help_text;
        this.name = data.name;
        this.sequence = data.sequence;
        this.followers = data.followers
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

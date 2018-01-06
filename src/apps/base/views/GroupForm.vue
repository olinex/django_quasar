<template>
  <div>
    <q-card>
      <q-card-title class="text-black">
        {{name}}
        <span slot="subtitle">{{id}}</span>
      </q-card-title>
      <q-card-main>
        <div class="row items-center justify-start">
          <q-btn icon="save" color="primary" @click="update">
            <i>update</i>
          </q-btn>
        </div>
        <div class="row">
          <!-- name -->
          <q-field
            class="col-12" :error="$v.name.$error"
            :error-label="name_err"
            helper="required"
          >
            <q-input
              float-label="name" clearable
              v-model="name" @blur="$v.name.$touch"
            ></q-input>
          </q-field>

          <!-- permissions -->
          <many-to-many-field class="col-12" v-model="permissions"/>

        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import {Toast} from 'quasar'
  import {http} from "../urls/group"
  import {detailRequest,updateRequest} from "../services/group"
  import {RESPONSE_STATUS} from "src/settings"
  import {required,minLength} from 'vuelidate/lib/validators'
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
        permissions: []
      }
    },
    validations: {
      name: {required,minLength:minLength(3)}
    },
    computed: {
      ...mapErrorMessage([
        'name'
      ]),
      url() {
        return http.LIST_URL()
      },
    },
    methods: {
      refresh(data) {
        this.name = data.name
        this.permissions = data.permissions
      },
      async getData() {
        const response = await detailRequest(this.$props.id)
        if (response.status === RESPONSE_STATUS.OK) {
          this.refresh(response.data)
        } else {
          Toast.create.negative(response.data.detail)
        }
      },
      async update() {
        const response = await updateRequest({
          id: this.$props.id,
          name: this.name,
          permissions: this.permissions
        })
        if (response.status === RESPONSE_STATUS.OK) {
          this.refresh(response.data)
          Toast.create.positive("update successfully")
        } else {
          Toast.create.negative(response.data.detail)
        }
      }
    }
  }
</script>

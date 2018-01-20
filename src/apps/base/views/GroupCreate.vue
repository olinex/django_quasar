<template>
  <div>
    <q-card>
      <q-card-title class="text-black">
        city
        <span slot="subtitle">create</span>
      </q-card-title>
      <q-card-main>
        <div class="row">
          <q-btn icon="save" color="primary" :disable="$v.$invalid" @click="save">
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

          <!-- permissions -->
          <many-to-many-field
            class="col-12" v-model="permissions"
            label="permissions" :request="permissionSearchRequest"
          />
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import {Toast} from 'quasar'
  import {createRequest} from "../services/group"
  import {searchRequest} from "../services/permission"
  import {required} from 'vuelidate/lib/validators'
  import {mapErrorMessage} from 'src/utils/error-messages'

  export default {
    data() {
      return {
        name: '',
        permissions: []
      }
    },
    validations: {
      name: {required}
    },
    computed: {
      ...mapErrorMessage(['name']),
      permissionSearchRequest() {
        return searchRequest
      }
    },
    methods: {
      async save() {
        const response = await createRequest({
          name: this.name,
          permissions: this.permissions
        });
        if (response.status === this.$settings.RESPONSE_STATUS.CREATED) {
          const id = response.data.id;
          this.$router.push({name:'base:GroupForm',params: {id}});
          Toast.create.positive("update successfully")
        } else {
          Toast.create.negative(response.data.detail)
        }
      }
    },
  }
</script>

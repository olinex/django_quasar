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
            class="col-12" :error="$v.name.$error"
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
  import {Toast} from "quasar"
  import {routeName} from "../apps";
  import {createRequest} from "../services/group"
  import {searchRequest} from "../services/permission"
  import {required} from "vuelidate/lib/validators"
  import {mapErrorMessage} from "src/utils/error-messages"

  export default {
    data() {
      return {
        name: "",
        permissions: []
      }
    },
    validations: {
      name: {required}
    },
    computed: {
      ...mapErrorMessage(["name"]),
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
          this.$router.push({name:routeName("GroupForm"),params: {id}});
          Toast.create.positive("create successfully")
        }
      }
    },
  }
</script>

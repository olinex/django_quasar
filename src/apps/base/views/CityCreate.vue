<template>
  <div>
    <q-card>
      <q-card-title class="text-black">
        city
        <span slot="subtitle">create</span>
        <div slot="right">
          <states-breadcrumb
            current="draft"
            :states="['draft','confirmed']"
          />
        </div>
      </q-card-title>
      <q-card-main>
        <div class="row">
          <q-btn icon="save" color="primary" :disable="$v.$invalid && !$v.$dirty" @click="save">
            <i>save</i>
          </q-btn>
        </div>
        <div class="row">
          <!-- country -->
          <country
            class="col-6" float-label="country" v-model="country"
            helper="the country of the city"
          />

          <!-- province -->
          <province
            ref="province" class="col-6" v-model="province"
            helper="the province of the city" @blur="$v.province.$touch"
            :country="country" float-label="province" :error="$v.province.$error"
            :error-label="province_err"
          />

          <!-- name -->
          <q-field
            class="col-6" :error="$v.name.$error"
            :error-label="name_err"
            helper="required"
          >
            <q-input
              float-label="name" clearable
              v-model="name" @blur="$v.name.$touch"
            />
          </q-field>

          <!-- sequence -->
          <q-field
            class="col-6" :error="$v.sequence.$error"
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
  import {Toast} from "quasar";
  import {routeName} from "../apps";
  import {createRequest} from "../services/city";
  import {required,numeric,minValue} from "vuelidate/lib/validators";
  import {mapErrorMessage} from "src/utils/error-messages";
  import Country from "../components/fields/Country";
  import Province from "../components/fields/Province";

  export default {
    components: {
      Province,
      Country
    },
    data() {
      return {
        name: "",
        country: "China",
        province: null,
        sequence: 0,
      }
    },
    validations: {
      name: {required},
      province: {required,numeric,minValue:minValue(0)},
      sequence: {required,numeric,minValue:minValue(0)}
    },
    computed: {
      ...mapErrorMessage([
        "name", "province", "sequence"
      ])
    },
    methods: {
      async save() {
        const response = await createRequest({
          name: this.name,
          province: this.province,
          sequence: this.sequence
        });
        if (response.status === this.$settings.RESPONSE_STATUS.CREATED) {
          const id = response.data.id;
          this.$router.push({name:routeName("CityForm"),params: {id}});
          Toast.create.positive("create successfully")
        }
      }
    },
  }
</script>

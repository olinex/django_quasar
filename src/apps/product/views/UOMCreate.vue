<template>
  <div>
    <q-card>
      <q-card-title class="text-black">
        UOM
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

          <!-- symbol -->
          <q-field
            class="col-6" :error="$v.symbol.$error"
            :error-label="symbol_err"
            helper="the symbol of the uom"
          >
            <q-input
              float-label="symbol" clearable
              v-model="symbol" @blur="$v.symbol.$touch"
            />
          </q-field>

          <!-- decimal places -->
          <q-field
            class="col-6" :error="$v.decimal_places.$error"
            :error-label="decimal_places_err"
            helper="the decimal places of the uom limit"
          >
            <q-input
              float-label="decimal places" clearable type="number"
              v-model="decimal_places" @blur="$v.decimal_places.$touch"
            />
          </q-field>

          <!-- ratio -->
          <q-field
            class="col-6" :error="$v.ratio.$error"
            :error-label="ratio_err"
            helper="the ratio compare with standard uom"
          >
            <q-input
              float-label="ratio" clearable type="number"
              v-model="ratio" @blur="$v.ratio.$touch"
            />
          </q-field>

          <!-- round method -->
          <q-field
            class="col-6" :error="$v.round_method.$error"
            :error-label="round_method_err"
            helper="the round method uom use to convert"
          >
            <q-select
              v-model="round_method" float-label="round method"
              :options="roundMethodOptions" @blur="$v.round_method.$touch"
            />
          </q-field>

          <!-- category -->
          <q-field
            class="col-6" :error="$v.category.$error"
            :error-label="category_err"
            helper="the category of the uom"
          >
            <q-select
              v-model="category" float-label="category"
              :options="categoryOptions" @blur="$v.category.$touch"
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
  import {createRequest} from "../services/uom";
  import {required,numeric,minValue} from "vuelidate/lib/validators";
  import {mapErrorMessage} from "src/utils/error-messages";
  import {CATEGORIES,ROUND_METHODS} from "../options";

  export default {
    data() {
      return {
        name: "",
        symbol: "",
        decimal_places: 0,
        ratio: 0,
        round_method: "",
        category: "",
        sequence: 0,
      }
    },
    validations: {
      name: {required},
      symbol: {required},
      decimal_places: {required,numeric,minValue:minValue(0)},
      ratio: {required,minValue:minValue(0)},
      round_method: {required},
      category: {required},
      sequence: {required,numeric,minValue:minValue(0)}
    },
    computed: {
      ...mapErrorMessage([
        "name", "symbol", "decimal_places",
        "ratio", "round_method", "category",
        "sequence"
      ]),
      roundMethodOptions() {
        return ROUND_METHODS
      },
      categoryOptions() {
        return CATEGORIES
      }
    },
    methods: {
      async save() {
        const response = await createRequest({
          name: this.name,
          symbol: this.symbol,
          decimal_places: this.decimal_places,
          ratio: this.ratio,
          round_method: this.round_method,
          category: this.category,
          sequence: this.sequence
        });
        if (response.status === this.$settings.RESPONSE_STATUS.CREATED) {
          const id = response.data.id;
          this.$router.push({name:routeName("UOMForm"),params: {id}});
          Toast.create.positive("create successfully")
        }
      }
    },
  }
</script>

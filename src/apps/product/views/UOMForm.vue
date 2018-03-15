<template>
  <div>
    <q-card>
      <q-card-title class="text-black">
        {{name}}
        <span slot="subtitle">{{id}}</span>
        <div slot="right">
          <states-breadcrumb
            :current="is_draft ? 'draft':'confirmed'"
            :states="['draft','confirmed']"
          />
        </div>
      </q-card-title>
      <q-card-main>
        <button-group
          :id="id" :url="url" @action="getData()"
          :is-active="is_active" :is-draft="is_draft"
        >
          <q-btn icon="save" color="primary" :disable="$v.$invalid && !$v.$dirty" @click="update">
            <i>update</i>
          </q-btn>
        </button-group>
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
  import {Toast} from "quasar";
  import {http} from "../urls/uom"
  import {detailRequest,updateRequest} from "../services/uom";
  import {required,numeric,minValue} from "vuelidate/lib/validators";
  import {mapErrorMessage} from "src/utils/error-messages";
  import {ROUND_METHODS,CATEGORIES} from "../options";

  export default {
    props: {
      id: {type: Number, required: true}
    },
    async mounted() {
      await this.getData()
    },
    data() {
      return {
        name: "",
        is_draft: true,
        is_active: true,
        symbol: "",
        decimal_places: 0,
        ratio: 0,
        round_method: "",
        category: "",
        sequence: 0,
        create_time: "",
        last_modify_time: "",
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
      },
      url() {
        return http.LIST_URL()
      },
    },
    methods: {
      refresh(data) {
        this.name = data.name;
        this.symbol = data.symbol;
        this.decimal_places = data.decimal_places;
        this.ratio = data.ratio;
        this.round_method = data.round_method;
        this.category = data.category;
        this.create_time = data.create_time;
        this.last_modify_time = data.last_modify_time;
        this.is_draft = data.is_draft;
        this.is_active = data.is_active;
        this.sequence = data.sequence
      },
      async getData() {
        const response = await detailRequest(this.$props.id);
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.refresh(response.data)
        }
      },
      async update() {
        const response = await updateRequest({
          id: this.$props.id,
          name: this.name,
          symbol :this.symbol,
          decimal_places :this.decimal_places,
          ratio :this.ratio,
          round_method :this.round_method,
          category :this.category,
          create_time :this.create_time,
          last_modify_time :this.last_modify_time,
          is_draft :this.is_draft,
          is_active :this.is_active,
          sequence :this.sequence
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.refresh(response.data);
          Toast.create.positive("update successfully")
        }
      }
    }
  }
</script>

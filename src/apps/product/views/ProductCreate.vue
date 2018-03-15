<template>
  <div>
    <q-card>
      <q-card-title class="text-black">
        product
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

          <!-- template -->
          <foreign-key
            class="col-12" ref="template" v-model="template"
            field="name" helper="the template of the product belong to"
            float-label="template" :request="templateRequest" @blur="$v.template.$touch"
            :error="$v.template.$error" :error-label="template_err" @selection="templateSelectionHandler"
          />

          {{templateSelection}}

          <!-- prices -->
          <dict-field class="col-12" v-model="prices" label="prices" key-label="item" value-label="price"/>

          <!-- salable -->
          <q-field
            class="col-4" helper="the status of the product can be sale"
          >
            <q-toggle
              v-model="salable" clearable float-label="salable"
            />
          </q-field>

          <!-- purchasable -->
          <q-field
            class="col-4" helper="the status of the product can be purchase"
          >
            <q-toggle
              v-model="purchasable" clearable float-label="purchasable"
            />
          </q-field>

          <!-- rentale -->
          <q-field
            class="col-4"
            helper="the status of the product can be rent"
          >
            <q-toggle
              v-model="rentable" clearable float-label="rentable"
            />
          </q-field>

          <!-- weight -->
          <q-field
            class="col-6" :error="$v.weight.$error"
            :error-label="weight_err"
            helper="the weight of the product"
          >
            <q-input
              type="number"
              float-label="weight" clearable
              v-model="weight" @blur="$v.weight.$touch"
            />
          </q-field>

          <!-- volume -->
          <q-field
            class="col-6" :error="$v.volume.$error"
            :error-label="volume_err"
            helper="the total volume of the product"
          >
            <q-input
              type="number"
              float-label="volume" clearable
              v-model="volume" @blur="$v.volume.$touch"
            />
          </q-field>

          <!-- in_code -->
          <q-field
            class="col-6" :error="$v.in_code.$error"
            :error-label="in_code_err"
            helper="the inner code of the product"
          >
            <q-input
              float-label="code inside" clearable
              v-model="in_code" @blur="$v.in_code.$touch"
            />
          </q-field>

          <!-- out_code -->
          <q-field
            class="col-6" :error="$v.out_code.$error"
            :error-label="out_code_err"
            helper="the outside code of the product"
          >
            <q-input
              float-label="description outside" clearable
              v-model="out_code" @blur="$v.out_code.$touch"
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
  import {Toast} from "quasar"
  import {routeName} from "../apps";
  import {createRequest} from "../services/product"
  import {required,numeric,minValue,minLength} from "vuelidate/lib/validators"
  import {mapErrorMessage} from "src/utils/error-messages"
  import {searchRequest} from "../services/productTemplate"

  export default {
    data() {
      return {
        template: null,
        templateSelection: null,
        attributes: {},
        prices: {},
        weight: null,
        volume: null,
        salable: false,
        purchasable: false,
        rentable: false,
        in_code: "",
        out_code: "",
        sequence: null,
      }
    },
    validations: {
      template: {required,numeric,minValue:minValue(0)},
      weight: {required,minValue:minValue(0)},
      volume: {required,minValue:minValue(0)},
      in_code: {required,minLength:minLength(3)},
      out_code: {required,minLength:minLength(3)},
      sequence: {required,numeric,minValue:minValue(0)}
    },
    computed: {
      ...mapErrorMessage([
        "template", "weight", "volume",
        "in_code", "out_code", "sequence"
      ]),
      templateRequest() {
        return searchRequest
      },
    },
    methods: {
      async save() {
        const response = await createRequest({
          template: this.template,
          prices: this.prices,
          weight: this.weight,
          volume: this.volume,
          salable: this.salable,
          purchasable: this.purchasable,
          rentable: this.rentable,
          in_code: this.in_code,
          out_code: this.out_code,
          sequence: this.sequence
        });
        if (response.status === this.$settings.RESPONSE_STATUS.CREATED) {
          const id = response.data.id;
          this.$router.push({name:routeName("ProductForm"),params: {id}});
          Toast.create.positive("create successfully")
        }
      },
      templateSelectionHandler(selection) {
        this.templateSelection = selection
      }
    },
  }
</script>

<template>
  <div>
    <q-card>
      <q-card-title class="text-black">
        product template
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
            class="col-12" :error="$v.name.$error"
            :error-label="name_err"
            helper="required"
          >
            <q-input
              float-label="name" clearable
              v-model="name" @blur="$v.name.$touch"
            />
          </q-field>

          <!-- category -->
          <product-category
            v-model="category" class="col-6" helper="the category of the product" float-label="category"
            :error="$v.category.$error" :error-label="category_err" @blur="$v.category.$touch"
          />

          <!-- uom -->
          <uom
            v-model="uom" class="col-6" helper="the uom of the product" float-label="uom"
            :error="$v.uom.$error" :error-label="uom_err" @blur="$v.uom.$touch"
          />

          <!-- stock_type -->
          <stock-type
            class="col-6" v-model="stock_type" :error="$v.stock_type.$error"
            :error-label="stock_type_err" @blur="$v.stock_type.$touch"
            float-label="stock type" helper="the type of the method to stock"
          />

          <!-- attributes -->
          <many-to-many-field
            class="col-12" v-model="attributes"
            label="attributes" :request="attributeSearchRequest"
          />

          <!-- detail -->
          <q-field
            class="col-12" :error="$v.detail.$error"
            :error-label="detail_err"
            helper="the detail to descript the product template"
          >
            <q-input
              float-label="detail" clearable
              v-model="detail" @blur="$v.detail.$touch"
            />
          </q-field>

          <!-- in_description -->
          <q-field
            class="col-6" :error="$v.in_description.$error"
            :error-label="in_description_err"
            helper="the inner description of the product template"
          >
            <q-input
              float-label="description inside" clearable type="textera"
              v-model="in_description" @blur="$v.in_description.$touch" :min-rows="3"
            />
          </q-field>

          <!-- out_description -->
          <q-field
            class="col-6" :error="$v.out_description.$error"
            :error-label="out_description_err"
            helper="the outside description of the product template"
          >
            <q-input
              float-label="description outside" clearable type="textera"
              v-model="out_description" @blur="$v.out_description.$touch" :min-rows="3"
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
  import {createRequest} from "../services/productTemplate"
  import {searchRequest} from "../services/attribute";
  import {required,numeric,minValue} from "vuelidate/lib/validators"
  import {mapErrorMessage} from "src/utils/error-messages"
  import Uom from "../components/fields/uom";
  import ProductCategory from "../components/fields/productCategory";
  import StockType from "../components/fields/StockType";

  export default {
    components: {
      StockType,
      ProductCategory,
      Uom
    },
    data() {
      return {
        name: "",
        attributes: [],
        uom: null,
        uom__name: "",
        category: null,
        category__name: "",
        stock_type: "",
        detail: "",
        in_description: "",
        out_description: "",
        sequence: 0,
      }
    },
    validations: {
      name: {required},
      uom: {required,numeric,minValue:minValue(0)},
      category: {required,numeric,minValue:minValue(0)},
      stock_type: {required},
      detail: {required},
      in_description: {required},
      out_description: {required},
      sequence: {required,numeric,minValue:minValue(0)}
    },
    computed: {
      ...mapErrorMessage([
        "name","attributes", "uom", "category", "stock_type",
        "detail", "in_description", "out_description", "sequence"
      ]),
      attributeSearchRequest() {
        return searchRequest
      }
    },
    methods: {
      async save() {
        const response = await createRequest({
          name: this.name,
          uom: this.uom,
          category: this.category,
          stock_type: this.stock_type,
          attributes: this.attributes,
          detail: this.detail,
          in_description: this.in_description,
          out_description: this.out_description,
          sequence: this.sequence
        });
        if (response.status === this.$settings.RESPONSE_STATUS.CREATED) {
          const id = response.data.id;
          this.$router.push({name:routeName("ProductTemplateForm"),params: {id}});
          Toast.create.positive("create successfully")
        }
      }
    },
  }
</script>

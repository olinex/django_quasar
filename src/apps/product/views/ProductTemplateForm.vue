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
            ref="category" v-model="category" class="col-6" helper="the category of the product"
            float-label="category" :error="$v.category.$error" :error-label="category_err"
            @blur="$v.category.$touch"
          />

          <!-- uom -->
          <uom
            ref="uom" v-model="uom" class="col-6" helper="the uom of the product" float-label="uom"
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
            class="col-12" helper="the detail to descript the product template"
          >
            <q-input
              float-label="detail" clearable
              v-model="detail"
            />
          </q-field>

          <!-- in_description -->
          <q-field
            class="col-6" helper="the inner description of the product template"
          >
            <q-input
              float-label="description inside" clearable type="textera"
              v-model="in_description" :min-rows="3"
            />
          </q-field>

          <!-- out_description -->
          <q-field
            class="col-6" helper="the outside description of the product template"
          >
            <q-input
              float-label="description outside" clearable type="textera"
              v-model="out_description" :min-rows="3"
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
  import {http} from "../urls/productTemplate";
  import {detailRequest, updateRequest} from "../services/productTemplate";
  import {searchRequest} from "../services/attribute";
  import {required, numeric, minValue} from "vuelidate/lib/validators";
  import {mapErrorMessage} from "src/utils/error-messages";
  import Uom from "../components/fields/uom";
  import ProductCategory from "../components/fields/productCategory";
  import StockType from "../components/fields/StockType";

  export default {
    components: {
      StockType,
      ProductCategory,
      Uom
    },
    props: {
      id: {type: Number, required: true}
    },
    async mounted() {
      await this.getData();
      this.$refs.category.selected({label: this.category__name, value: this.category});
      this.$refs.uom.selected({label: this.uom__name, value: this.uom})
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
        create_time: "",
        last_modify_time: "",
      }
    },
    validations: {
      name: {required},
      uom: {required,numeric,minValue:minValue(0)},
      category: {required,numeric,minValue:minValue(0)},
      stock_type: {required},
      sequence: {required,numeric,minValue:minValue(0)}
    },
    computed: {
      ...mapErrorMessage([
        "name","attributes", "uom", "category", "stock_type", "sequence"
      ]),
      url() {
        return http.LIST_URL()
      },
      attributeSearchRequest() {
        return searchRequest
      }
    },
    methods: {
      refresh(data) {
        this.create_time = data.create_time;
        this.last_modify_time = data.last_modify_time;
        this.is_draft = data.is_draft;
        this.is_active = data.is_active;
        this.name = data.name;
        this.uom = data.uom;
        this.uom__name = data.uom__name;
        this.category = data.category;
        this.category__name = data.category__name;
        this.stock_type = data.stock_type;
        this.attributes = data.attributes;
        this.detail = data.detail;
        this.in_description = data.in_description;
        this.out_description = data.out_description;
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
          uom: this.uom,
          category: this.category,
          stock_type: this.stock_type,
          attributes: this.attributes,
          detail: this.detail,
          in_description: this.in_description,
          out_description: this.out_description,
          sequence: this.sequence
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.refresh(response.data);
          Toast.create.positive("update successfully")
        }
      }
    }
  }
</script>

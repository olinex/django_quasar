<template>
  <foreign-key
    ref="productCategory" :value="value" field="name" :helper="helper"
    :float-label="floatLabel" :request="getRequest" @blur="blurHandler($event)"
    @input="inputHandler($event)" :error="error" :error-label="errorLabel"
  />
</template>

<script>
  import {searchRequest} from "../../services/productCategory"

  export default {
    name: "product-category",
    props: {
      value: {type: Number},
      helper: {type: String, required: true},
      error: {type: Boolean, required: false},
      errorLabel: {type: [String,Function], required: false},
      floatLabel: {type: String, required: false}
    },
    computed: {
      getRequest() {
        return searchRequest
      }
    },
    methods: {
      inputHandler($event) {
        this.$emit("input",$event)
      },
      blurHandler($event) {
        this.$emit("blur",$event)
      },
      selected({value,label}) {
        this.$refs.productCategory.selected({
          value,label
        })
      }
    }
  }
</script>

<template>
  <foreign-key
    ref="productTemplate" :value="value" field="name" :helper="helper"
    :float-label="floatLabel" :request="getRequest" @blur="blurHandler($event)"
    @input="inputHandler($event)" :error="error" :error-label="errorLabel"
  />
</template>

<script>
  import {searchRequest} from "../../services/productTemplate"

  export default {
    name: "product-template",
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
        this.$refs.productTemplate.selected({
          value,label
        })
      }
    }
  }
</script>

<template>
  <foreign-key
    ref="uom" :value="value" field="name" :helper="helper"
    :float-label="floatLabel" :request="getUOMRequest" @blur="blurHandler($event)"
    @input="inputHandler($event)" :error="error" :error-label="errorLabel"
  />
</template>

<script>
  import {searchRequest} from "../../services/uom"

  export default {
    name: "uom",
    props: {
      value: {type: Number},
      helper: {type: String, required: true},
      error: {type: Boolean, required: false},
      errorLabel: {type: [String,Function], required: false},
      floatLabel: {type: String, required: false}
    },
    computed: {
      getUOMRequest() {
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
        this.$refs.uom.selected({
          value,label
        })
      }
    }
  }
</script>

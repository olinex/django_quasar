<template>
  <q-field
    :error="error"
    :error-label="errorLabel"
    :helper="helper"
  >
    <q-select
      :value="value" :float-label="floatLabel" filter autofocus-filter
      :options="options" @blur="blurHandler($event)" @input="inputHandler($event)"
    />
  </q-field>
</template>

<script>
  import {STOCK_TYPIES} from "../../options";

  export default {
    name: "stock-type",
    props: {
      value: {type: String},
      helper: {type: String, required: true},
      error: {type: Boolean, required: false},
      errorLabel: {type: [String,Function], required: false},
      floatLabel: {type: String, required: false}
    },
    computed: {
      options() {
        return STOCK_TYPIES
      }
    },
    methods: {
      inputHandler($event) {
        this.$emit("input", $event)
      },
      blurHandler($event) {
        this.$emit("blur", $event)
      }
    }
  }
</script>

<template>
  <foreign-key
    ref="city"
    :value="value"
    field="name"
    :helper="helper"
    :float-label="floatLabel"
    :request="getCityRequest"
    @input="inputHandler($event)"
    :error="error"
    :error-label="errorLabel"
  />
</template>

<script>
  import {provinceLimitSearchRequest} from "../../services/city"

  export default {
    name: "city",
    props: {
      value: {type: Number},
      helper: {type: String, required: true},
      province: {type: Number, required: false},
      error: {type: Boolean, required: false},
      errorLabel: {type: [String,Function], required: false},
      floatLabel: {type: String, required: false}
    },
    computed: {
      getCityRequest() {
        return provinceLimitSearchRequest(this.$props.province)
      }
    },
    methods: {
      inputHandler($event) {
        this.$emit("input",$event)
      },
      blurHandler($event) {
        this.$emit("blur", $event)
      },
      selected({value,label}) {
        this.$refs.city.selected({
          value,label
        })
      }
    }
  }
</script>

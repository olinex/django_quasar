<template>
  <foreign-key
    ref="province" :value="value" field="name" :helper="helper"
    :float-label="floatLabel" :request="getProvinceRequest"
    @input="inputHandler($event)" :error="error" :error-label="errorLabel"
  />
</template>

<script>
  import {countryLimitSearchRequest} from "../../services/province";

  export default {
    name: "province",
    props: {
      value: {type: Number},
      helper: {type: String, required: true},
      country: {type: String, required: false},
      error: {type: Boolean, required: false},
      errorLabel: {type: [String,Function], required: false},
      floatLabel: {type: String, required: false}
    },
    computed: {
      getProvinceRequest() {
        return countryLimitSearchRequest(this.$props.country)
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
        this.$refs.province.selected({
          value,label
        })
      }
    }
  }
</script>

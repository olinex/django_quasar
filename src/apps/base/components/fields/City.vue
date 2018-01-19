<template>
  <foreign-key
    ref="city"
    :value="value"
    field="name"
    :helper="helper"
    float-label="city"
    :request="getCityRequest"
    @input="inputHandler($event)"
    :error="$v.city.$error"
    :error-label="city_err"
  />
</template>

<script>
  import {mapErrorMessage} from "src/utils/error-messages"
  import {provinceLimitSearchRequest} from "../../services/city"
  import {requiredIf,numeric,minValue} from 'vuelidate/lib/validators'

  export default {
    name: "city",
    props: {
      value: {type: Number},
      helper: {type: String, required: true},
      required: {type: Boolean, required: false},
      province: {type: Number, required: false}
    },
    data() {
      return {
        city:null
      }
    },
    validations: {
      city: {numeric,minValue:minValue(1),required:requiredIf(function () {
          return this.$props.required
        }),}
    },
    computed: {
      ...mapErrorMessage(['city']),
      getCityRequest() {
        return provinceLimitSearchRequest(this.$props.province)
      }
    },
    methods: {
      inputHandler($event) {
        this.city = $event;
        this.$emit('input',$event)
      },
      selected({value,label}) {
        this.$refs.city.selected({
          value,label
        })
      }
    }
  }
</script>

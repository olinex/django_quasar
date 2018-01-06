<template>
  <foreign-key
    ref="province"
    :value="value"
    field="name"
    :helper="helper"
    float-label="province"
    :request="getProvinceRequest"
    @input="inputHandler($event)"
  />
</template>

<script>
  import {mapErrorMessage} from "src/utils/error-messages"
  import {countryLimitSearchRequest} from "../../services/province"
  import {requiredIf,numeric,minValue} from 'vuelidate/lib/validators'

  export default {
    name: "province",
    props: {
      value: {type: Number, required: true},
      helper: {type: String, required: true},
      required: {type: Boolean, required: false},
      country: {type: String, required: false}
    },
    data() {
      return {
        province: null
      }
    },
    validations: {
      province: {numeric,minValue:minValue(1),required:requiredIf(function () {
          return this.$props.required
        }),}
    },
    computed: {
      ...mapErrorMessage(['province']),
      getProvinceRequest() {
        return countryLimitSearchRequest(this.$props.country)
      }
    },
    methods: {
      inputHandler($event) {
        this.province = $event
        this.$emit('input',$event)
      },
      selected({value,label}) {
        this.$refs.province.selected({
          value,label
        })
      }
    }
  }
</script>

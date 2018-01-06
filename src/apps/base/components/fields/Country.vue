<template>
  <q-field
    :error="$v.country.$error"
    :error-label="country_err"
    :helper="helper"
  >
    <q-select
      :value="value" float-label="Country"
      :options="options" @blur="$v.country.$touch"
      @input="inputHandler($event)"
    ></q-select>
  </q-field>
</template>

<script>
  import {mapErrorMessage} from "src/utils/error-messages"
  import {requiredIf, alpha} from 'vuelidate/lib/validators'

  export default {
    name: "country",
    props: {
      value: {type: Number, required: true},
      helper: {type: String, required: true},
      required: {type: Boolean, required: false}
    },
    validations: {
      country: {
        alpha, required: requiredIf(function () {
          return this.$props.required
        })
      }
    },
    data() {
      return {
        country: 'China'
      }
    },
    computed: {
      ...mapErrorMessage(['country']),
      options() {
        return [
          {value: 'China', label: 'China'},
          {value: 'French', label: 'French'},
        ]
      }
    },
    methods: {
      inputHandler($event) {
        this.country = $event
        this.$emit('input', $event)
      }
    }
  }
</script>

<template>
  <div class="row">
    <foreign-key
      v-model="province"
      cls="col-4"
      field="name"
      :error="$v.province.$error"
      :error_label="province_err"
      helper="the province of the address"
      placeholder="province"
      :request="getProvinceRequest"
      @blur="$v.province.$touch"
    ></foreign-key>

    <foreign-key
      v-model="city"
      cls="col-4"
      field="name"
      :error="$v.city.$error"
      :error_label="city_err"
      helper="the city of the address"
      placeholder="city"
      :request="getCityRequest"
      @blur="$v.city.$touch"
    ></foreign-key>

    <foreign-key
      :value="value"
      cls="col-4"
      field="name"
      :error="error"
      :error_label="error_label"
      helper="the region of the address"
      placeholder="region"
      :request="getRegionRequest"
      @blur="blurHandler"
      @input="inputHandler"
    ></foreign-key>
  </div>
</template>

<script>
  import {
    minLength, numeric, requiredIf, required
  } from 'vuelidate/lib/validators'
  import {mapErrorMessage} from 'src/utils/error-messages'
  import {searchRequest as provinceRequest} from "../services/province";
  import {provinceLimitSearchRequest} from "../services/city";
  import {cityLimitSearchRequest} from "../services/region";

  export default {
    name: "Location",
    data() {
      return {
        province: null,
        city: null
      }
    },
    props: {
      error: {type: Boolean, required: true, default: false},
      error_label: {type: String, required: true},
      value: {type:Number}
    },
    validations: {
      province: {
        numeric,
        minLength: minLength(1),
        requreidIf:requiredIf('city'),
      },
      city: {
        numeric,
        minLength: minLength(1),
        requreidIf:requiredIf('region'),
      }
    },
    computed: {
      getProvinceRequest() {
        return provinceRequest
      },
      getCityRequest() {
        return provinceLimitSearchRequest(this.province)
      },
      getRegionRequest() {
        return cityLimitSearchRequest(this.city)
      },
      ...mapErrorMessage([
        'province','city'
      ])
    },
    methods: {
      blurHandler() {
        this.$emit('blur')
      },
      inputHandler($event) {
        this.$emit('input',$event)
      }
    }
  }
</script>

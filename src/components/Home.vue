<template>
  <div class="row justify-between">
    <q-card class="col-7">
      <q-card-title>
        Card Title
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        Card Content
      </q-card-main>
    </q-card>

    <!-- uom converter -->
    <q-card class="col-4">
      <q-card-title>
        UOM Convertor
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <div class="row justify-between items-center">
          <p class="col-12 strong text-right shadow-1 bg-blue-1" style="height: 30px">
            {{convertResult}}
          </p>
          <!-- from uom -->
          <foreign-key
            class="col-5" ref="from_uom" v-model="from_uom"
            field="name" helper="the origin uom" float-label="from uom"
            :request="getUOMequest" :error="$v.from_uom.$error" :error-label="from_uom_err"
          />
          <q-btn color="faded" small flat round icon="compare_arrows" @click="switchTo"/>

          <!-- to uom -->
          <foreign-key
            class="col-5" ref="to_uom" v-model="to_uom"
            field="name" helper="the uom value convert to" float-label="to uom"
            :request="getUOMequest" :error="$v.to_uom.$error" :error-label="to_uom_err"
          />

          <q-field
            class="col-10" :error="$v.value.$error"
            :error-label="value_err"
            helper="the value will be converted"
          >
            <q-input
              float-label="value" clearable type="number"
              v-model="value" @blur="$v.value.$touch"
            />
          </q-field>
          <q-btn color="primary" icon="refresh" small flat round :disable="$v.$error" @click="convert"/>
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import {Toast} from "quasar";
  import {mapErrorMessage} from "src/utils/error-messages";
  import {required,numeric,minValue} from "vuelidate/lib/validators";
  import {convertRequest,searchRequest} from "src/apps/product/services/uom";

  export default {
    name: "home",
    data() {
      return {
        from_uom: null,
        to_uom: null,
        value: null,
        convertResult: 0,
      }
    },
    validations: {
      from_uom: {required,numeric,minValue:minValue(0)},
      to_uom: {required,numeric,minValue:minValue(0)},
      value: {required,minValue:minValue(0)}
    },
    computed: {
      ...mapErrorMessage(["from_uom","to_uom","value"]),
      getUOMequest() {
        return searchRequest
      }
    },
    methods: {
      async convert() {
        const response = await convertRequest({
          id: this.from_uom,
          to_uom: this.to_uom,
          value: this.value
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.convertResult = response.data.result
        }
      },
      switchTo() {
        const from_select = {label:this.$refs.from_uom.label,value:this.from_uom};
        const to_select = {label:this.$refs.to_uom.label,value:this.to_uom};
        this.$refs.from_uom.selected(to_select);
        this.$refs.to_uom.selected(from_select);
      }
    }
  }
</script>

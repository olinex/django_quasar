<template>
  <q-list>
    <q-list-header>{{label}}</q-list-header>
    <q-item v-for="(v, k) in value" :key="k">
      <q-item-main class="row">
          <span class="col-6">{{`${keyPrefix} ${k} ${keySuffix}`}}</span>
          <span class="c0l-6">{{`${valuePrefix} ${v} ${valueSuffix}`}}</span>
      </q-item-main>
      <q-item-side right>
        <q-btn small flat round icon="remove" color="negative" @click="remove(k)"/>
      </q-item-side>
    </q-item>
    <q-item-separator v-if="Object.keys(value).length !== 0"/>
    <q-item>
      <q-item-main class="row">
        <q-field
          class="col-6" :error="$v.keyData.$invalid"
          :error-label="keyData_err"
        >
          <q-input
            :float-label="keyLabel" clearable
            v-model="keyData" @blur="$v.keyData.$touch"
          />
        </q-field>
        <q-field
          class="col-6" :error="$v.valueData.$invalid"
          :error-label="valueData_err"
        >
          <q-input
            :float-label="valueLabel" clearable
            v-model="valueData" @blur="$v.valueData.$touch"
          />
        </q-field>
      </q-item-main>
      <q-item-side right>
        <q-btn small flat round icon="add" color="positive" @click="add" :disable="$v.$invalid && !$v.$dirty"/>
      </q-item-side>
    </q-item>
  </q-list>
</template>

<script>
  import {mapErrorMessage} from 'src/utils/error-messages'
  import {required, numeric, minValue,} from 'vuelidate/lib/validators'

  export default {
    name: "dict-field",
    props: {
      value: {type: Object},
      label: {type: String, reuqired: true},
      keyLabel: {type: String, reuqired: true},
      valueLabel: {type: String, reuqired: true},
      keyPrefix: {type: String, default: ''},
      keySuffix: {type: String, default: ''},
      valuePrefix: {type: String, default: ''},
      valueSuffix: {type: String, default: ''},
    },
    data() {
      return {
        keyData: '',
        valueData: null,
      }
    },
    validations: {
      keyData: {required},
      valueData: {required, numeric, minValue: minValue(0)},
    },
    computed: {
      ...mapErrorMessage([
        'keyData','valueData'
      ])
    },
    methods: {
      add() {
        this.$emit('input', {...this.$props.value, [this.keyData]: this.valueData});
        this.keyData = '';
        this.valueData = null
      },
      remove(key) {
        delete this.$props.value[key]
        this.$emit('input', {...this.$props.value});
      }
    }
  }
</script>

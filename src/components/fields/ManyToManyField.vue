<template>
  <q-scroll-area class="row" style="height: 400px">
    <q-toggle
      class="col-12"
      v-for="option in options"
      :value="value" @input="inputHandler($event)"
      :val="option.value" :label="option.label"
    ></q-toggle>
  </q-scroll-area>
</template>

<script>
  export default {
    name: "many-to-many-field",
    props: {
      value: {type:Array, required:true},
      field: {type:String, default: 'name'}
    },
    data() {
      return {
        data: [],
        items: []
      }
    },
    computed: {
      options() {
        return this.items.map(item => {
          return {value:item.id,label:item[this.$props.field]}
        })
      }
    },
    methods: {
      inputHandler($event) {
        this.data.push($event)
        this.$emit('input',this.data)
      },

    }
  }
</script>

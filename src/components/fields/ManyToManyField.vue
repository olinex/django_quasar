<template>
  <q-select
    multiple chips filter clearable
    :float-label="label"
    :autofocus-filter="true" :value="value"
    :options="options" @input="inputHandler($event)"
    :after="[
      { icon: 'more_vert', handler: more }
    ]"
  >
  </q-select>
</template>

<script>
  export default {
    name: "many-to-many-field",
    props: {
      label: {type: String, required: true},
      value: {type: Array},
      field: {type: String, default: 'name'},
      request: {type: Function, required: true}
    },
    async mounted() {
      this.more()
    },
    data() {
      return {
        page: 1,
        items: [],
        next: true
      }
    },
    computed: {
      options() {
        return this.items.map(item => {
          return {value: item.id, label: item[this.$props.field]}
        })
      }
    },
    methods: {
      async more() {
        if (this.next) {
          const response = await this.$props.request({page: this.page, pageSize: 50});
          if (response.status === this.$settings.RESPONSE_STATUS.OK) {
            this.items.push(...response.data.results);
            this.page += 1;
            if (!response.data.next) {
              this.next = false
            }
          }
        }
      },
      inputHandler($event) {
        this.$emit('input', $event)
      }
    }
  }
</script>

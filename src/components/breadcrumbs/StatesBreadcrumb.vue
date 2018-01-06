<template>
  <ul class="breadcrumb">
    <li v-for="state in states" :key="state">
      <a>
        <q-icon :name="getIcon(state)"></q-icon>
        {{state}}
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "states-breadcrumb",
    props: {
      current: {type: String, required: true},
      states: {type: Array, required: true}
    },
    computed: {
      currentIndex() {
        return this.$props.states.indexOf(this.$props.current)
      },
      isLast() {
        return this.$props.current === this.$props.states[this.$props.states.length - 1]
      }
    },
    methods: {
      getIcon(state) {
        if (state === this.$props.current) {
          if (this.isLast) {
            return 'done'
          }
          return 'edit'
        } else if (this.currentIndex > this.$props.states.indexOf(state)) {
          return 'done'
        } else {
          return 'pause'
        }
      },
    },
    watch: {},
  }
</script>

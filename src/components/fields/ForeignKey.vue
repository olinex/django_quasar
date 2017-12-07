<template>
  <q-field :class="cls" :error="error" :error-label="error_label" :helper="helper">
    <q-input
      :value="label"
      :placeholder="placeholder"
      @input="inputHandler($event)"
      @blur="blurHandler"
      :after="[ { icon: 'more_horiz', more: false, handler: moreToggler } ]"
    >
      <q-autocomplete @search="search" :min-characters="1" @selected="selected" :debounce="800"></q-autocomplete>
      <q-modal highlight v-model="more" :content-css="{minWidth: '40vw', minHeight: '80vh'}">
        <q-modal-layout>
          <q-toolbar slot="header">
            <q-btn flat @click="moreToggler" icon="keyboard_arrow_left"></q-btn>
            <div class="q-toolbar-title">{{ placeholder }} List</div>
          </q-toolbar>
          <div class="layout-padding row justify-center">
            <q-list class="col-12" separator highlight no-border>
              <q-item v-for="option in options" :key="option.id">
                <q-item-main>
                  <q-item-tile label>{{ option.name }}</q-item-tile>
                </q-item-main>
                <q-item-side right>
                  <q-btn color="blue-6" flat icon="done" @click="selectHandler(option)"></q-btn>
                </q-item-side>
              </q-item>
            </q-list>
            <q-pagination v-model="page" :max="maxPage"></q-pagination>
          </div>
        </q-modal-layout>
      </q-modal>
    </q-input>
  </q-field>
</template>

<script>
  import {RESPONSE_STATUS, DEFAULT_SEARCH_SIZE} from 'src/settings'

  export default {
    name: 'ForeignKey',
    data() {
      return {
        label: '',
        more: false,
        page: 1,
        count: 0,
        options: []
      }
    },
    props: {
      cls: {type: [String, Array], default: 'col-6'},
      error: {type: Boolean, required: true, default: false},
      error_label: {type: String, required: true},
      helper: {type: String, required: true},
      placeholder: {type: String, required: true},
      request: {type: Function, required: true},
      field: {type: String, required: true},
      value: {type: Number}
    },
    computed: {
      maxPage() {
        return Math.ceil(this.count / DEFAULT_SEARCH_SIZE)
      }
    },
    methods: {
      inputHandler($event) {
        // handle the input event,pass the key value to the parent model
        this.label = $event
        const option = this.options.find(option => option.label === $event)
        this.$emit('input', option && option.value)
      },
      blurHandler() {
        // bind the blur method with parent,untill the user lost focus to the field,
        // then valid the value
        this.$emit('blur')
      },
      moreToggler() {
        this.more = !this.more
      },
      selectHandler(option) {
        this.label = option.name
        this.$emit('input', option.id)
        this.moreToggler()
      },
      async getOptions(page) {
        const response = await this.$props.request({name, page})
        if (response.status === RESPONSE_STATUS.OK) {
          this.options = response.data.results
          this.count = response.data.count
          this.page = page
        } else {
          this.options = []
          this.count = 0
          this.page = 1
        }
      },
      async search(name, done) {
        // make a request to the pass in api and refresh the options
        await this.getOptions(1)
        done(this.options.map(item => {
          return {
            value: item.id || item.pk,
            label: item[this.$props.field]
          }
        }))
      },
      selected(item) {
        this.label = item.label
        this.$emit('input', item.value)
      }
    },
    watch: {
      async page(val, oldVal) {
        if (val !== oldVal) {
          await this.getOptions(val)
        }
      },
      async more(val, oldVal) {
        if (val) {
          await this.getOptions(1)
        }
      }
    }
  }
</script>

<template>
  <q-field :error="error" :error-label="errorLabel" :helper="helper">
    <q-input
      :value="label" :float-label="floatLabel" :inverted="inverted"
      @input="inputHandler($event)" @blur="blurHandler" :color="color"
      :after="[{ icon: 'more_horiz', more: false, handler: moreToggler }]"
    >
      <q-autocomplete @search="search" :min-characters="1" @selected="selected" :debounce="800"/>
      <q-modal highlight v-model="more" :content-css="{minWidth: '40vw', minHeight: '80vh'}">
        <q-modal-layout>
          <q-toolbar slot="header">
            <q-btn flat small round @click="moreToggler" icon="keyboard_arrow_left"/>
            <div class="q-toolbar-title">{{ floatLabel }} List</div>
          </q-toolbar>
          <div class="layout-padding row justify-center">
            <q-list class="col-12" separator highlight no-border>
              <q-item
                class="cursor-pointer" v-for="option in options"
                :key="option.id" @click="selectHandler(option)"
              >
                <q-item-main>
                  <q-item-tile label>{{ option.name }}</q-item-tile>
                </q-item-main>
              </q-item>
            </q-list>
            <q-pagination v-model="page" :max="maxPage"/>
          </div>
        </q-modal-layout>
      </q-modal>
    </q-input>
  </q-field>
</template>

<script>
  import {DEFAULT_PAGE_SIZE} from 'src/settings'

  export default {
    name: 'foreign-key',
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
      error: {type: Boolean, required: true, default: false},
      errorLabel: {type: String, required: false},
      helper: {type: String, required: true},
      floatLabel: {type: String, required: true},
      request: {type: Function, required: true},
      field: {type: String, required: true},
      value: {type: Number},
      color: {type: String},
      inverted: {type: Boolean, default: false}
    },
    computed: {
      maxPage() {
        return Math.ceil(this.count / DEFAULT_PAGE_SIZE)
      }
    },
    methods: {
      inputHandler($event) {
        // handle the input event,pass the key value to the parent model
        this.label = $event;
        const option = this.options.find(option => option.label === $event);
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
        this.label = option.name;
        this.$emit('input', option.id);
        this.moreToggler()
      },
      async getOptions({name, page}) {
        const response = await this.$props.request({name, page});
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.options = response.data.results;
          this.count = response.data.count;
          this.page = page
        } else {
          this.options = [];
          this.count = 0;
          this.page = 1
        }
      },
      async search(name, done) {
        // make a request to the pass in api and refresh the options
        await this.getOptions({name, page: 1});
        done(this.options.map(item => {
          return {
            value: item.id || item.pk,
            label: item[this.$props.field]
          }
        }))
      },
      selected(item) {
        this.label = item.label;
        this.$emit('input', item.value)
      }
    },
    watch: {
      async page(val, oldVal) {
        if (val !== oldVal) {
          await this.getOptions({page: val})
        }
      },
      async more(val) {
        if (val) {
          this.page = 1;
          this.count = 0;
          await this.getOptions({page: 1})
        }
      }
    }
  }
</script>

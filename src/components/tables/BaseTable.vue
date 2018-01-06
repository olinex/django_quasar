<template>
  <div class="row">
    <div class="row">
      <q-btn v-if="create" icon="create" color="primary" @click="$router.push({name:create})">
        <i>create</i>
      </q-btn>
    </div>
    <div class="row justify-end">
      <q-data-table
        class="col-12"
        ref="table"
        :data="data"
        :config="config"
        :columns="columns"
        @refresh="refreshHandler"
        @selection="selectHandler"
        @rowclick="rowclickHandler"
      >
        <template slot="selection" scope="selection">
          <q-btn small flat round icon="picture_as_pdf" color="primary"
                 @click="printPDF(selection)">
            <i>PDF</i>
          </q-btn>
          <q-btn v-if="confirm" small flat icon="done" color="primary"
                 @click="actionHandler({action: 'confirm', rows:selection.rows})">
            <i>confirm</i>
          </q-btn>
          <q-btn v-if="active" small flat icon="lock_open" color="primary"
                 @click="actionHandler({action: 'active', rows:selection.rows})">
            <i>active</i>
          </q-btn>
          <q-btn v-if="lock" small flat icon="lock" color="warning"
                 @click="actionHandler({action: 'lock', rows:selection.rows})">
            <i>lock</i>
          </q-btn>
          <q-btn v-if="cancel" small flat icon="cancel" color="negative"
                 @click="actionHandler({action: 'cancel', rows:selection.rows})">
            <i>cancel</i>
          </q-btn>
          <q-btn v-if="remove" small flat icon="delete" color="negative"
                 @click="actionHandler({action: 'delete', rows:selection.rows})">
            <i>remove</i>
          </q-btn>
          <q-btn v-if="audit" small flat icon="assignment" color="warning"
                 @click="actionHandler({action: 'audit', rows:selection.rows})">
            <i>audit</i>
          </q-btn>
          <q-btn v-if="allow" small flat icon="assignment_turned_in" color="primary"
                 @click="actionHandler({action: 'allow', rows:selection.rows})">
            <i>allow</i>
          </q-btn>
          <q-btn v-if="reject" small flat icon="assignment_return" color="negative"
                 @click="actionHandler({action: 'reject', rows:selection.rows})">
            <i>reject</i>
          </q-btn>
        </template>
      </q-data-table>
      <q-select
        v-model="pageSize"
        :options="[
        {label: '10', value: 10},
        {label: '30', value: 30},
        {label: '50', value: 50},
        {label: '100', value: 100},
      ]"
      ></q-select>
      <q-pagination v-model="page" :max="maxPage"></q-pagination>
    </div>

  </div>
</template>

<script>
  import {Loading, Toast} from 'quasar'
  import {RESPONSE_STATUS} from "src/settings"
  import {listRequestCreater, corsRequest} from "src/utils/request"

  export default {
    name: 'base-table',
    props: {
      title: {type: String, required: true},
      create: {type: String, required: false},
      columns: {type: Array, required: true},
      url: {type: String, required: true},
      detail: {type: Function, required: false},
      confirm: {type: Boolean, required: false},
      lock: {type: Boolean, required: false},
      active: {type: Boolean, required: false},
      cancel: {type: Boolean, required: false},
      remove: {type: Boolean, required: false},
      audit: {type: Boolean, required: false},
      reject: {type: Boolean, required: false},
      allow: {type: Boolean, required: false}
    },
    async mounted() {
      await this.getData()
    },
    data() {
      return {
        loading: false, page: 1, count: 0, pageSize: 10,
        config: {
          rowHeight: '50px',
          title: this.$props.title,
          refresh: true,
          columnPicker: true,
          selection: 'multiple',
          messages: {
            noData: '<i>warning !</i> No data available to show.',
            noDataAfterFiltering: '<i>warning !</i> No results. Please refine your search terms.'
          },
          labels: {
            columns: 'columns',
            allCols: 'allCols',
            rows: 'rows',
            selected: {
              singular: 'item selected.',
              plural: 'items selected.'
            },
            clear: 'clear',
            search: 'search',
            all: 'all'
          }
        },
        data: []
      }
    },
    computed: {
      maxPage() {
        return Math.ceil(this.count / this.pageSize)
      }
    },
    methods: {
      async getData({field, terms, page, pageSize, direct, ordering} = {}) {
        Loading.show()
        const table = this.$refs.table
        const request = listRequestCreater(this.$props.url)
        const response = await request({
          field: field || table.filtering.field,
          terms: terms || table.filtering.terms,
          page: page || table.pagination.page,
          pageSize: pageSize || table.pagination.rowsPerPage,
          direct: direct || table.sorting.dir,
          ordering: ordering || table.sorting.field
        })
        if (response.status === RESPONSE_STATUS.OK) {
          this.data = response.data.results
          this.count = response.data.count
        } else {
          this.data = []
          this.count = 0
        }
        Loading.hide()
      },
      async refreshHandler(done) {
        await this.getData({})
        done()
      },
      selectHandler(count) {
        console.log(count)
      },
      rowclickHandler(row) {
        this.$router.push({name: this.$props.detail, params: {id: row.id}})
      },
      printPDF({rows}) {
        console.log(this.$refs.table)
        const rowIds = rows.map(row => row.id)
      },
      async actionHandler({action, rows}) {
        const url = `${this.$props.url}${action}/`
        const response = await corsRequest({
          url,
          options: {
            method: 'PATCH',
            data: {ids: rows.map(row => row.data.id)}
          }
        })
        if (response.status === RESPONSE_STATUS.OK) {
          await this.getData({})
          Toast.create.positive(response.data.detail)
        } else {
          Toast.create.negative(response.data.detail)
        }
      }
    },
    watch: {
      async page(val) {
        await this.getData({page: val})
      },
      async pageSize(val) {
        await this.getData({pageSize: val})
      }
    }
  }
</script>


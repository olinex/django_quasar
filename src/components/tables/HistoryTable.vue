<template>
  <div class="row">
    <div class="row" style="margin: 10px;">
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
        :columns="formatColumns"
        @refresh="refreshHandler"
        @selection="selectHandler"
        @rowclick="rowclickHandler"
      >
        <slot/>
        <template slot="selection" scope="selection">
          <q-btn small flat round icon="picture_as_pdf" color="primary"
                 @click="printPDF(selection)">
            <i>PDF</i>
          </q-btn>
          <q-btn v-if="remove"
                 small flat icon="delete" color="negative"
                 @click="actionHandler({action: 'delete', rows:selection.rows})">
            <i>remove</i>
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
      />
      <q-pagination v-model="page" :max="maxPage"/>
    </div>
    <q-inner-loading :visible="loading">
      <q-spinner-oval size="50px" color="primary"/>
    </q-inner-loading>
  </div>
</template>

<script>
  import {Toast, date} from "quasar";
  import {listRequestCreater, corsRequest} from "src/utils/request";
  import {
    dateFormat, datetimeFormat, timeFormat,
    toNowFormat, listFormat, dictFormat, booleanFormat
  } from "src/utils/format";

  export default {
    name: "history-table",
    props: {
      title: {type: String, required: true},
      create: {type: String, required: false},
      columns: {type: Array, required: true},
      url: {type: String, required: true},
      detail: {type: Function, required: false},
      remove: {type: Boolean, required: false},
    },
    async mounted() {
      await this.getData()
    },
    data() {
      return {
        loading: false, page: 1, count: 0, pageSize: 10,
        config: {
          rowHeight: "50px",
          title: this.$props.title,
          refresh: true,
          columnPicker: true,
          selection: "multiple",
          messages: {
            noData: "<i>warning !</i> No data available to show.",
            noDataAfterFiltering: "<i>warning !</i> No results. Please refine your search terms."
          },
          labels: {
            columns: "columns",
            allCols: "allCols",
            rows: "rows",
            selected: {
              singular: "item selected.",
              plural: "items selected."
            },
            clear: "clear",
            search: "search",
            all: "all"
          }
        },
        data: []
      }
    },
    computed: {
      maxPage() {
        return Math.ceil(this.count / this.pageSize)
      },
      formatColumns() {
        const columns = [];
        for (let column of this.$props.columns) {
          switch (column.type) {
            case "boolean":
              columns.push({...column,format:booleanFormat});
              break;
            case "datetime":
              columns.push({...column,format:datetimeFormat,type:"string"});
              break;
            case "date":
              columns.push({...column,format:dateFormat,type:"string"});
              break;
            case "time":
              columns.push({...column,format:timeFormat,type:"string"});
              break;
            case "tonow":
              columns.push({...column,format:toNowFormat,type:"string"});
              break;
            case "list":
              columns.push({...column,format:listFormat,type:"string"});
              break;
            case "dict":
              columns.push({...column,format:dictFormat,type:"string"});
              break;
            default:
              columns.push(column)
          }
        }
        return columns
      }
    },
    methods: {
      async getData({field, terms, page, pageSize, direct, ordering} = {}) {
        this.loading = true;
        const table = this.$refs.table;
        const request = listRequestCreater(this.$props.url);
        const response = await request({
          field: field || table.filtering.field,
          terms: terms || table.filtering.terms,
          page: page || table.pagination.page,
          pageSize: pageSize || table.pagination.rowsPerPage,
          direct: direct || table.sorting.dir,
          ordering: ordering || table.sorting.field
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.data = response.data.results;
          this.count = response.data.count
        } else {
          this.data = [];
          this.count = 0
        }
        this.loading = false;
      },
      async refreshHandler(done) {
        await this.getData({});
        done()
      },
      selectHandler(count) {
      },
      rowclickHandler(row) {
        if (this.$props.detail) {
          this.$router.push({name: this.$props.detail, params: {id: row.id}})
        }
      },
      printPDF({rows}) {
        const rowIds = rows.map(row => row.id)
      },
      async actionHandler({action, rows}) {
        const url = `${this.$props.url}${action}/`;
        const response = await corsRequest({
          url,
          options: {
            method: "PATCH",
            data: {ids: rows.map(row => row.data.id)}
          }
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          await this.getData({});
          Toast.create.positive(response.data.detail)
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


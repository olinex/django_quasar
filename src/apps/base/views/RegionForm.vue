<template>
  <div>
    <q-card>
      <q-card-title class="text-black">
        {{name}}
        <span slot="subtitle">{{id}}</span>
        <div slot="right">
          <states-breadcrumb
            :current="is_draft ? 'draft':'confirmed'"
            :states="['draft','confirmed']"
          />
        </div>
      </q-card-title>
      <q-card-main>
        <button-group
          :id="id" :url="url" @action="getData()"
          :is-active="is_active" :is-draft="is_draft"
        >
          <q-btn icon="save" color="primary" :disable="$v.$invalid" @click="update">
            <i>update</i>
          </q-btn>
        </button-group>
        <div class="row">
          <!-- country -->
          <country
            class="col-6"
            v-model="city__province__country"
            helper="the country of the region"
          />

          <!-- province -->
          <province
            ref="province"
            class="col-6" v-model="city__province"
            helper="the province of the region"
            :country="city__province__country"
          />

          <!-- city -->
          <city
            ref="city"
            class="col-6" v-model="city"
            helper="the city of the region"
            :province="city__province"
          />

          <!-- name -->
          <q-field
            class="col-6" :error="$v.name.$invalid"
            :error-label="name_err"
            helper="required"
          >
            <q-input
              float-label="name" clearable
              v-model="name" @blur="$v.name.$touch"
            />
          </q-field>

          <!-- sequence -->
          <q-field
            class="col-6" :error="$v.sequence.$invalid"
            :error-label="sequence_err"
            helper="required"
          >
            <q-input
              type="number"
              float-label="sequence" clearable
              v-model="sequence" @blur="$v.sequence.$touch"
            />
          </q-field>
          <q-field class="col-3" helper="readonly">
            <q-datetime
              float-label="create time"
              v-model="create_time" readonly type="datetime"
            />
          </q-field>
          <q-field class="col-3" helper="readonly">
            <q-datetime
              float-label="last modify time"
              v-model="last_modify_time" readonly type="datetime"
            />
          </q-field>
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import {Toast} from 'quasar'
  import {http} from "../urls/region"
  import {detailRequest,updateRequest} from "../services/region"
  import {required,numeric,minValue} from 'vuelidate/lib/validators'
  import {mapErrorMessage} from 'src/utils/error-messages'
  import Country from "../components/fields/Country"
  import Province from "../components/fields/Province"
  import City from "../components/fields/City"

  export default {
    components: {Country,Province,City},
    props: {
      id: {type: Number, required: true}
    },
    async mounted() {
      await this.getData()
    },
    data() {
      return {
        name: '',
        city: 0,
        city__name: '',
        city__province: 0,
        city__province__country: '',
        city__province__name: '',
        is_draft: true,
        is_active: true,
        sequence: 0,
        create_time: '',
        last_modify_time: ''
      }
    },
    validations: {
      name: {required},
      sequence: {required,numeric,minValue:minValue(0)}
    },
    computed: {
      ...mapErrorMessage([
        'name','sequence'
      ]),
      url() {
        return http.LIST_URL()
      }
    },
    methods: {
      refresh(data) {
        this.create_time = data.create_time;
        this.last_modify_time = data.last_modify_time;
        this.is_draft = data.is_draft;
        this.is_active = data.is_active;
        this.city = data.city;
        this.city__name = data.city__name;
        this.city__province = data.city__province;
        this.city__province__country = data.city__province__country;
        this.city__province__name = data.city__province__name;
        this.name = data.name;
        this.sequence = data.sequence;
        this.$refs.province.selected({
          value: this.city__province,
          label: this.city__province__name
        });
        this.$refs.city.selected({
          value: this.city,
          label: this.city__name
        })
      },
      async getData() {
        const response = await detailRequest(this.$props.id);
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.refresh(response.data)
        } else {
          Toast.create.negative(response.data.detail)
        }
      },
      async update() {
        const response = await updateRequest({
          id: this.$props.id,
          name: this.name,
          province: this.province,
          sequence: this.sequence
        });
        if (response.status === this.$settings.RESPONSE_STATUS.OK) {
          this.refresh(response.data);
          Toast.create.positive("update successfully")
        } else {
          Toast.create.negative(response.data.detail)
        }
      }
    }
  }
</script>

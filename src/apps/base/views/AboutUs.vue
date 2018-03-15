<template>
  <div class="row justify-left">
    <q-card v-for="member in members" inline class="col-6">
      <q-card-media v-if="member.img">
        <img :src="member.img" style="width: 300px">
      </q-card-media>
      <q-card-title>
        {{member.name}}
        <span slot="subtitle">{{member.role}}</span>
      </q-card-title>
      <q-card-main>
        <p class="text-faded">{{member.detail}}</p>
      </q-card-main>
      <q-card-separator/>
      <q-card-actions align="around">
        <a :href="`mailto:${member.email}`" target="_blank">
          <q-btn color="primary" flat round small icon="email"/>
        </a>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        members: [
          {
            name: "Olinex", role: "creater",
            email: "joshua.olin@163.com",
            detail: "The creater of the django erp"
          },
        ]
      }
    }
  }
</script>


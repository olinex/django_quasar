<template>
  <q-layout ref="layout" view="lhh Lpr lff">
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu"></q-icon>
      </q-btn>
      <q-toolbar-title>
        django quasar
      </q-toolbar-title>
    </q-toolbar>

    <q-tabs slot="navigation">
      <q-route-tab slot="title" icon="error" to="/401" replace hide="icon" label="401" />
      <q-route-tab slot="title" icon="error" to="/404" replace hide="icon" label="404" />
    </q-tabs>

    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>Essential Links</q-list-header>
        <q-item>
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item>
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item>
          <q-item-side icon="chat" />
          <q-item-main label="Gitter Channel" sublabel="Quasar Lobby" />
        </q-item>
        <q-item>
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </div>

    <router-view/>
  </q-layout>
</template>

<script>
  import {
    QLayout,QToolbar,QToolbarTitle,QBtn,QIcon,QTabs,QRouteTab,QList,QListHeader,QItem,
    QItemSide, QItemMain
  } from 'quasar'
  export default {
    components:{
      QLayout,QToolbar,QToolbarTitle,QBtn,QIcon,QTabs,QRouteTab,QList,QListHeader,QItem,
      QItemSide,QItemMain
    },
    data() {
      return {}
    }
  }
</script>

<style>
</style>

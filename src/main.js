// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import {ForeignKey} from './components/fields'
import Quasar, {
  QLayout, QToolbar, QToolbarTitle, QSideLink,
  QList, QListHeader, QItem, QItemMain, QItemSide,
  QCard, QCardTitle, QCardSeparator, QCardMain, QCardActions,
  QField, QInput, QCollapsible, QAutocomplete, QSearch,
  QModal, QModalLayout,
  QTabs, QRouteTab, QTab, QTabPane,
  QFab, QFabAction,
  QPagination, QAjaxBar, QBtn, QIcon, QFixedPosition,
  QChatMessage,
  QScrollArea
} from 'quasar'
import router from './router'
import store from './stores'
import hasPerm from './utils/has-perm'
import {DEBUG} from "./settings";

Vue.config.productionTip = DEBUG

Vue.use(Vuelidate)
Vue.use(Quasar, {
  components: {
    QLayout, QToolbar, QToolbarTitle, QSideLink,
    QList, QListHeader, QItem, QItemMain, QItemSide,
    QCard, QCardTitle, QCardSeparator, QCardMain, QCardActions,
    QField, QInput, QCollapsible, QAutocomplete, QSearch,
    QModal, QModalLayout,
    QTabs, QRouteTab, QTab, QTabPane,
    QFab, QFabAction,
    QPagination, QAjaxBar, QBtn, QIcon, QFixedPosition,
    QChatMessage,
    QScrollArea
  }
}) // Install Quasar Framework

Vue.component(ForeignKey.name,ForeignKey)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App').default)
  })
})

// check all the permission of ther route
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta && hasPerm(route.meta.right, store.state.user.permissions))) {
    next()
  } else {
    next({
      name: 'Error401',
    })
  }
})

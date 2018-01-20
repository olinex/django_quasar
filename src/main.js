// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`);
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import {ForeignKey,ManyToManyField} from './components/fields'
import {BaseTable} from './components/tables'
import {ButtonGroup} from './components/forms'
import {StatesBreadcrumb} from './components/breadcrumbs'
import {MessageCollapsible} from './components/collapsible'
import Quasar, {
  QLayout, QToolbar, QToolbarTitle, QSideLink,
  QList, QListHeader, QItem, QItemMain, QItemSide, QItemTile,
  QCard, QCardTitle, QCardSeparator, QCardMain, QCardActions, QCardMedia,
  QField, QInput, QCollapsible, QAutocomplete, QSearch, QSelect, QToggle, QDatetime,
  QModal, QModalLayout,
  QTabs, QRouteTab, QTab, QTabPane,
  QFab, QFabAction,
  QPagination, QAjaxBar, QBtn, QIcon, QFixedPosition, QPopover, QTooltip,
  QChatMessage, QChip, QUploader,
  QScrollArea,
  QDataTable,
  QStepper, QStep,
  QDialogSelect,
  QSpinner
} from 'quasar'
import router from './router'
import store from './stores'
import hasPerm from './utils/has-perm'
import SETTINGS from "./settings"

Vue.config.productionTip = SETTINGS.DEBUG;
Vue.prototype.$settings = SETTINGS;

Vue.use(Vuelidate);
Vue.use(Quasar); // Install Quasar Framework

Vue.component(ForeignKey.name,ForeignKey);
Vue.component(ManyToManyField.name,ManyToManyField);
Vue.component(BaseTable.name,BaseTable);
Vue.component(StatesBreadcrumb.name,StatesBreadcrumb);
Vue.component(ButtonGroup.name,ButtonGroup);
Vue.component(MessageCollapsible.name,MessageCollapsible);

Vue.component(QInput.name,QInput);
Vue.component(QLayout.name,QLayout);
Vue.component(QToolbar.name,QToolbar);
Vue.component(QToolbarTitle.name,QToolbarTitle);
Vue.component(QSideLink.name,QSideLink);
Vue.component(QList.name,QList);
Vue.component(QListHeader.name,QListHeader);
Vue.component(QItem.name,QItem);
Vue.component(QItemMain.name,QItemMain);
Vue.component(QItemSide.name,QItemSide);
Vue.component(QItemTile.name,QItemTile);
Vue.component(QCard.name,QCard);
Vue.component(QCardTitle.name,QCardTitle);
Vue.component(QCardSeparator.name,QCardSeparator);
Vue.component(QCardMain.name,QCardMain);
Vue.component(QCardActions.name,QCardActions);
Vue.component(QCardMedia.name,QCardMedia);
Vue.component(QField.name,QField);
Vue.component(QInput.name,QInput);
Vue.component(QCollapsible.name,QCollapsible);
Vue.component(QAutocomplete.name,QAutocomplete);
Vue.component(QSearch.name,QSearch);
Vue.component(QSelect.name,QSelect);
Vue.component(QToggle.name,QToggle);
Vue.component(QDatetime.name,QDatetime);
Vue.component(QModal.name,QModal);
Vue.component(QModalLayout.name,QModalLayout);
Vue.component(QTabs.name,QTabs);
Vue.component(QRouteTab.name,QRouteTab);
Vue.component(QTab.name,QTab);
Vue.component(QTabPane.name,QTabPane);
Vue.component(QFab.name,QFab);
Vue.component(QFabAction.name,QFabAction);
Vue.component(QPagination.name,QPagination);
Vue.component(QAjaxBar.name,QAjaxBar);
Vue.component(QBtn.name,QBtn);
Vue.component(QIcon.name,QIcon);
Vue.component(QFixedPosition.name,QFixedPosition);
Vue.component(QPopover.name,QPopover);
Vue.component(QTooltip.name,QTooltip);
Vue.component(QChatMessage.name,QChatMessage);
Vue.component(QChip.name,QChip);
Vue.component(QUploader.name,QUploader);
Vue.component(QScrollArea.name,QScrollArea);
Vue.component(QDataTable.name,QDataTable);
Vue.component(QStepper.name,QStepper);
Vue.component(QStep.name,QStep);
Vue.component(QDialogSelect.name,QDialogSelect);
Vue.component(QSpinner.name,QSpinner);


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
});

function getPermissions() {
  return store.state.user.permissions
}

Vue.directive('perm',{
  update: function (el,binding) {
    if (!hasPerm(binding.value, getPermissions())) {
      el.classList.add('hidden')
    } else {
      el.classList.remove('hidden')
    }
  }
});

function title(verboseName) {
  if (verboseName) {
    return `${verboseName}-${SETTINGS.PROJECT_NAME}`
  }
  return SETTINGS.PROJECT_NAME
}

// check all the permission of ther route
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta && hasPerm(route.meta.right, getPermissions()))) {
    store.commit('history/addRoute',to);
    document.title = title(to.meta.verboseName);
    next()
  } else {
    document.title = title('401');
    next({name: 'Error401'})
  }
});

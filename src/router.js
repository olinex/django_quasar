import Vue from 'vue'
import VueRouter from 'vue-router'
import {MAIN_NAME, MAIN_PATH, HOME_NAME, HOME_PATH} from './settings'
import load from 'src/utils/route-loader'
import baseRoutes from 'src/apps/base/routes'

Vue.use(VueRouter)

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({y: 0}),

  routes: [
    {
      name: MAIN_NAME,
      path: MAIN_PATH,
      component: load('components/Main'),
      meta: {right: 'all'},
      redirect: {name:HOME_NAME},
      children: [
        baseRoutes,
      ],
    },
    {name: HOME_NAME, path: HOME_PATH, component: load('components/Main'), meta: {right:'all'}},
    {name: 'login', path: '/login', component: load('apps/base/views/login'), meta: {right: 'all'}},
    {name: '401', path: '/401', component: load('components/Error401'), meta: {right: 'all'}},
    {name: '404', path: '*', component: load('components/Error404'), meta: {right: 'all'}}
  ]
})

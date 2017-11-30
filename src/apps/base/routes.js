import load from 'src/utils/route-loader'
import Content from './views/Content.vue'

export default {
  name: 'base',
  path: '/base',
  component: Content,
  meta: {right: 'all'},
  children: [
    {name: 'base:UserEdit', path: 'user', component: load('apps/base/views/UserEdit'), meta: {right: 'all'}},
  ]
}

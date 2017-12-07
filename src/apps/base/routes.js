import load from 'src/utils/route-loader'

export default {
  name: 'base:Base',
  path: '/base',
  component: load('apps/base/views/Base'),
  meta: {
    right: 'all',
    link: true,
    verboseName: 'base'
  },
  children: [
    {
      name: 'base:UserEdit',
      path: 'user',
      component: load('apps/base/views/UserEdit'),
      meta: {
        right: 'all',
        link: true,
        verboseName: 'user edit'
      }
    },
  ]
}

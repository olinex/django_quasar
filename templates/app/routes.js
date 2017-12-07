import load from 'src/utils/route-loader'

export default {
  name: 'demo:Base',
  path: '/base',
  component: load('apps/base/views/Base'),
  meta: {
    right: 'all',
    link: true,
    verboseName: 'base'
  },
  children: [

  ]
}

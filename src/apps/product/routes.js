import load from 'src/utils/route-loader'

export default {
  name: 'product:Base',
  path: '/product',
  component: load('apps/product/views/Base'),
  meta: {right: 'all', link: true, verboseName: 'base'},
  redirect: {name: 'product:AttributeList'},
  children: [
    {
      name: 'product:AttributeList',
      path: 'attribute',
      component: load('apps/product/views/AttributeList'),
      meta: {right: 'all', link: true, verboseName: 'attribute list'},
    },
    {
      name: 'product:AttributeCreate',
      path: 'attribute/create',
      component: load('apps/product/views/AttributeCreate'),
      meta: {right: 'all', link: true, verboseName: 'attribute create'},
    },
    {
      name: 'product:AttributeForm',
      path: 'attribute/:id',
      props: true,
      component: load('apps/product/views/AttributeForm'),
      meta: {right: 'all', link: true, verboseName:'attribute form'},
    },
  ]
}

import {viewRoute, routeName} from "./apps";

export default [
  viewRoute({
    name: 'Base',
    path: '/product',
    meta: {right: 'all', link: true, verboseName: 'base'},
    redirect: {name: routeName('AttributeList')},
    children: [
      // attribute
      viewRoute({
        name: 'AttributeList', path: 'attribute',
        meta: {right: 'all', link: true, verboseName: 'attribute list'},
      }),
      viewRoute({
        name: 'AttributeCreate', path: 'attribute/create',
        meta: {right: 'all', link: true, verboseName: 'attribute create'},
      }),
      viewRoute({
        name: 'AttributeForm', path: 'attribute/:id', props: true,
        meta: {right: 'all', link: true, verboseName: 'attribute form'},
      }),
    ]
  })
]

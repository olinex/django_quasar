import {viewRoute, routeName} from "./apps";

export default [
  viewRoute({
    name: 'Base',
    path: '/product',
    meta: {right: 'all', link: true, verboseName: 'base'},
    redirect: {name: routeName('AttributeList')},
    children: [

    ]
  })
]

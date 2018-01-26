import {viewRoute, routeName} from "./apps";

export default [
  viewRoute({
    name: 'Base', path: '/base',
    meta: {right: 'all', link: false, verboseName: 'base'},
    redirect: {name: routeName('ProvinceList')},
    children: [
      // province
      viewRoute({
        name: 'ProvinceList', path: 'province',
        meta: {right: 'all', link: true, verboseName: 'province list'},
      }),
      viewRoute({
        name: 'ProvinceCreate', path: 'province/create',
        meta: {right: 'all', link: true, verboseName: 'province create'},
      }),
      viewRoute({
        name: 'ProvinceForm', path: 'province/:id', props: true,
        meta: {right: 'all', link: true, verboseName: 'province form'},
      }),

      // city
      viewRoute({
        name: 'CityList', path: 'city',
        meta: {right: 'all', link: true, verboseName: 'city list'},
      }),
      viewRoute({
        name: 'CityCreate', path: 'city/create',
        meta: {right: 'all', link: true, verboseName: 'city create'},
      }),
      viewRoute({
        name: 'CityForm', path: 'city/:id', props: true,
        meta: {right: 'all', link: true, verboseName: 'city form'},
      }),

      // region
      viewRoute({
        name: 'RegionList', path: 'region',
        meta: {right: 'all', link: true, verboseName: 'region list'},
      }),
      viewRoute({
        name: 'RegionCreate', path: 'region/create',
        meta: {right: 'all', link: true, verboseName: 'region create'},
      }),
      viewRoute({
        name: 'RegionForm', path: 'region/:id', props: true,
        meta: {right: 'all', link: true, verboseName: 'region form'},
      }),

      // argument
      viewRoute({
        name: 'ArgumentList', path: 'argument',
        meta: {right: 'all', link: true, verboseName: 'argument list'},
      }),
      viewRoute({
        name: 'ArgumentForm', path: 'argument/:id', props: true,
        meta: {right: 'all', link: true, verboseName: 'argument form'},
      }),

      // group
      viewRoute({
        name: 'GroupList', path: 'group',
        meta: {right: 'all', link: true, verboseName: 'group list'},
      }),
      viewRoute({
        name: 'GroupCreate', path: 'group/create',
        meta: {right: 'all', link: true, verboseName: 'group create'},
      }),
      viewRoute({
        name: 'GroupForm', path: 'group/:id', props: true,
        meta: {right: 'all', link: true, verboseName: 'group form'},
      }),

      // permission
      viewRoute({
        name: 'PermissionList', path: 'permission',
        meta: {right: 'all', link: true, verboseName: 'permission list'},
      }),

      // content type
      viewRoute({
        name: 'ContentTypeList', path: 'content-type',
        meta: {right: 'all', link: true, verboseName: 'content type list'},
      }),
    ]
  }),
  // user
  viewRoute({
    name: 'UserEdit', path: 'user',
    meta: {right: 'all', link: true, verboseName: 'user edit'},
  }),

  // message
  viewRoute({
    name: 'MessageList', path: 'message',
    meta: {right: 'all', link: true, verboseName: 'message list'},
  }),
]

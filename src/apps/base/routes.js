import load from 'src/utils/route-loader'

export default {
  name: 'base:Base',
  path: '/base',
  component: load('apps/base/views/Base'),
  meta: {right: 'all', link: true, verboseName: 'base'},
  redirect: {name: 'base:ProvinceList'},
  children: [
    // province
    {
      name: 'base:ProvinceList',
      path: 'province',
      component: load('apps/base/views/ProvinceList'),
      meta: {right: 'all', link: true, verboseName: 'province list'},
    },
    {
      name: 'base:ProvinceCreate',
      path: 'province/create',
      component: load('apps/base/views/ProvinceCreate'),
      meta: {rgiht: 'all', link: true, verboseName: 'province create'}
    },
    {
      name: 'base:ProvinceForm',
      path: 'province/:id',
      props: true,
      component: load('apps/base/views/ProvinceForm'),
      meta: {right: 'all', link: true, verboseName:'province form'},
    },
    // city
    {
      name: 'base:CityList',
      path: 'city',
      component: load('apps/base/views/CityList'),
      meta: {right: 'all', link: true, verboseName: 'city list'},
    },
    {
      name: 'base:CityCreate',
      path: 'city/create',
      component: load('apps/base/views/CityCreate'),
      meta: {rgiht: 'all', link: true, verboseName: 'city create'}
    },
    {
      name: 'base:CityForm',
      path: 'city/:id',
      props: true,
      component: load('apps/base/views/CityForm'),
      meta: {right: 'all', link: true, verboseName:'city form'},
    },
    // region
    {
      name: 'base:RegionList',
      path: 'region',
      component: load('apps/base/views/RegionList'),
      meta: {right: 'all', link: true, verboseName: 'region list'},
    },
    {
      name: 'base:RegionCreate',
      path: 'region/create',
      component: load('apps/base/views/RegionCreate'),
      meta: {rgiht: 'all', link: true, verboseName: 'region create'}
    },
    {
      name: 'base:RegionForm',
      path: 'region/:id',
      props: true,
      component: load('apps/base/views/RegionForm'),
      meta: {right: 'all', link: true, verboseName:'region form'},
    },
    // argument
    {
      name: 'base:ArgumentList',
      path: 'argument',
      component: load('apps/base/views/ArgumentList'),
      meta: {right: 'all', link: true, verboseName: 'argument list'},
    },
    {
      name: 'base:ArgumentForm',
      path: 'argument/:id',
      props: true,
      component: load('apps/base/views/ArgumentForm'),
      meta: {right: 'all', link: true, verboseName:'argument form'},
    },
    // group
    {
      name: 'base:GroupList',
      path: 'group',
      component: load('apps/base/views/GroupList'),
      meta: {right: 'all', link: true, verboseName: 'group list'},
    },
    {
      name: 'base:GroupCreate',
      path: 'group/create',
      component: load('apps/base/views/GroupCreate'),
      meta: {rgiht: 'all', link: true, verboseName: 'group create'}
    },
    {
      name: 'base:GroupForm',
      path: 'group/:id',
      props: true,
      component: load('apps/base/views/GroupForm'),
      meta: {right: 'all', link: true, verboseName:'group form'},
    },
    {
      name: 'base:UserEdit',
      path: 'user',
      component: load('apps/base/views/UserEdit'),
      meta: {right: 'all', link: true, verboseName: 'user edit'}
    },
  ]
}

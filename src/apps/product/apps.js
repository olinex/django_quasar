import load from "src/utils/route-loader";

const appName = 'product';

function routeName(name) {
  return `${appName}:${name}`
}

function view(name) {
  return load(`apps/${appName}/views/${name}`)
}

function viewRoute({name, path, meta, props, redirect, children}) {
  return {
    name: routeName(name),
    component: view(name),
    path, meta, props, redirect, children
  }
}

export {
  appName,
  routeName,
  view,
  viewRoute
}

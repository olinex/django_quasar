import rights from '../permissions'

export default function hasPerm(right,permissions) {
  // if strict is true,the server permissions must contain all of the permissions in config in the permission
  if (right === 'all' || permissions.includes('__all__')) {
    return true
  }
  if (!rights[right]) {
    return false
  }
  if (rights[right].strict) {
    if (rights[right].permissions.length > 0) {
      return rights[right].permissions.every(perm => (permissions.includes(perm)))
    }
    return false
  } else {
    if (rights[right].permissions.length > 0) {
      return rights[right].permissions.some(perm => (permissions.includes(perm)))
    }
    return true
  }
}

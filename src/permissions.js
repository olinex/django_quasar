// right is the permission of the browser
export default {
  test: {
    detail: "permission for any authenticated user",
    strict: false,
    permissions: []
  },
  superuser: {
    detail: "permission for the super user",
    strict: true,
    permissions: []
  }
}

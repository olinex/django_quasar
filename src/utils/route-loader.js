function load (path) {
  // '@' is aliased to src/components
  return () => import(`src/${path}.vue`)
}

export default load

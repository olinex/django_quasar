export default ({object,name}) => {
  const value = [object];
  for (let key of name.split("/")) {
    value[0] = value[0][key]
  }
  return value[0]
}

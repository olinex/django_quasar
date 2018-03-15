export default function (options) {
  return function (value) {
    for (let option of options) {
      if (option.value === value) {
        return option.label
      }
    }
    return value
  }
}

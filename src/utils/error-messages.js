import deepGetter from './deep-getter'

const errorMessages = {
  required(field) {
    return `${field} is required`
  },

  minLength(field, min) {
    return `${field}'s length can not less than ${min}`
  },

  maxLength(field, max) {
    return `${field}'s length can not greater than ${max}`
  },

  alpha(field) {
    return `${field} must be alpha string`
  },

  alphaNum(field) {
    return `${field} must be alpha number string`
  },

  numeric(field) {
    return `${field} must be number`
  },

  between(field, min, max) {
    return `${field}'s value must between ${min} and ${max}`
  },

  email(field) {
    return `${field} isn't a valid email`
  },

  ipAddress(field) {
    return `${field} isn't a valid IP address`
  },

  macAddress(field) {
    return `${field} isn't a valid MAC address`
  },

  url(field) {
    return `${field} isn't a valid URL address`
  },
  requiredIf(field) {
    return `${field} is required`
  },
  sameAs(field,eq) {
    return `${field} must same as ${eq}`
  }
}

function getErrorMessage({validator,name}) {
  const valid = deepGetter({object:validator,name})
  const messages = []
  for (let value of Object.values(valid.$params)) {
    if (!valid[value.type]) {
      switch(value.type){
        case 'minLength':
          messages.push(errorMessages[value.type](name,value.min))
              break
        case 'maxLength':
          messages.push(errorMessages[value.type](name,value.max))
              break
        case 'between':
          messages.push(errorMessages[value.type](name,value.min,value.max))
              break
        case 'sameAs':
          messages.push(errorMessages[value.type](name,value.eq))
              break
        default:
          messages.push(errorMessages[value.type](name))
      }
    }
  }
  return messages.join(',')
}

function mapErrorMessage(names) {
  const map = {}
  for (let name of names) {
    map[`${name.split('/').join('__')}_err`] = function () {
      return getErrorMessage({validator:this.$v, name})
    }
  }
  return map
}


export {
  mapErrorMessage,
  getErrorMessage
}

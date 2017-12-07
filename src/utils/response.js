import {Toast,Dialog} from 'quasar'

function getColor(status) {
  switch (status) {
    case 'success':
      return 'positive'
    case 'error':
      return 'negative'
    default:
      return status
  }
}

function getIcon(status) {
  switch (status) {
    case 'success':
      return 'done'
    default:
      return status
  }
}

function createResponse(data) {
  const color = getColor(data.status)
  const icon = getIcon(data.status)
  switch (data.type) {
    case 'response':
      return Toast.create[color]({
        icon: icon,
        html: data.detail,
      })
    case 'notice':
      return Dialog.create({
        title: data.detail,
        message: data.content,
        position: 'right'
      })
  }
}

export {
  createResponse
}


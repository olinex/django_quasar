import {date as format} from "quasar";
import timeago from "timeago.js";

function datetimeFormat(value) {
  let datetime = new Date(value);
  return format.formatDate(datetime, "YYYY-MM-DD HH:mm:ss")
}

function dateFormat(value) {
  let date = new Date(value);
  return format.formatDate(date, "YYYY-MM-DD")
}

function timeFormat(value) {
  let time = new Date(value);
  return format.formatDate(time, "HH:mm:ss")
}

function toNowFormat(value) {
  return timeago().format(new Date(value))
}

function booleanFormat(value) {
    const color = value ? "text-positive" : "text-negative";
    const icon = value ? "check_circle" : "cancel";
    return `<i class="q-icon material-icons ${color}">${icon}</i>`
  }

  function listFormat(value) {
    const warpClass = 'class="col row items-center group q-input-chips"';
    const itemClass = 'class="q-chip row no-wrap inline items-center small text-white bg-primary"';
    const items = value.map(item => `<div ${itemClass}><div class="q-chip-main"> ${item} </div></div>`);
    return `<div ${warpClass}>${items.join("")}</div>`
  }

  function dictFormat(value) {
    return listFormat(Object.entries(value).map(entry => `${entry.key}: ${entry.value}`))
  }

export {
  dateFormat,
  datetimeFormat,
  timeFormat,
  toNowFormat,
  booleanFormat,
  listFormat,
  dictFormat
}


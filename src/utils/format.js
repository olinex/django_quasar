import {date as format} from 'quasar';
import timeago from 'timeago.js';

function datetimeFormat(value) {
  let datetime = new Date(value);
  return format.formatDate(datetime, 'YYYY-MM-DD HH:mm:ss')
}

function dateFormat(value) {
  let date = new Date(value);
  return format.formatDate(date, 'YYYY-MM-DD')
}

function timeFormat(value) {
  let time = new Date(value);
  return format.formatDate(time, 'HH:mm:ss')
}

function toNowFormat(value) {
  return timeago().format(new Date(value))
}

export {
  dateFormat,
  datetimeFormat,
  timeFormat,
  toNowFormat
}


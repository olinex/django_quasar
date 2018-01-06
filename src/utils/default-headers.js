import { Cookies } from 'quasar'
import {XSRFHEADERNAME,XSRFCOOKIENAME} from "src/settings"

export default function () {
  return {
    [XSRFHEADERNAME]: Cookies.get(XSRFCOOKIENAME)
  }
}

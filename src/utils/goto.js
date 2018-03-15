import router from "src/router";
import { format } from "quasar";

export default function ({content_type,object_id}) {
  router.replace({
    name: `${content_type.app_label.split("_")[1]}:${format.capitalize(content_type.model)}Form`,
    params: {id:object_id}
  })
}

/* global $ */
import { ajaxSetup } from './ajax-config'
ajaxSetup()

export default {
    getFromConfig(config) {
        return $.ajax({ data: config })
    }
}

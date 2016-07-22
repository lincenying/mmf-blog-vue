/* global $ */
import store from '../store'

export function ajaxSetup() {
    $.ajaxSetup({
        url: '/api/',
        global: true,
        type: 'POST',
        dataType: 'json',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Basic dGVzdDpwYXNzd2Q='
        }
    })
    $(document).ajaxStart(function() {
        store.dispatch('GLOBAL_PROGRESS', 50)
    })
    $(document).ajaxComplete(function() {
        store.dispatch('GLOBAL_PROGRESS', 100)
    })
}

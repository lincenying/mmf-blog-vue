/* global $ */
import store from '../store'

$.ajaxSetup({
    global: true,
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

export default {
    get(url, data, global = true) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/' + url,
                type: 'get',
                data,
                global
            }).then(data => {
                resolve(data)
            }, error => {
                store.dispatch('GLOBAL_SHOWMSG', {content: error.responseText || error.statusText, type: 'error'})
                reject(error)
            })
        })
    },
    post(url, data, global = true) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/' + url,
                type: 'post',
                data,
                global
            }).then(data => {
                resolve(data)
            }, error => {
                store.dispatch('GLOBAL_SHOWMSG', {content: error.responseText || error.statusText, type: 'error'})
                reject(error)
            })
        })
    }
}

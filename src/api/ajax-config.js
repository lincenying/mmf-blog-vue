/* global $ */
export function ajaxSetup() {
    $.ajaxSetup({
        url: '/api/',
        global: false,
        type: 'POST',
        dataType: 'json',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Basic dGVzdDpwYXNzd2Q='
        }
    })
}

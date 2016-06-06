/* global $ */
export function ajaxSetup() {
    $.ajaxSetup({
        url: '/api.php',
        global: false,
        type: 'POST',
        dataType: 'json',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Basic dGVzdDpwYXNzd2Q='
        }
    })
}

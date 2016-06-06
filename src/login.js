import Vue from 'vue'
import Login from './Login.vue'
import store from './store'

var vm = new Vue({
    el: '#app',
    store,
    components: {
        Login
    }
})

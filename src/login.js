import Vue from 'vue'
import Login from './Login.vue'
import store from './store'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    components: {
        Login
    }
})

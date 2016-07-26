/* global document */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import vueValidator from 'vue-validator'
import store from './store'
import ls from 'store2'

import App from './App.vue'

import index from './components/index.vue'
import adminEdit from './components/edit.vue'
import adminList from './components/list.vue'
import adminPost from './components/post.vue'
import article from './components/article.vue'

Vue.use(VueRouter)
Vue.use(vueValidator)

var router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    suppressTransitionError: true
})

router.map({
    '/': {
        name: 'index',
        component: index
    },
    '/category/:id': {
        name: 'category',
        component: index
    },
    '/search/:qs': {
        name: 'search',
        component: index
    },
    '/article/:id': {
        name: 'article',
        component: article
    },
    '/list/:page': {
        name: 'adminList',
        component: adminList
    },
    '/post': {
        name: 'adminPost',
        component: adminPost
    },
    '/edit/:id/:page': {
        name: 'adminEdit',
        component: adminEdit
    },
    '*': {
        component: index
    }
})

sync(store, router)

router.beforeEach(transition => {
    var scrollTop = document.body.scrollTop
    if (transition.from.path) {
        ls.set(transition.from.path, scrollTop)
    }
    store.dispatch('GLOBAL_PROGRESS', 0)
    transition.next()
})

router.start(App, '#app')

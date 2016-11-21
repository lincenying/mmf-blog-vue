/* global document */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import vueValidator from 'vue-validator'
import store from './store'
import ls from 'store2'

import App from './App.vue'

import index from './pages/index.vue'
import article from './pages/article.vue'
import adminEdit from './pages/admin-edit.vue'
import adminList from './pages/admin-list.vue'
import adminPost from './pages/admin-post.vue'

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
    '/admin/list/:page': {
        name: 'adminList',
        component: adminList
    },
    '/admin/post': {
        name: 'adminPost',
        component: adminPost
    },
    '/admin/edit/:id/:page': {
        name: 'adminEdit',
        component: adminEdit
    },
    '*': {
        component: index
    }
})

sync(store, router)

router.beforeEach(({from: {path}, next}) => {
    var scrollTop = document.body.scrollTop
    if (path) {
        if (scrollTop) ls.set(path, scrollTop)
        if (ls.get(path) && !scrollTop) ls.set(path, 0)
    }
    store.dispatch('GLOBAL_PROGRESS', 0)
    next()
})

router.start(App, '#app')

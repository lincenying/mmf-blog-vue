/* global createLogger */

import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin'
import article from './modules/article'
import global from './modules/global'

Vue.use(Vuex)
Vue.config.debug = false
const debug = false

export default new Vuex.Store({
    modules: {
        global,
        admin,
        article
    },
    strict: debug,
    middlewares: debug ? [createLogger()] : []
})

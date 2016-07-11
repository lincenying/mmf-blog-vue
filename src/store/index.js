/* global createLogger */

import Vue from 'vue'
import Vuex from 'vuex'
import adminArticle from './modules/adminArticle'
import article from './modules/article'
import global from './modules/global'

Vue.use(Vuex)
Vue.config.debug = false
const debug = false

export default new Vuex.Store({
    modules: {
        global,
        adminArticle,
        article
    },
    strict: debug,
    middlewares: debug ? [createLogger()] : []
})

/* global createLogger */

import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import adminArticle from './modules/adminArticle'
import article from './modules/article'

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

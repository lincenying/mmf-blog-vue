/* global document, window */

import Vue from 'vue'
import * as types from './mutation-types'
import api from '../api'
import ls from 'store2'

export const gLoadding = ({dispatch}, status) => {
    dispatch(types.GLOBAL_LOADDING, status)
}

export const gProgress = ({dispatch, state: {route: {path}}}, num) => {
    dispatch(types.GLOBAL_PROGRESS, num)
    var clientHeight = document.documentElement.clientHeight,
        scrollTop = ls.get(path)
    if (num === 100 && scrollTop) {
        Vue.nextTick(() => {
            if (document.body.clientHeight >= scrollTop + clientHeight) {
                window.scrollTo(0, scrollTop)
            } else {
                ls.remove(path)
            }
        })
    }
}

export const showMsg = ({dispatch}, content, type = 'error') => {
    dispatch(types.GLOBAL_SHOWMSG, {content, type})
}

export const hideMsg = ({dispatch}) => {
    dispatch(types.GLOBAL_HIDEMSG)
}

export const getArticleList = ({dispatch, state: {route: { path }}}, config) => {
    return api.getFromConfig(config).then(({data}) => {
        dispatch(types.RECEIVE_ARTICLE, data, config.page, path)
    })

}
export const getAdminArticle = ({dispatch}, config) => {
    return api.getFromConfig(config).then(({data}) => {
        dispatch(types.RECEIVE_ADMIN_ARTICLE, data)
    })
}

export const deleteArticle = ({dispatch}, config) => {
    return api.getFromConfig(config).then(() => {
        dispatch(types.DELETE_ARTICLE, config.id)
    })
}

export const recoverArticle = ({dispatch}, config) => {
    return api.getFromConfig(config).then(() => {
        dispatch(types.RECOVER_ARTICLE, config.id)
    })
}

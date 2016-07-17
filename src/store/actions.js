import Vue from 'vue'
import * as types from './mutation-types'
import api from '../api'
import ls from 'store2'

export const gLoadding = ({dispatch}, status) => {
    dispatch(types.GLOBAL_LOADDING, status)
}

export const gProgress = ({dispatch, state: {route: {path}}}, num) => {
    dispatch(types.GLOBAL_PROGRESS, num)
    var scrollTop = ls.get(path)
    if (num === 100 && scrollTop) {
        Vue.nextTick(function () {
            window.scrollTo(0, scrollTop)
        })
    }
}

export const showMsg = ({dispatch}, content, type = 'error') => {
    dispatch(types.GLOBAL_SHOWMSG, {content, type})
}

export const hideMsg = ({dispatch}) => {
    dispatch(types.GLOBAL_HIDEMSG)
}

export const getArticleList = ({dispatch}, config) => {
    var id = (config.id ? config.id : '0') + '_' + (config.page ? config.page : '1'),
        key = 'getArticleList_' + id,
        keyTime = 'getArticleList_Time_' + id,
        list = ls(key),
        listTime = ls(keyTime),
        nowTime = new Date().getTime()
    if (config.qs || !list || !listTime || nowTime > listTime + 600000) {
        return api.getFromConfig(config).then(({data}) => {
            ls(key, data)
            ls(keyTime, nowTime)
            dispatch(types.RECEIVE_ARTICLE, data, config.page)
        })
    }
    return new Promise(resolve => {
        dispatch(types.RECEIVE_ARTICLE, list, config.page)
        resolve('')
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

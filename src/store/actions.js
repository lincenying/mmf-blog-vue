import store from 'store2'
import api from '../api'
import * as types from './mutation-types'

export const gLoadding = ({dispatch}, status) => {
    dispatch(types.GLOBAL_LOADDING, status)
}

export const gProgress = ({dispatch}, num) => {
    dispatch(types.GLOBAL_PROGRESS, num)
}

export const showMsg = ({dispatch}, content, type = 'error') => {
    dispatch(types.GLOBAL_SHOWMSG, {content: content, type: type})
}

export const hideMsg = ({dispatch}) => {
    dispatch(types.GLOBAL_HIDEMSG)
}

export const getArticleList = ({dispatch}, config) => {
    var id = (config.id ? config.id : '0') + '_' + (config.page ? config.page : '1'),
        key = 'getArticleList_' + id,
        keyTime = 'getArticleList_Time_' + id,
        list = store(key),
        listTime = store(keyTime),
        nowTime = new Date().getTime()
    if (config.q || !list || !listTime || nowTime > listTime + 600000) {
        return api.getFromConfig(config).then(({data}) => {
            store(key, data)
            store(keyTime, nowTime)
            dispatch(types.RECEIVE_ARTICLE, data, config.page)
        })
    } else {
        return new Promise((resolve) => {
            dispatch(types.RECEIVE_ARTICLE, list, config.page)
            resolve('')
        })
    }
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

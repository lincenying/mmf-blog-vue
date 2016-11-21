/* global document, window */

import * as types from './mutation-types'
import api from '../api'

export const gLoadding = ({dispatch}, status) => {
    dispatch(types.GLOBAL_LOADDING, status)
}

export const gProgress = ({dispatch, state: {route: {path}}}, num) => {
    dispatch(types.GLOBAL_PROGRESS, num)
}

export const showMsg = ({dispatch}, content, type = 'error') => {
    dispatch(types.GLOBAL_SHOWMSG, {content, type})
}

export const hideMsg = ({dispatch}) => {
    dispatch(types.GLOBAL_HIDEMSG)
}

// 前端 文章列表
export const getTopics = ({dispatch, state: {route: { path }}}, config) => {
    return api.get('frontend/topics', config).then(({data}) => {
        dispatch(types.RECEIVE_ARTICLE, data, config.page, path)
    })

}
export const getAdminTopics = ({dispatch}, config) => {
    return api.get('admin/topics', config).then(({data}) => {
        dispatch(types.RECEIVE_ADMIN_ARTICLE, data)
    })
}

export const deleteArticle = ({dispatch}, config) => {
    return api.get('admin/article/delete', config).then(() => {
        dispatch(types.DELETE_ARTICLE, config.id)
    })
}

export const recoverArticle = ({dispatch}, config) => {
    return api.get('admin/article/recover', config).then(() => {
        dispatch(types.RECOVER_ARTICLE, config.id)
    })
}

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
    return api.getFromConfig(config).then(({data}) => {
        dispatch(types.RECEIVE_ARTICLE, data, config.page)
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

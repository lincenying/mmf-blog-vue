import {
    DELETE_ARTICLE,
    RECEIVE_ADMIN_ARTICLE,
    RECOVER_ARTICLE,
    UPDATE_ADMIN_ARTICLE
} from '../mutation-types'

const state = {
    article: []
}

const mutations = {
    [RECEIVE_ADMIN_ARTICLE](state, data) {
        state.article = data
    },
    [UPDATE_ADMIN_ARTICLE](state, data) {
        const obj = state.article.list.find(ii => ii._id === data.id)
        for (const jj in obj) {
            if (obj.hasOwnProperty(jj) ) {
                obj[jj] = data[jj]
            }
        }
    },
    [DELETE_ARTICLE](state, id) {
        const obj = state.article.list.find(ii => ii._id === id)
        obj.is_delete = 1
    },
    [RECOVER_ARTICLE](state, id) {
        const obj = state.article.list.find(ii => ii._id === id)
        obj.is_delete = 0
    }
}

export default {
    state,
    mutations
}

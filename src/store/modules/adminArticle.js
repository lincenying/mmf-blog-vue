import {
    RECEIVE_ADMIN_ARTICLE,
    UPDATE_ADMIN_ARTICLE,
    DELETE_ARTICLE,
    RECOVER_ARTICLE
} from '../mutation-types'

const state = {
    article: []
}

const mutations = {
    [RECEIVE_ADMIN_ARTICLE](state, data) {
        state.article = data
    },
    [UPDATE_ADMIN_ARTICLE](state, data) {
        let obj = state.article.list.find((i) => i.id === data.id)
        for (let i in obj) {
            if (obj.hasOwnProperty(i) ) {
                obj[i] = data[i]
            }
        }
    },
    [DELETE_ARTICLE](state, id) {
        let obj = state.article.list.find((i) => i.id === id)
        obj.is_delete = 1
    },
    [RECOVER_ARTICLE](state, id) {
        let obj = state.article.list.find((i) => i.id === id)
        obj.is_delete = 0
    }
}

export default {
    state,
    mutations
}

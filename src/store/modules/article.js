import {
    RECEIVE_ARTICLE
} from '../mutation-types'

const state = {
    list: [],
    hasNext: 0,
    page: 1,
    path: ''
}

const mutations = {
    [RECEIVE_ARTICLE](state, data, page, path) {
        if (page === 1) {
            state.list = [].concat(data.list)
        } else {
            state.list = state.list.concat(data.list)
        }
        state.hasNext = data.hasNext
        state.page = page + 1
        state.path = path
    }
}

export default {
    state,
    mutations
}


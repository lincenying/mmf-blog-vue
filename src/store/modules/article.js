import {
    RECEIVE_ARTICLE
} from '../mutation-types'

const state = {
    list: [],
    hasNext: 0
}

const mutations = {
    [RECEIVE_ARTICLE](state, data, page) {
        if (page === 1) {
            state.list = [].concat(data.list)
        } else {
            state.list = state.list.concat(data.list)
        }
        state.hasNext = data.hasNext
    }
}

export default {
    state,
    mutations
}

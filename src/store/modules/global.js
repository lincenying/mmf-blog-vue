import {
    GLOBAL_LOADDING,
    GLOBAL_SHOWMSG,
    GLOBAL_HIDEMSG
} from '../mutation-types'

const state = {
    loading: false,
    message: {
        type: '',
        content: '',
        title: ''
    }
}

const mutations = {
    [GLOBAL_LOADDING](state, status) {
        state.loading = status
    },
    [GLOBAL_SHOWMSG](state, action) {
        state.message = {...action}
    },
    [GLOBAL_HIDEMSG](state) {
        state.message = {
            type: '',
            content: '',
            title: ''
        }
    }
}

export default {
    state,
    mutations
}

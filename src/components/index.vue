<template>
        <div class="g-mn">
            <div class="posts">
                <index-post v-for="item in article.list" :item="item" :ispc="isPC"></index-post>
            </div>
            <div class="box m-page box-do">
                <div class="w-icon w-icon-2"></div>
                <div class="w-icon w-icon-3"></div>
                <a v-if="article.hasNext" @click="loadMore()" href="javascript:;">加载更多</a>
                <span v-else>好厉害, 竟然翻到最后一页了...</span>
            </div>
        </div>
</template>
<script type="text/ecmascript-6">
    import * as vuexAction from "../store/actions"
    import indexPost from './index-post.vue'
    import { ua } from '../tools/ua'
    export default {
        vuex: {
            getters: {
                article: ({article}) => article
            },
            actions: vuexAction
        },
        components: {
            indexPost
        },
        computed: {
            isPC() {
                return ua() == "PC"
            }
        },
        data () {
            return {
                page: 1
            }
        },
        methods: {
            loadMore(page = this.page) {
                var id = this.$route.params.id || ""
                var q = this.$route.params.q || ""
                this.gProgress(30)
                return Promise.all([
                    this.getArticleList({
                        action: 'getArticleList',
                        limit: 10,
                        id: id,
                        q: q,
                        page: page
                    })
                ]).then(() => {
                    this.gProgress(100)
                    this.page++
                })
            }
        },
        ready() {
            this.page = 1
            this.loadMore()
        },
        route: {
            canReuse() {
                return false
            }
        }
    }
</script>

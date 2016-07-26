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
<script lang="babel">
    import * as vuexAction from "../store/actions"
    import indexPost from './index-post.vue'
    import { ua, ssp } from '../tools/command'
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
                return ua() === "PC"
            }
        },
        methods: {
            async loadMore(page = this.article.page) {
                var id = this.$route.params.id || ""
                var qs = this.$route.params.qs || ""
                await this.getArticleList({
                    action: 'getArticleList',
                    id,
                    qs,
                    page,
                    limit: 10
                })
                if (page === 1) ssp(this.$route.path)
            }
        },
        ready() {
            if (this.article.list.length <= 0 || this.$route.path !== this.article.path) {
                this.loadMore(1)
            } else {
                ssp(this.$route.path)
                this.gProgress(100)
            }
        },
        route: {
            canReuse() {
                return false
            }
        }
    }
</script>

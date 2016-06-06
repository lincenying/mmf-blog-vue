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
    import hljs from 'highlight.js'
    import { ua } from '../tools/ua'
    export default {
        data () {
            return {
                page: 1
            }
        },
        vuex: {
            getters: {
                article: ({article}) => article
            },
            actions: vuexAction
        },
        route: {
            data() {
                this.page = 1
                this.loadMore()
            }
        },
        computed: {
            isPC() {
                return ua() == "PC"
            }
        },
        methods: {
            loadMore(page = this.page) {
                var id = this.$route.params.id || ""
                var q = this.$route.params.q || ""
                this.gLoadding(true)
                return Promise.all([
                    this.getArticleList({
                        action: 'getArticleList',
                        limit: 10,
                        id: id,
                        q: q,
                        page: page
                    })
                ]).then(() => {
                    this.gLoadding(false)
                    this.page++
                    this.$nextTick(function () {
                        $('pre code').each(function(i, block) {
                            hljs.highlightBlock(block);
                        });
                    })
                })
            }
        },
        components: {
            indexPost
        }
    }
</script>

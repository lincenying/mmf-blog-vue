<template>
    <div>
    <div v-if="article" class="g-mn">
        <div class="posts">
            <div class="m-post box article">
                <a href="javascript:;" class="w-icon w-icon-1">&nbsp;</a>
                <a href="javascript:;" class="w-icon2">&nbsp;</a>
                <div class="info">
                    <a href="javascript:;" v-text="article.creat_date"></a>
                    <a href="javascript:;" class="comnum" v-text="article.comment_count"></a>
                </div>
                <div class="cont cont-1">
                    <div class="text">
                        <h2><a v-link="{ name: 'article', params: { id: article.id }}" v-text="article.title"></a></h2>
                        <div class="editor-style" v-html="article.content"></div>
                    </div>
                </div>
                <div class="info info-1"></div>
            </div>
        </div>
        <div class="box m-page box-do">
            <div class="w-icon w-icon-2"></div>
            <div class="w-icon w-icon-3"></div>
            <a v-if="article.prev_id" v-link="{ name: 'article', params: { id: article.prev_id }}" id="__prev_permalink__" class="prev">上一篇</a>
            <span v-else class="prev">上一篇</span>
            <a v-if="article.next_id" v-link="{ name: 'article', params: { id: article.next_id }}" id="__next_permalink__" class="next">下一篇</a>
            <span v-else class="next">下一篇</span>
        </div>
        <comment :id="article.id" :comments="comments" :loadcomment="loadcomment"></comment>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import * as vuexAction from "../store/actions"
    import comment from './comment.vue'
    import hljs from 'highlight.js'
    import { ua } from '../tools/ua'
    export default {
        vuex: {
            actions: vuexAction
        },
        data () {
            return {
                article: null,
                comments: {
                    list: [],
                    hasNext: 0,
                    page: 1
                }
            }
        },
        route: {
            data({to: {params: {id}}}) {
                this.gLoadding(true)
                this.comments.page = 1
                var request = $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: "api.php?action=article&id=" + id
                });
                request.then((json) => {
                    this.gLoadding(false)
                    this.article = json.data
                    this.loadcomment()
                    this.$nextTick(function () {
                        ua() === "PC" && $('pre code').each(function(i, block) {
                            hljs.highlightBlock(block);
                        });
                    })
                });
            }
        },
        methods: {
            loadcomment() {
                var id = this.$route.params.id
                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: "api.php?action=comment&id=" + id + "&page=" + this.comments.page
                }).then((json) => {
                    if (this.comments.page == 1) {
                        this.comments.list = [].concat(json.data.list)
                    } else {
                        this.comments.list = this.comments.list.concat(json.data.list)
                    }
                    this.comments.hasNext = json.data.hasNext
                    this.comments.page++
                });
            }
        },
        components: {
            comment
        }
    }
</script>

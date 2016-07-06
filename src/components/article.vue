<template>
    <div class="g-mn">
    <template v-if="article">
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
                        <div class="markdown-body" v-html="article.content | marked"></div>
                    </div>
                </div>
                <div class="info info-1"></div>
            </div>
        </div>
        <div class="box m-page box-do">
            <div class="w-icon w-icon-2"></div>
            <div class="w-icon w-icon-3"></div>
            <a v-if="article.prev_id" v-link="{ name: 'article', params: { id: article.prev_id }, force: true}" id="__prev_permalink__" class="prev">上一篇</a>
            <span v-else class="prev">上一篇</span>
            <a v-if="article.next_id" v-link="{ name: 'article', params: { id: article.next_id }, force: true}" id="__next_permalink__" class="next">下一篇</a>
            <span v-else class="next">下一篇</span>
        </div>
        <comment :id="article.id" :comments="comments" :loadcomment="loadcomment"></comment>
    </template>
    </div>
</template>

<script type="text/ecmascript-6">
    import * as vuexAction from "../store/actions"
    import marked from 'marked'
    import comment from './comment.vue'
    import hljs from 'highlight.js'
    import { ua } from '../tools/ua'
    marked.setOptions({
        highlight(code) {
            return hljs.highlightAuto(code).value
        },
        breaks: true
    })
    export default {
        vuex: {
            actions: vuexAction
        },
        components: {
            comment
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
        filters: {
            marked: marked
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
        ready() {
            var id = this.$route.params.id
            this.comments.page = 1
            var request = $.ajax({
                type: "POST",
                dataType: 'json',
                url: "api.php?action=article&id=" + id
            });
            request.then((json) => {
                this.gProgress(100)
                this.article = json.data
                this.loadcomment()
            });
        },
        route: {
            canReuse() {
                return false
            }
        }
    }
</script>

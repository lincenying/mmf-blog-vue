<template>
    <div class="g-mn">
    <template v-if="article">
        <div class="posts">
            <div class="m-post box article">
                <a href="javascript:;" class="w-icon w-icon-1">&nbsp;</a>
                <a href="javascript:;" class="w-icon2">&nbsp;</a>
                <div class="info">
                    <a href="javascript:;" v-text="article.creat_date"></a>
                    <a href="javascript:;">浏览: {{ article.visit }}</a>
                    <a href="javascript:;" class="comnum" v-text="article.comment_count"></a>
                </div>
                <div class="cont cont-1">
                    <div class="text">
                        <h2><a v-link="{ name: 'article', params: { id: article._id }}" v-text="article.title"></a></h2>
                        <div class="markdown-body" v-html="article.content | marked"></div>
                    </div>
                </div>
                <div class="info info-1"></div>
            </div>
        </div>
        <div class="box m-page box-do">
            <div class="w-icon w-icon-2"></div>
            <div class="w-icon w-icon-3"></div>
            <a v-if="prev.prev_id" v-link="{ name: 'article', params: { id: prev.prev_id }, force: true}" id="__prev_permalink__" class="prev">上一篇</a>
            <span v-else class="prev">上一篇</span>
            <a v-if="next.next_id" v-link="{ name: 'article', params: { id: next.next_id }, force: true}" id="__next_permalink__" class="next">下一篇</a>
            <span v-else class="next">下一篇</span>
        </div>
        <comment :id="article._id" :comments="comments" :loadcomment="loadcomment"></comment>
    </template>
    </div>
</template>

<script lang="babel">
    import * as vuexAction from "../store/actions"
    import api from '../api'
    import marked from 'marked'
    import comment from './comment.vue'
    import hljs from 'highlight.js'
    var renderer = new marked.Renderer()
    marked.setOptions({
        highlight(code) {
            return hljs.highlightAuto(code).value
        },
        breaks: true
    })
    renderer.link = function( href, title, text ) {
        return '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>'
    }
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
                next: null,
                prev: null,
                comments: {
                    list: [],
                    hasNext: 0,
                    page: 1
                }
            }
        },
        filters: {
            marked(message) {
                return marked(message, { renderer })
            }
        },
        methods: {
            async loadcomment() {
                var id = this.$route.params.id
                var json = await api.getData({
                    action: 'comment',
                    id,
                    page: this.comments.page
                })
                if (this.comments.page === 1) {
                    this.comments.list = [].concat(json.data.list)
                } else {
                    this.comments.list = this.comments.list.concat(json.data.list)
                }
                this.comments.hasNext = json.data.hasNext
                this.comments.page++
            }
        },
        ready() {
            (async () => {
                var id = this.$route.params.id
                this.comments.page = 1
                var json = await api.getFromConfig({
                    action: 'article',
                    id
                })
                this.article = json.data
                this.prev = json.prev
                this.next = json.next
                this.loadcomment()
            })()
        },
        route: {
            canReuse() {
                return false
            }
        }
    }
</script>

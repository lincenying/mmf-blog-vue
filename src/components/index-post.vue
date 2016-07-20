<template>
    <div class="index m-post box article">
        <a href="javascript:;" class="w-icon w-icon-1">&nbsp;</a>
        <a href="javascript:;" class="w-icon2">&nbsp;</a>
        <div class="info">
            <a href="javascript:;" v-text="item.creat_date"></a>
        </div>
        <div class="cont cont-1">
            <div class="text">
                <h2><a v-link="{ name: 'article', params: { id: item._id }}" v-text="item.title"></a></h2>
                <div v-if="ispc" class="markdown-body" :class="!showMore ? 'showless' : ''" v-html="item.content | marked"></div>
                <div v-if="ispc" class="more-less">
                    <a v-if="!showMore" @click="open($event)" class="more" href="javascript:;">展开 ↓</a>
                    <a v-else @click="open($event)" class="less" href="javascript:;">收起 ↑</a>
                </div>
            </div>
        </div>
        <div class="info info-1"></div>
    </div>
</template>
<script lang="babel">
    import marked from 'marked'
    import hljs from 'highlight.js'
    marked.setOptions({
        highlight(code) {
            return hljs.highlightAuto(code).value
        },
        breaks: true
    })
    export default {
        props: ['item', 'ispc'],
        data () {
            return {
                showMore: false
            }
        },
        filters: {
            marked
        },
        methods: {
            open(e) {
                this.showMore = !this.showMore
                var $mPost = $(e.target).parents(".m-post")
                var offset = $mPost.offset()
                $("body").animate({
                    scrollTop: offset.top
                }, 500 )
            }
        }
    }
</script>

<template>
    <div class="g-mn">
        <div class="box">
            <ul class="list-group">
                <li v-for="item in article.list" class="list-group-item">
                    <a v-link="{ name: 'article', params: { id: item._id }}" target="_blank" v-text="item.title"></a>
                    <a v-if="item.is_delete == 0" @click="mdel(item._id)" href="javascript:;" class="badge badge-danger">删除</a>
                    <a v-else @click="recover(item._id)" href="javascript:;" class="badge badge-info">恢复</a>
                    <a v-link="{ name: 'adminEdit', params: { id: item._id, page: curPage }}" class="badge badge-success">编辑</a>
                </li>
            </ul>
        </div>
        <div class="box m-page box-do">
            <div class="w-icon w-icon-2"></div>
            <div class="w-icon w-icon-3"></div>
            <a v-if="article.hasPrev" v-link="{ name: 'adminList', params: { page: prevPage }}" class="prev">上一页</a>
            <a v-if="article.hasNext" v-link="{ name: 'adminList', params: { page: nextPage }}" class="next">下一页</a>
        </div>
    </div>
</template>

<script lang="babel">
    import * as vuexAction from "../store/actions"
    import ls from 'store2'
    import cookies from 'js-cookie'
    export default {
        vuex: {
            getters: {
                article: ({admin}) => admin.article
            },
            actions: vuexAction
        },
        computed: {
            curPage() {
                return parseInt(this.$route.params.page, 10)
            },
            prevPage() {
                return parseInt(this.$route.params.page, 10) - 1
            },
            nextPage() {
                return parseInt(this.$route.params.page, 10) + 1
            }
        },
        methods: {
            mdel(id) {
                this.deleteArticle({
                    id,
                })
            },
            recover(id) {
                this.recoverArticle({
                    id,
                })
            }
        },
        route: {
            data({to: {params: { page }}}) {
                var token = ls.get('token') && cookies.get('user')
                if (!token) {
                    this.$route.router.go({ name: 'index'})
                }
                return Promise.all([
                    this.getAdminArticle({
                        limit: 20,
                        page
                    })
                ])
            }
        }
    }
</script>

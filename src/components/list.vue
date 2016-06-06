<template>
    <div class="g-mn">
        <div class="box">
            <ul class="list-group">
                <li v-for="item in article.list" class="list-group-item">
                    <a v-link="{ name: 'article', params: { id: item.id }}" target="_blank" v-text="item.title"></a>
                    <a v-if="item.is_delete == 0" @click="mdel(item.id)" href="javascript:;" class="badge badge-danger">删除</a>
                    <a v-else @click="recover(item.id)" href="javascript:;" class="badge badge-info">恢复</a>
                    <a v-link="{ name: 'adminEdit', params: { id: item.id, page: curPage }}" class="badge badge-success">编辑</a>
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

<script type="text/ecmascript-6">
    import * as vuexAction from "../store/actions"
    import store from 'store2'
    import cookies from 'js-cookie'
    export default {
        vuex: {
            getters: {
                article: ({adminArticle}) => adminArticle.article
            },
            actions: vuexAction
        },
        computed: {
            curPage() {
                return parseInt(this.$route.params.page)
            },
            prevPage() {
                return parseInt(this.$route.params.page) - 1
            },
            nextPage() {
                return parseInt(this.$route.params.page) + 1
            }
        },
        route: {
            data({to: {params: { page }}}) {
                var token = store.get('token') && cookies.get('user')
                if (!token) {
                    this.$route.router.go({ name: 'index'})
                }
                this.gLoadding(true)
                return Promise.all([
                    this.getAdminArticle({
                        action: 'getAdminArticle',
                        limit: 20,
                        page: page
                    })
                ]).then(() => {
                    this.gLoadding(false)
                })
            }
        },
        methods: {
            mdel(id) {
                this.deleteArticle({
                    id: id,
                    action: 'delete'
                })
            },
            recover(id) {
                this.recoverArticle({
                    id: id,
                    action: 'recover'
                })
            }
        }
    }
</script>

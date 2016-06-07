<template>
        <div class="g-mn">
            <div class="box">
                <ajax-form id="article-post" action="/api.php?action=modify" method="post">
                    <section id="post-title">
                        <input v-model="title" type="text" name="title" class="form-control" placeholder="请输入标题">
                    </section>
                    <section id="post-category">
                        <select v-model="category" id="category" name="category" class="form-control">
                            <option value="">请选择分类</option>
                            <option value="1">生活</option>
                            <option value="2">工作</option>
                            <option value="3">其他</option>
                        </select>
                    </section>
                    <section id="post-content">
                        <textarea v-model="content"  id="editor" name="content" class="form-control" data-autosave="editor-content"></textarea>
                    </section>
                    <section id="post-submit">
                        <input type="hidden" name="id" :value="id">
                        <button class="btn btn-success">编辑</button>
                    </section>
                </ajax-form>
            </div>
        </div>
</template>

<script type="text/ecmascript-6">
    import * as vuexAction from "../store/actions"
    import ajaxForm from './app/ajax-form.vue'
    import Simditor from 'simditor'
    import store from 'store2'
    import cookies from 'js-cookie'
    import editor_config from '../tools/editor_config'
    export default {
        vuex: {
            actions: vuexAction
        },
        data () {
            return {
                id: '',
                title: '',
                category: '',
                content: ''
            }
        },
        components: {
            ajaxForm
        },
        route: {
            data({to: {params: {id}}}) {
                var token = store.get('token') && cookies.get('user')
                if (!token) {
                    this.$route.router.go({ name: 'index'})
                }
                this.gLoadding(true)
                var request = $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: "api.php?action=getArticle&id=" + id
                });
                request.then((json) => {
                    this.id = json.data.id
                    this.title = json.data.title
                    this.category = json.data.category
                    this.content = json.data.content
                    this.gLoadding(false)
                });
            }
        },
        ready() {
            editor_config.textarea = $('#editor')
            window.editors = new Simditor(editor_config)
            editors.uploader.on("uploadsuccess", (e, file, result) => {
                if (result.key)
                    file.img.attr("src", "http://7xso5y.com2.z0.glb.clouddn.com/" + result.key);
                else
                    file.img.remove();
            })
        },
        events: {
            beforeFormSubmit() {
                this.gLoadding(true)
            },
            onFormComplete(el, res) {
                this.gLoadding(false)
                if (res.code == 200) {
                    this.showMsg(res.message, "success")
                    this.$route.router.go({ name: 'adminList', params: { page: this.$route.params.page }})
                } else {
                    this.showMsg(res.message, 'error')
                }
            }
        }
    }
</script>

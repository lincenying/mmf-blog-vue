<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
    <div class="g-mn">
        <div class="box">
            <validator name="edit">
                <ajax-form id="article-post" action="/api/?action=modify" method="post">
                    <section id="post-title">
                        <input v-model="title" v-validate:title="{ required: true }" type="text" name="title" class="form-control" placeholder="请输入标题">
                    </section>
                    <section id="post-category">
                        <select v-model="category" v-validate:category="{ required: true }" id="category" name="category" class="form-control">
                            <option value="">请选择分类</option>
                            <option value="1">生活</option>
                            <option value="2">工作</option>
                            <option value="3">其他</option>
                        </select>
                    </section>
                    <section id="post-content">
                        <textarea v-validate:content="['editor']" id="editor" name="content" class="form-control" data-autosave="editor-content"></textarea>
                    </section>
                    <section id="post-submit">
                        <input type="hidden" name="id" :value="id">
                        <button @click="onSubmit" class="btn btn-success">编辑</button>
                    </section>
                </ajax-form>
            </validator>
        </div>
    </div>
</template>

<script lang="babel">
    /* global editormd */
    import * as vuexAction from "../store/actions"
    import ajaxForm from './app/ajax-form.vue'
    import ls from 'store2'
    import cookies from 'js-cookie'
    export default {
        vuex: {
            actions: vuexAction
        },
        components: {
            ajaxForm
        },
        data () {
            return {
                id: '',
                title: '',
                category: '',
                content: ''
            }
        },
        events: {
            beforeFormSubmit() {
                this.gProgress(30)
            },
            onFormComplete(el, res) {
                this.gProgress(100)
                if (res.code === 200) {
                    this.showMsg(res.message, "success")
                    this.$route.router.go({ name: 'adminList', params: { page: this.$route.params.page }})
                } else {
                    this.showMsg(res.message, 'error')
                }
            }
        },
        methods: {
            onSubmit(e) {
                this.$validate(true)
                if (this.$edit.invalid) {
                    var msg = ''
                    this.$post.errors.map(i => {
                        msg += i.message + "<br>"
                    })
                    this.showMsg(msg, 'error')
                    e.preventDefault()
                }
            }
        },
        ready() {
            var id = this.$route.params.id
            var request = $.ajax({
                type: "POST",
                dataType: 'json',
                url: "/api/?action=getArticle&id=" + id
            })
            request.then(json => {
                this.id = json.data._id
                this.title = json.data.title
                this.category = json.data.category
                this.content = json.data.content

                this.$nextTick(() => {
                    editormd("post-content", {
                        width: "100%",
                        height: 500,
                        placeholder: '请输入内容...',
                        path: './static/editor.md/lib/',
                        toolbarIcons() {
                            return [
                                "bold", "italic", "quote", "|",
                                "list-ul", "list-ol", "hr", "|",
                                "link", "reference-link", "image", "code", "code-block", "table", "|",
                                "watch", "preview", "fullscreen", "|",
                                "help"
                            ]
                        },
                        watch : false,
                        markdown: json.data.content,
                        saveHTMLToTextarea : true,
                        imageUpload : true,
                        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                        imageUploadURL : "/api/?action=upload"
                    })
                })
                this.gProgress(100)
            })
        },
        route: {
            data() {
                var token = ls.get('token') && cookies.get('user')
                if (!token) {
                    this.$route.router.go({ name: 'index'})
                }
            }
        },
        validators: {
            editor() {
                return $(this.el).val() !== ''
            }
        }
    }
</script>

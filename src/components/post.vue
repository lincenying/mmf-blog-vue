<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
        <div class="g-mn">
            <div class="box">
                <validator name="post">
                    <ajax-form id="article-post" action="/api.php?action=post" method="post">
                        <section id="post-title">
                            <input v-model="title" v-validate:title="{ required: { rule: true, message: '请输入标题!' } }" type="text" name="title" class="form-control" placeholder="请输入标题">
                        </section>
                        <section id="post-category">
                            <select v-model="category" v-validate:category="{ required: { rule: true, message: '请选择分类!' } }" id="category" name="category" class="form-control">
                                <option value="">请选择分类</option>
                                <option value="1">生活</option>
                                <option value="2">工作</option>
                                <option value="3">其他</option>
                            </select>
                        </section>
                        <section id="post-content">
                            <textarea v-model="content" v-validate:content="{ editor: { rule: true, message: '请输入内容!' } }" id="editor" name="content" class="form-control" data-autosave="editor-content"></textarea>
                        </section>
                        <section id="post-submit">
                            <button @click="onSubmit" class="btn btn-success">发布</button>
                        </section>
                    </ajax-form>
                </validator>
            </div>
        </div>
</template>

<script type="text/ecmascript-6">
    import * as vuexAction from "../store/actions"
    import ajaxForm from './app/ajax-form.vue'
    import Simditor from 'simditor'
    import store from 'store2'
    import cookies from 'js-cookie'
    import editorConfig from '../tools/editor_config'
    export default {
        vuex: {
            actions: vuexAction
        },
        components: {
            ajaxForm
        },
        data () {
            return {
                editors: null,
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
                this.showMsg(res.message, res.code === 200 ? "success" : 'error')
                $("#article-post").get(0).reset()
            }
        },
        methods: {
            onSubmit(e) {
                this.$validate(true)
                if (this.$post.invalid) {
                    var msg = '';
                    this.$post.errors.map(i => {
                        msg += i.message + "<br>";
                    })
                    this.showMsg(msg, 'error')
                    e.preventDefault()
                }
            }
        },
        ready() {
            editorConfig.textarea = $('#editor')
            window.editors = new Simditor(editorConfig)
            editors.uploader.on("beforeupload", () => {
                editors.uploader.opts.params.key = new Date().getTime() + ".jpg"
            })
            editors.uploader.on("uploadsuccess", (e, file, result) => {
                if (result.key) {
                    file.img.attr("src", "http://7xso5y.com2.z0.glb.clouddn.com/" + result.key);
                } else
                    file.img.remove();
            })
        },
        route: {
            data() {
                var token = store.get('token') && cookies.get('user')
                if (!token) {
                    this.$route.router.go({ name: 'index'})
                }
            }
        },
        validators: {
            editor() {
                return $(this.el).val() != ''
            }
        }
    }
</script>

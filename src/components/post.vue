<template>
        <div class="g-mn">
            <div class="box">
                <ajax-form id="article-post" action="/api.php?action=post" method="post">
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
                        <textarea v-model="content" id="editor" name="content" class="form-control" data-autosave="editor-content"></textarea>
                    </section>
                    <section id="post-submit">
                        <button @click.prevent="checkSubmit" class="btn btn-success">发布</button>
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
        data () {
            return {
                title: '',
                category: '',
                content: ''
            }
        },
        components: {
            ajaxForm
        },
        vuex: {
            actions: vuexAction
        },
        route: {
            data() {
                var token = store.get('token') && cookies.get('user')
                if (!token) {
                    this.$route.router.go({ name: 'index'})
                }
            }
        },
        ready() {
            editor_config.textarea = $('#editor')
            var editors = new Simditor(editor_config)
            editors.uploader.on("uploadsuccess", (e, file, result) => {
                if (result.key)
                    file.img.attr("src", "http://7xso5y.com2.z0.glb.clouddn.com/" + result.key);
                else
                    file.img.remove();
            })
        },
        methods: {
            checkSubmit() {
                if (this.title == '' || this.category == '' || this.content == '') {
                    this.showMsg('请将内容填写完整!', 'error')
                    return false
                }
                $("#article-post").submit()
            }
        },
        events: {
            beforeFormSubmit() {
                this.gLoadding(true)
            },
            onFormComplete(el, res) {
                this.gLoadding(false)
                this.showMsg(res.message, res.code === 200 ? "success" : 'error')
                $("#article-post").get(0).reset()
            }
        }
    }
</script>

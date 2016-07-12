<template>
    <section class="container">
        <div class="login">
            <h1>后台管理</h1>
            <ajax-form id="shake-setting" action="/api.php?action=login" method="post">
                <p><input v-model="form.username" type="text" name="username" value="" placeholder="请输入用户名"></p>
                <p><input v-model="form.password" type="password" name="password" value="" placeholder="请输入密码"></p>
                <p class="remember_me">
                    <label>
                        <input v-model="form.remember_me" type="checkbox" name="remember_me" id="remember_me">
                        保持登录
                    </label>
                </p>
                <p class="submit"><input type="submit" value="登录" :disabled="form.usrname != '' && form.password != '' ? null: 'true'"></p>
            </ajax-form>
        </div>
    </section>
    <Toaster></Toaster>
    <div v-if="global.loading" class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
    </div>
</template>
<script lang="babel">
    /* global window */
    import '../html/css/login.css'
    import "../node_modules/vue-toastr/dist/vue-toastr.min.css"
    import * as Action from "./store/actions"
    import store from 'store2'
    import Toaster from './components/app/toaster.vue'
    import ajaxForm from './components/app/ajax-form.vue'
    export default {
        vuex: {
            getters: {
                global: ({ global }) => global
            },
            actions: Action
        },
        components: {
            Toaster,
            ajaxForm
        },
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    remember_me: ''
                }
            }
        },
        events: {
            beforeFormSubmit() {
                this.gLoadding(true)
            },
            onFormComplete(el, res) {
                this.gLoadding(false)
                if (res.code === 200) {
                    this.showMsg("操作成功", "success")
                    store.set("token", res.data)
                    setTimeout(() => {
                        window.location.href = "/#!/post"
                    }, 1000)
                } else {
                    this.showMsg(res.message)
                }
            }
        }
    }
</script>

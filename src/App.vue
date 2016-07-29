<template>
<div class="g-doc">
    <div class="g-hd">
        <About></About>
        <div v-if="visit" class="box menu">
            <div class="m-sch">
                <input @keyup.enter="search($event)" id="search_content" class="sch" type="text" name="q" placeholder="记得按回车哦" />
            </div>
            <div class="m-nav">
                <ul class="menuOpen">
                    <li class="tag-all"><a v-link="{ name: 'index', exact: true}"><i></i>All</a></li>
                    <li class="tag-life"><a v-link="{ name: 'category', params: { id: 1 }}"><i></i>Life</a></li>
                    <li class="tag-study"><a v-link="{ name: 'category', params: { id: 2 }}"><i></i>Study</a></li>
                    <li class="tag-other"><a v-link="{ name: 'category', params: { id: 3 }}"><i></i>Other</a></li>
                </ul>
            </div>
        </div>
        <div v-if="!visit" class="box menu">
            <div class="m-nav">
                <ul class="menuOpen">
                    <li class="tag-all"><a v-link="{ name: 'index', exact: true}"><i></i>All</a></li>
                    <li class="tag-life"><a v-link="{ name: 'adminList', params: { page: 1 }}"><i></i>List</a></li>
                    <li class="tag-study"><a v-link="{ name: 'adminPost'}"><i></i>Post</a></li>
                </ul>
            </div>
        </div>
    </div>
    <router-view class="router" transition="fade" transition-mode="out-in"></router-view>
    <div class="g-ft">
        <span class="copy"><span title="Copyright">©</span> <a v-link="{ name: 'index', exact: true, activeClass: 'none'}">M·M·F 小屋</a> 2016.06</span>
        <span class="beian"><i></i> <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=000000000000">浙公网安备 000000000000号</a></span>
    </div>
    <Toaster></Toaster>
    <div class="arrow">
        <a class="go-top" href="javascript:;" @click="goTop"></a>
        <a class="go-back" href="javascript:;" @click="goBack"></a>
    </div>
</div>
</template>
<script lang="babel">
    import '../static/editor.md/css/editormd.css'
    import '../html/css/hljs/googlecode.css'
    import '../html/css/style.css'
    import '../node_modules/vue-toastr/dist/vue-toastr.min.css'
    import '../node_modules/nprogress/nprogress.css'
    import store from './store'
    import NProgress from 'nprogress'
    import Toaster from './components/app/toaster.vue'
    import About from './components/about.vue'
    import loadingBar from './components/app/loading-bar.vue'
    export default {
        store,
        vuex: {
            getters: {
                global: ({ global }) => global
            }
        },
        components: {
            Toaster,
            About,
            loadingBar
        },
        computed: {
            visit() {
                return this.$route.name === 'index' || this.$route.name === 'article' || this.$route.name === 'category' || this.$route.name === 'search'
            }
        },
        methods: {
            goBack() {
                window.history.go(-1)
            },
            goTop() {
                window.scrollTo(0, 0)
            },
            search(e) {
                var qs = e.target.value
                if (qs === "") {
                    return false
                }
                this.$route.router.go({ name: 'search', params: { qs }})
            }
        },
        watch: {
            'global.progress'(val) {
                if (val === 0) {
                    NProgress.set(0)
                    NProgress.start()
                } else if (val === 100) {
                    NProgress.done()
                } else {
                    NProgress.set(val/100)
                    NProgress.start()
                }
            }
        }
    }
</script>
<style>
    .router.app-transition,
    .fade-transition {
        transition: all 0.3s ease;
    }
    .router.app-enter,
    .router.app-leave {
        opacity: 0;
    }
    .fade-enter {
        opacity: 1;
        transform: translate3d(0, 100px, 0);
    }
    .fade-leave {
        opacity: 0;
        transform: translate3d(100px, 0, 0);
    }
    .beian {
        float: right;
    }
    .beian i {
        width: 14px;
        height: 14px;
        background: url(http://beian.gov.cn/img/ghs.png);
        background-size: cover;
        display: inline-block;
        vertical-align: top;
    }
</style>

<template>
    <vue-toastr v-ref:toastr></vue-toastr>
</template>

<script lang="babel">
    import vueToastr from 'vue-toastr'
    import { showMsg, hideMsg } from '../../store/actions'
    export default {
        vuex:{
            getters:{
                msg: ({global}) => global.message
            },
            actions:{
                showMsg, hideMsg
            }
        },
        components: { vueToastr },
        methods: {
            showToastr(content, type='error', position='toast-top-center') {
                this.$refs.toastr.Add({
                    msg: content,
                    title: '',
                    clickClose: true,
                    timeout: 3000,
                    type: type,
                    position: position
                })
            }
        },
        watch:{
            'msg':{
                handler: function (val) {
                    if (val.content !== ''){
                        this.showToastr(val.content, val.type)
                        this.hideMsg()
                    }
                },
                deep: true
            }
        }
    }
</script>

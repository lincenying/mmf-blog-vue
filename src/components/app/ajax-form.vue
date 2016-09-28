<template>
    <form :class="class" :name="name" :action="action" :method="method" :enctype="enctype" @submit.prevent="handleAjaxFormSubmit">
        <slot></slot>
    </form>
</template>
<script lang="babel">
    export default {
        props  : {
            'class'  : String,
            'action' : {
                type    : String,
                required: true
            },
            'method' : {
                type     : String,
                required : true,
                validator(value) {
                    switch (value.toUpperCase()) {
                        case 'CONNECT':
                            return true
                        case 'DELETE':
                            return true
                        case 'GET':
                            return true
                        case 'HEAD':
                            return true
                        case 'OPTIONS':
                            return true
                        case 'POST':
                            return true
                        case 'PUT':
                            return true
                        case 'TRACE':
                            return true
                        case 'TRACK':
                            return true
                        default:
                            return false
                    }
                }
            },
            'enctype': String
        },
        methods: {
            handleAjaxFormSubmit () {
                this.$dispatch('beforeFormSubmit', this)
                var handleError = err => {
                    this.$dispatch('onFormError', this, err)
                }
                if (!this.method) {
                    this.method = 'post'
                }
                var xhr = new XMLHttpRequest()
                var handleFinish = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status < 400) {
                            this.$dispatch('onFormComplete', this, xhr.response)
                        } else {
                            this.$dispatch('onFormError', this, xhr.statusText)
                        }
                    }
                }
                var handleProgress = evt => {
                    if (evt.lengthComputable) {
                        evt.percent = evt.loaded / evt.total * 100
                        this.$dispatch('onFormProgress', this, evt)
                    }
                }
                xhr.open(this.method, this.action, true)
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
                xhr.setRequestHeader('Authorization', 'Basic dGVzdDpwYXNzd2Q=')
                if (this.vResponseType) {
                    xhr.responseType = this.vResponseType
                } else {
                    xhr.responseType = 'json'
                }
                if (xhr.upload) xhr.upload.addEventListener('progress', handleProgress)
                xhr.addEventListener('readystatechange', handleFinish)
                xhr.addEventListener('error', handleError)
                xhr.addEventListener('abort', handleError)
                var data = new FormData(event.target)
                xhr.send(data)
                this.$dispatch('afterFormSubmit', this)
            }
        }
    }
</script>

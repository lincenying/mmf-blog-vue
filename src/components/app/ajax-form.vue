<template>
    <form :class="class" :name="name" :action="action" :method="method" :enctype="enctype" @submit.prevent="handleAjaxFormSubmit">
        <slot></slot>
    </form>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            'class': String,
            'action': {
                type: String,
                required: true
            },
            'method': {
                type: String,
                required: true,
                validator: function (value) {
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
            handleAjaxFormSubmit: function () {
                this.$dispatch('beforeFormSubmit', this)
                var handleError = (function (err) {
                    this.$dispatch('onFormError', this, err)
                }).bind(this)
                if (!this.method) {
                    this.method = 'post'
                }
                var xhr = new XMLHttpRequest()
                var handleFinish = (function (data) {
                    if (xhr.readyState === 4) {
                        if (xhr.status < 400) {
                            this.$dispatch('onFormComplete', this, xhr.response)
                        } else {
                            this.$dispatch('onFormError', this, xhr.statusText)
                        }
                    }
                }).bind(this)
                var handleProgress = (function (evt) {
                    if (evt.lengthComputable) {
                        evt.percent = (evt.loaded / evt.total) * 100
                        this.$dispatch('onFormProgress', this, evt)
                    }
                }).bind(this)
                xhr.open(this.method, this.action, true)

                xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
                xhr.setRequestHeader('Authorization', 'Basic dGVzdDpwYXNzd2Q=');
                if (this.vResponseType) {
                    xhr.responseType = this.vResponseType
                } else {
                    xhr.responseType = 'json'
                }
                xhr.upload.addEventListener('progress', handleProgress)
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

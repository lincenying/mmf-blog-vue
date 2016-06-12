/**
 * Created by LinCenYing on 2016-06-04.
 */
export default {
    codeLanguages: [
        {name: 'JavaScript', value: 'js'},
        {name: 'HTML,XML', value: 'html'},
        {name: 'CSS', value: 'css'},
        {name: 'Less', value: 'less'},
        {name: 'Sass', value: 'sass'},
        {name: 'CoffeeScript', value: 'coffeescript'},
        {name: 'JSON', value: 'json'},
        {name: 'Markdown', value: 'markdown'},
        {name: 'PHP', value: 'php'},
        {name: 'SQL', value: 'sql'}
    ],
    toolbar: ['title', 'bold', 'italic', 'underline', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', '|', 'indent', 'outdent'],
    placeholder: '这里输入内容...',
    defaultImage: 'http://ww2.sinaimg.cn/large/005uQRNCgw1f4ij3dy4pmj302o02odfo.jpg',
    upload: {
        fileKey: 'file',
        url: 'http://up.qiniu.com/',
        params: {
            'key': new Date().getTime() + '.jpg',
            'token': '4ThBgD0iGXL0Ti-1jrDebfqa1WU5PDk5d2vQJorU:AXzxirCsPyfhoOu2ylqFqe1xxv8=:eyJzY29wZSI6ImRlZmF1bHQiLCJkZWFkbGluZSI6MTc3NTI4NzYxMX0='
        }
    }
}

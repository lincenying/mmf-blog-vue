var express = require('express')
var router = express.Router()
var user = require('../api/user')
var article = require('../api/article')

var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

// 首页
router.get('/', (req, res) => {
    res.render('index.html', { title: '首页' })
})

// 登录页
router.get('/login', (req, res) => {
    res.render('login.html', { title: '登录' })
})

// API
router.post('/api', multipartMiddleware, (req, res, next) => {
    var action = req.query.action || req.body.action
    if (action === 'insertUser') {
        user.insertUser(req, res, next)
    } else if (action === 'login') {
        user.login(req, res, next)
    } else if (action === 'post') {
        article.post(req, res, next)
    } else if (action === 'getArticle') {
        article.getArticle(req, res, next)
    } else if (action === 'article') {
        article.article(req, res, next)
    } else if (action === 'getArticleList') {
        article.getArticleList(req, res, next)
    } else {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
})

module.exports = router

var mongoose = require('mongoose')
var Article = mongoose.model('Article')
const isLogin = require('./islogin')
var moment = require('moment')
/**
 * 发布文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.post = (req, res) => {
    isLogin(req, res)
    var category = req.body.category,
        content = req.body.content,
        title = req.body.title
    var data = {
        title,
        category,
        content,
        visit: 0,
        comment_count: 0,
        creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
        is_delete: 0,
        timestamp: moment().format('X')
    }
    Article.createAsync(data)
    .then(result => {
        return res.json({
            code: 200,
            user_id: result._id,
            message: '发布成功'
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 编辑时, 获取单篇文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getArticle = (req, res) => {
    if (!req.query.id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    Article.findOneAsync({
        _id: req.query.id
    })
    .then(result => {
        res.json({
            code: 200,
            data: result
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}
/**
 * 前台浏览时, 获取单篇文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.article = (req, res) => {
    if (!req.query.id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    Promise.all([
        Article.findOneAsync({
            _id: req.query.id,
            is_delete: 0
        }),
        Article.findOne({
            is_delete: 0
        }).where('_id').gt(req.query.id).sort('_id').exec(),
        Article.findOne({
            is_delete: 0
        }).where('_id').lt(req.query.id).sort('-_id').exec()
    ]).then(value => {
        var json = {
            code: 200,
            data: value[0]
        }
        if (value[1]) {
            json.data.next_id = value[1]._id
            json.data.next_title = value[1].title
        }
        if (value[2]) {
            json.data.prev_id = value[2]._id
            json.data.prev_title = value[2].title
        }
        res.json(json)
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}
/**
 * 前台浏览时, 获取文章列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getArticleList = (req, res) => {
    var id = req.body.id,
        limit = req.body.limit,
        page = req.body.page,
        qs = req.body.qs
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    var data = {
            is_delete: 0
        },
        skip = (page - 1) * limit
    if (id) {
        data.categroup = id
    }
    if (qs) {
        var reg = new RegExp(qs, 'i')
        data.title = {$regex : reg}
    }

    Promise.all([
        Article.find(data).sort('-_id').skip(skip).limit(limit).exec(),
        Article.countAsync(data)
    ]).then(result => {
        var total = result[1]
        var hasNext = Math.ceil(total / limit)
        var json = {
            code: 200,
            data: {
                list: result[0],
                total,
                hasNext
            }
        }
        res.json(json)
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

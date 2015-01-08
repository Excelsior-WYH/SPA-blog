    var express = require('express'),
        router = express.Router(),
        UserController = require('./controller/UserController'),
        ArticleController = require('./controller/ArticleController'),
        IndexController = require('./controller/IndexController');

    router.get('/', IndexController.index); //　入口
    router.get('/index', ArticleController.articlesList); // 首页
    router.post('/signin', UserController.signIn);
    router.post('/post', ArticleController.postArticle);
    router.post('/article/praise', ArticleController.articlePraise);
    router.get('/article/detail', ArticleController.articleDetail);

    module.exports = router;



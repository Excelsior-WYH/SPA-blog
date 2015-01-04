    var express = require('express');
    var UserController = require('./controller/UserController');
    var ArticleController = require('./controller/ArticleController');
    var IndexController = require('./controller/IndexController');
    var router = express.Router();

    router.get('/', IndexController.index); //　入口
    router.get('/index', ArticleController.articlesList); // 首页
    router.post('/signin', UserController.signIn);
    router.post('/post', ArticleController.postArticle);

    module.exports = router;



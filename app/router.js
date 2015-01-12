    var express = require('express'),
        router = express.Router(),
        UserController = require('./controller/UserController'),
        ArticleController = require('./controller/ArticleController'),
        IndexController = require('./controller/IndexController');

    router.use(function (req, res, next) {
        if(req.method === "OPTIONS"){
            console.log("OPTIONS!");
            var headers = {};
            headers['Access-Control-Allow-Origin'] = "*";
            headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
            headers["Access-Control-Allow-Credentials"] = false;
            headers["Access-Control-Max-Age"] = "86400";
            headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
            res.writeHead(200, headers);
            res.end();
        }else {
            next();
        }
    });

    router.get('/', IndexController.index); //　入口
    router.get('/index', ArticleController.articlesList); // 首页
    router.post('/signin', UserController.signIn);
    router.post('/post', ArticleController.postArticle);
    router.post('/article/praise', ArticleController.articlePraise);
    router.get('/article/detail', ArticleController.articleDetail);

    module.exports = router;



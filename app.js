
var session = require('express-session'); // session
<<<<<<< HEAD
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongo = require('mongodb'), // mongodb
    mongoose = require('mongoose'), // mongoose
    mongoStore = require('connect-mongo')(session), // session持久化
    ejs = require('ejs');

    ejs.open = "{{";
    ejs.close = "}}";
=======
var mongo = require('mongodb'); // mongodb
var mongoose = require('mongoose'); // mongoose
var mongoStore = require('connect-mongo')(session); // session持久化
var _ = require('underscore'); // 引入underscore
>>>>>>> 592c6cae0907e46d7d74739cec4dafd9a966e85a

// express入口
var app = express(); 

// 连接数据库
var dbConfig = "mongodb://localhost/excelsior";
    mongoose.connect(dbConfig);

// 引入路由文件
var router = require('./app/router');

// 视图模板设置
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');


app.use(favicon(__dirname + '/public/favicon.ico')); // icon图标
app.use(logger('dev')); // 日志记录
app.use(bodyParser.json()); // 解析JSON
app.use(bodyParser.urlencoded({extended: false})); // 解析头信息
app.use(cookieParser()); // Cookie支持
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件目录
// session存入数据库
app.use(session({
    secret: 'excelsior',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        url: dbConfig,
        colllection: "sessions"
    })
}))

// session存储
app.use(function(request, response, next){
    app.locals.userInfo = request.session.userInfo; // 用户信息存入全局变量
    next();
})

// 使用路由
app.use('/', router);
app.use('/post', router);

// 404处理
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error处理
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error/error', {
            message: err.message,
            error: err
        });
    });
}

// 错误处理
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;


    /**
     * 前台路由
     */
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'admin': 'adminSignIn',
            'admin/index': 'adminIndex',
            'admin/post': 'postArticle'
        }
    });
    var router = new Router();


    router.on('route:index', function () {
        new V_Index();
    });
    router.on('route:adminSignIn', function () {
        (function () {
            new V_SignIn();
            showWithAnimate($('#signIn'), 800);
            changeTitle('后台登录');
        })();
    });
    router.on('route:adminIndex', function () {
        var v_adminindex = new V_AdminIndex();
        v_adminindex.render();
    });
    router.on('route:postArticle', function () {
        (function () {
            new V_PostArticle();
            showWithAnimate($('#postArticle'), 800);
            changeTitle('发表文章');
        })();
    });


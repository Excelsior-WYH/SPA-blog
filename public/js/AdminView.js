
    /**
     *  后台登录
     *  @return Null
     *  @TODO 先吃烤鱼去!
     */
    var V_SignIn = Backbone.View.extend({
        el: '#container',
        initialize: function (viewData) {
            checkIsLogin(false, this, viewData);
        },
        flag: false,
        template: _.template($('#T_SignIn').html()),
        render: function (viewData) {
            var template = this.template(viewData);
            $(this.el).html(template);
            console.log(c_articles);
        },
        events: {
            'click #signInBtn': 'signInFunc' // 登录控制
        },
        signInFunc: function (event) {
            event.preventDefault();
            var _this = this;
            if(_this.flag == true) {
                console.log(_this.flag);
            }
            _this.flag = true;
            var userInfo = $('#signInForm').serialize();
            var m_user = new M_User();
                if(_this.flag){
                m_user.save(userInfo, {
                    success: function (user, response) {
                        _this.flag = false;
                        if(response.status === 200) {
                            userInfo.id = user.toJSON().data._id;
                            c_users.add(userInfo); // Push Collection
                            router.navigate('/admin/post', true);
                        }else {
                            $('#signIn input').css('border', '1px solid red');
                        }
                    },
                    error: function (model, error) {
                        console.log(error);
                    }
                })
            }
        }
    });


    /**
     *  后台首页
     */
    var V_AdminIndex = Backbone.View.extend({
        el: '#container',
        template: _.template($('#T_AdminIndex').html()),
        render: function () {
            var template = this.template();
            $(this.el).html(template);
        },
        events: {

        }
    })

    /**
     *  发表文章页面
     */
    var V_PostArticle = Backbone.View.extend({
        el: '#container',
        initialize: function (viewData) {
            checkIsLogin(true, this, viewData);
        },
        template: _.template($('#T_PostArticle').html()),
        render: function (viewData) {
            var template = this.template(viewData);
            $(this.el).html(template);
        },
        events: {
            'click #postArticleBtn': 'postArticleFunc'
        },
        postArticleFunc: function (event) {
            event.preventDefault();
            var articleInfo = $('#postArticleForm').serialize(),
                m_article = new M_Article();

            m_article.set(articleInfo, {
                error: function (model, error) {
                    alert(error);
                }
            });
            m_article.save(articleInfo, {
                success: function (model, resposne) {

                },
                error: function (){

                }
            })
        }
    })


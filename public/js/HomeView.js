
    var V_Header = Backbone.View.extend({
        template: _.template($('#T_Header').html()),
        events: {
            'touchstart #phoneNavShowBtn': 'showPhoneNavFunc' // 菜单显示
        },
        render: function (event) {

        },  
        showPhoneNavFunc: function (event) {
            alert(1);
        }
    });
    var V_Footer = Backbone.View.extend({
        template: _.template($('#T_Footer').html()),
        initialize: function () {
        },
        events: {
            'click #goTop i': 'goTopFunc'
        },
        goTopFunc: function (event) {
            alert(1);
        }
    });

    var v_header = new V_Header();
    var v_footer = new V_Footer();

    /**
     *  首页视图
     */
    var V_Index = Backbone.View.extend({
        el: '#container',
        template: _.template($('#T_Index').html()),
        initialize: function () {
            this.render();
        },
        flag: true,
        render: function () {
            var that = this;
            var v_header = new V_Header();
            $(that.el).html(v_header.template()); // 头部
            c_articles.fetch({
                success: function (collection, response) {
                    if(collection.models){
                        var template = that.template({articles: response});
                        $(that.el).append(template); // 主体
                        $(that.el).append(v_footer.template()); // 尾部
                        $.each($('#articles article'), function (index, article) {
                            index % 2 === 0 ? that.articleShowAnimate(article, 'left') : that.articleShowAnimate(article, 'right');
                        });
                    }
                },
                error: function () {

                }
            });
        },
        events: {
            'touchstart #phoneNavShowBtn': 'showPhoneNavFunc', // 菜单显示
            'touchstart #phoneNavHideBtn': 'hidePhoneNavFunc', // 菜单隐藏
            'touchstart #phoneNav': 'hidePhoneNavToo',
            'click #articles article h2': 'articleDetailFunc', // 跳转详情页
            'click #articles .comment': 'postCommentFunc', // 发表评论
            'click #articles .praise': 'articlePraiseFunc', // 发表评论
            'DOMMouseScroll window': 'showGoTopBtnFunc', // 显示回到顶部按钮
            'touchstart #goTop i': 'goTopFunc',
            'click #goTop i': 'goTopFunc'
        },
        articleShowAnimate: function (element, position) {
            $(element).css(position, -5 + 'rem');
            switch (position) {
                case 'left':
                    $(element).animate({
                        'opacity': 1,
                        'left': 0
                    }, {
                        easing: 'easeInOutQuad',
                        duration: 1000,
                        complete: function () {
                            // $(element).css({'position': 'auto'});
                        }
                    });
                case 'right':
                    $(element).animate({
                        'opacity': 1,
                        'right': 0
                    }, {
                        easing: 'easeInOutQuad',
                        duration: 1000,
                        complete: function () {

                        }
                    });
            }
        },
        showPhoneNavFunc: function (event) {
            event.preventDefault();
            var that = this;
            var $phoneNav = $('#phoneNav');
            $phoneNav.css('height', $(window).height());
            $phoneNav.animate({
                'opacity': 1,
                'left': 0
            }, {
                easing: 'easeInOutQuad',
                duration: 350,
                complete: function () {
                    $('body').css('overflow-y', 'hidden');
                }
            });
        },
        hidePhoneNavFunc: function (event) {
            $('#phoneNav').animate({
                'opacity': 0,
                'left': -20 + 'rem'
            }, {
                easing: 'easeInOutQuad',
                duration: 350,
                complete: function () {
                   $('body').css('overflow-y', 'auto');
                }
            });
        },
        hidePhoneNavToo: function (event) {
            if (parseInt($('#phoneNav').css('opacity')) == 1) {
                var _this = this;
                if ($(event.target) != $('#phoneNav')){
                    console.log($(event.target));
                    console.log($('#phoneNav'))
                }else {
                    console.log(event.target)
                }
            }
        },
        articleDetailFunc: function (event) {
            event.preventDefault();
            router.navigate('detail/' + $(event.currentTarget).data('id'), true);
        },
        postCommentFunc: function (event) {
            event.preventDefault();
            var _this = this;
            var _id = $(event.currentTarget).data('id');
            router.navigate('detail/' + 2, true);
        },
        articlePraiseFunc: function (event) {
            var _this = this;
            var self = $(event.currentTarget); // 点击SPAN元素
            m_praise.save({articleID: self.data('id')}, {
                success: function (model, response) {
                    if(response.status === 100){
                        alert(response.info);
                    }else {
                        self.find('i').css('color', '#E87A90').html('&#xe60e;');
                        self.find('b').html(parseInt(self.find('b').html()) + 1);
                    }
                },
                error: function (model, response) {

                }
            });
        },
        goTopFunc: function (event) {
            $('html, body').animate({
                'scrollTop': 0
            });
        }
    });
    

    /**
     * 文章详情页
     * @param  {[type]} [description]
     * @param  {[type]} [description]
     * @param  {[type]} [description]
     * @param  {[type]} [description]
     * @return {[type]} [description]
     */
    var V_Detail = Backbone.View.extend({
        el: '#container',
        initialize: function (_id) {
            this.render(_id);
        },
        template: _.template($('#T_ArticleDetail').html()),
        events: {
            'touchstart #phoneNavShowBtn': 'showPhoneNavFunc', // 菜单显示
            'touchstart #phoneNavHideBtn': 'hidePhoneNavFunc', // 菜单隐藏
        },
        render: function (_id) {
            var that = this;
            $(this.el).html(v_header.template()); // 头部
            if(c_articles.get(_id) === undefined) {
                c_articles.fetch({
                    success: function (collection, response) {
                        collection.models !== undefined ? that.pushViewData(_id, 10) : alert('false');
                    }
                });
            }else {
                that.pushViewData(_id);
            }
        },
        showPhoneNavFunc: function (event) {
            event.preventDefault();
            var that = this;
            var $phoneNav = $('#phoneNav');
            $phoneNav.css('height', $(window).height());
            $phoneNav.animate({
                'opacity': 1,
                'left': 0
            }, {
                easing: 'easeInOutQuad',
                duration: 350,
                complete: function () {
                    $('body').css('overflow-y', 'hidden');
                }
            });
        },
        hidePhoneNavFunc: function (event) {
            $('#phoneNav').animate({
                'opacity': 0,
                'left': -20 + 'rem'
            }, {
                easing: 'easeInOutQuad',
                duration: 350,
                complete: function () {
                   $('body').css('overflow-y', 'auto');
                }
            });
        },
        pushViewData: function (_id, number) {
            var template = this.template({article: c_articles.get(_id).attributes});
            $(this.el).append(template);
            // alert($('#article article').width());
            // alert();
            // var $article = $('#article article');
            // var height = $article.css('height');
            // $article.css('height', 0);
            // $article.animate({
            //     'opacity': 1,
            //     'height': height + number
            // }, {
            //     easing: 'easeInOutQuad',
            //     duration: 2700
            // });
            $(this.el).append(v_footer.template()); // 尾部
        },
        events: {

        }
    });







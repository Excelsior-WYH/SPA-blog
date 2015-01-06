
    /**
     *  首页视图
     */
    var V_Index = Backbone.View.extend({
        el: '#container',
        template: _.template($('#T_Index').html()),
        initialize: function (viewData) {
            var _this = this;
            c_articles.fetch({
                success: function (collection, response) {
                    if(collection.models){
                        _this.render({articles: response});
                    }else {
                        viewData = {};
                    }
                },
                error: function () {

                }
            });
        },
        render: function (viewData) {
            var template = this.template(viewData);
            $(this.el).html(template);
        },
        events: {
            'touchstart #phoneNavShowBtn': 'showPhoneNavFunc', // 菜单显示
            'touchstart #phoneNavHideBtn': 'hidePhoneNavFunc', // 菜单隐藏
            'touchstart #phoneNav': 'hidePhoneNavToo',
            'click #articles .comment': 'postCommentFunc', // 发表评论
            'click #articles .praise': 'articlePraiseFunc' // 发表评论
        },
        showPhoneNavFunc: function (event) {
            event.preventDefault();
            var $phoneNav = $('#phoneNav');
            $phoneNav.css('height', $(window).height());
            $phoneNav.animate({
                'opacity': 1,
                'left': 0
            }, {
                easing: 'easeInOutQuad',
                duration: 350,
                complete: function () {
                    // /**something**/
                    // document.addEventListener('touchmove', function(event) {
                    //     if(event.target.type == 'range') return;
                    //     event.preventDefault();
                    // })
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
                    /**something**/
                    // document.addEventListener('touchmove', function(event) {
                    //     !event.preventDefault();
                    //     return true;
                    // });
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
        postCommentFunc: function (event) {
            event.preventDefault();
            var _this = this;
            var _id = $(event.currentTarget).data('id');
            console.log(c_articles.get(_id));
            router.navigate('detail/' + 2, {trigger: true});
        },
        articlePraiseFunc: function (event) {
            var _this = this;
            var self = $(event.currentTarget); // 点击SPAN元素
            m_praise.set({articleID: self.data('id')});
            m_praise.save({articleID: self.data('id')},{
                success: function (model, response) {
                    console.log(model);
                    console.log(response);
                },
                error: function (model, response) {

                }
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
    // var V_Detail = Backbone.View.extend({
    //     el: '#container',
    //     initialize: function () {

    //     },
    //     template: _.template($('#T_ArticleDetail')),
    //     render: function () {
    //         var template = this.template;

    //     }

    // }) 







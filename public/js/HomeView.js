
    /**
     *  首页视图
     */
    var V_Index = Backbone.View.extend({
        el: '#container',
        template: _.template($('#T_Index').html()),
        constructor: function (viewData) {
            var _this = this;
            c_articles.fetch({
                success: function (collection, response) {
                    if(response.status === 200){
                        _this.render({articles: response.articles});
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
            'click #articles span:eq(2)': 'postCommentFunc', // 发表评论
            'click #articles span:eq(3)': 'articlePraiseFunc' // 发表评论
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
                console.log(_this)
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
            router.navigate('/detail/' + 2);
        },
        articlePraiseFunc: function (event) {
            event.preventDefault();
            console.log($(event.target));
            // $(event.target).animate({
            //     'fontSize': 1.2 + 'rem'
            // }, 'slow');
            // $(event.target).html('&#xe60e;');
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
        initialize: function () {

        },
        template: _.template($('#T_ArticleDetail')),
        render: function () {
            var template = this.template;

        },

    }) 







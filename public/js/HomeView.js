

    /**
     *  首页视图
     */
    var V_Index = Backbone.View.extend({
        el: '#content',
        template: _.template($('#T_Index').html()),
        initialize: function () {
            this.render();
        },
        flag: true,
        render: function () {
            var that = this;
            c_articles.fetch({
                success: function (collection, response) {
                    if(collection.models){
                        var template = that.template({articles: response});
                        $(that.el).html(template); // 主体
                        $.each($('#content article'), function (index, article) {
                            index % 2 === 0 ? articleShowAnimate(article, 'left') : articleShowAnimate(article, 'right');
                        });
                    }
                },
                error: function () {

                }
            });
        },
        events: {
            'click #content .comment': 'postCommentFunc', // 发表评论
            'click #content .praise': 'articlePraiseFunc', // 发表评论
            'click #searchBtn': 'searchArticleFunc'
        },
        postCommentFunc: function (event) {
            event.preventDefault();
            var _id = $(event.currentTarget).parent().parent('h2').data('id')
            router.navigate('detail/' + _id, true);
        },
        articlePraiseFunc: function (event) {
            event.preventDefault();
            var self = $(event.currentTarget); // 点击SPAN元素
            var _id = self.parentsUntil('article').find('a').attr('href'); 
            m_praise.save({articleID: _id}, {
                success: function (model, response) {
                    if(response.status === 100){
                        alert(response.info);
                    }else {
                        self.find('i').css('color', '#E87A90').text('&#xe60e;');
                        self.find('b').text(parseInt(self.find('b').text()) + 1);
                    }
                },
                error: function (model, response) {

                }
            });
        },
        searchArticleFunc: function (event) {
            $searchInput = $('#searchInput');
            if($.trim($searchInput.val())){

            }
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
        el: '#content',
        initialize: function (_id) {
            this.render(_id);
        },
        template: _.template($('#T_ArticleDetail').html()),
        events: {
            'click .commentFormShowBtn': 'commentFormShowFunc' 
        },
        render: function (_id) {
            var that = this;
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
        pushViewData: function (_id, number) {
            var template = this.template({article: c_articles.get(_id).attributes});
            $(this.el).html(template);
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
        },
        commentFormShowFunc: function (event) {
            var $duoshuo = $('<div></div>'),
                _id = $('h2').data('id'),
                title = $('h2').text();
            $duoshuo.attr({
                'data-thread-key': _id,
                'data-title': title,
                'data-url': '127.0.0.1:3000/#detail/' + _id
            });
            DUOSHUO.EmbedThread($duoshuo);
            $('#duoshuoCommentForm').append($duoshuo).animate({
                'opacity': 1
            });
        }
    });









    /**
     *  首页视图
     */
    var V_Index = Backbone.View.extend({
        el: '#content',
        template: _.template($('#T_Index').html()),
        initialize: function () {
            this.render();
        },
        render: function () {
            var that = this;
            c_articles.fetch({
                success: function (collection, response) {
                    if(collection.models){
                        var template = that.template({articles: response});
                        $(that.el).html(template); // 主体
                    }
                },
                error: function () {

                }
            });
        },
        events: {
            'click .comment': 'postCommentFunc', // 发表评论
            'click .praise': 'articlePraiseFunc', // 发表评论
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
            // $searchInput = $('#searchInput');
            // if($.trim($searchInput.val())){

            // }
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
        },
        commentFormShowFunc: function (event) {
            
            var $duoshuoForm = $('<div></div>');

            $duoshuoForm.attr({
                'data-thread-key': $('h2').data('id'),
                'data-title': $('h2').text(),
                'data-url': '127.0.0.1:3000/#detail/' + $('h2').data('id')
            });

            DUOSHUO.EmbedThread($duoshuoForm);
            
            var $container = $('#duoshuoCommentForm'); // 容器

            if ($container.find('div').length === 0) {
                $container.append($duoshuoForm).animate({
                    opacity: 1,
                    height: 'auto'
                }, 300);
            }else {
                $container.empty();
            }
        }
    });







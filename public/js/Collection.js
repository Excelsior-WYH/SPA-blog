
    /**
     * 文章集合
     */
    var C_Articles = Backbone.Collection.extend({
        model: M_Article,
        url: '/index',
        fetchArticles: function () {
            
        }
    });


    /**
     *  用户集合
     */
    var C_Users = Backbone.Collection.extend({
        model: M_User,
        initialize: function() {
            this.bind('add', function (user) {
                $.cookie('id', user.id);
            });
            this.bind('remove', function () {
                $.removeCookie('id');
            })
        }
    });


    var c_articles = new C_Articles();
    var c_users = new C_Users();
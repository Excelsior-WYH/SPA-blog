
    var M_Index = Backbone.Model.extend({
        url: '/index',
        idAttribute: '_id',
        initialize: function(){
            this.bind('error', function (model, error) {
                alert(error.status  + " Error : " +  error.responseText);
            });
            this.bind('invalid', function (model, error) {
                console.log(error);
            })
        },
        default : {
            title : "DB",
            content : "hahaha",
            postDate: '2013'
        },
        validate : function (attributes) {
            if(attributes.user_name == '') return false;
        }
    });

    /**
     * 用户登录模型
     */
    var M_User = Backbone.Model.extend({
        url: '/signin',
        idAttribute: '_id',
        initialize: function(){
            this.bind('error', function (model, error) {
                alert(error.status  + " Error : " +  error.responseText);
            });
            this.bind('invalid', function (model, error) {
                console.log(error);
            })
        },
        default : {
            user_name : "DB",
            password : "hahaha"
        },
        validate : function (attributes) {
            if(attributes.user_name == '') return false;
        }
    });


    /**
     * 文章模型
     */
    var M_Article = Backbone.Model.extend({
        url: '/post',
        idAttribute: '_id',
        initialize: function(){
            this.bind('error', function (model, error) {
                alert(error.status  + " Error : " +  error.responseText);
            });
            this.bind('invalid', function (model, error) {
                console.log(error);
            })
        },
        default : {
            user_name : "DB",
            password : "hahaha"
        },
        validate : function (attributes) {
            if(attributes.title == '') {
                return 'buduia';
            }
        }
    })
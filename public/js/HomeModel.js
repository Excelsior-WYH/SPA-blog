	
	
	var M_Praise = Backbone.Model.extend({
        url: '/article/praise',
        initialize: function(){
            this.bind('error', function (model, error) {
                alert(error.status  + " Error : " +  error.responseText);
            });
            this.bind('invalid', function (model, error) {
                console.log(error);
            })
        },
        default : {
            articleID : "23456",
            content : "hahaha",
            postDate: '2013'
        },
        validate : function (attributes) {
            if(attributes.user_name == '') return false;
        }
    });


    var m_praise = new M_Praise();
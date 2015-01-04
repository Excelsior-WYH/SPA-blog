    var ArticleModel = require('../model/ArticleModel');

    /**
     * 发表文章
     * @param request
     * @param response
     */
    exports.postArticle = function (request, response) {
        var _articleInfo = request.body;
        var article = new ArticleModel(_articleInfo);
        article.save(function (error, article) {
            if(error !== null) {
                return response.json({status: 0});
            }else {
                return response.json({status: 200})
            }
        })
    };

    /**
     * 所有文章
     * @param request
     * @param response
     */
    exports.articlesList = function (request, response) {
        ArticleModel.findAll(function (error, articles) {
            if(error !== null){
                console.log(error);
            }else {
                return response.json({status: 200, articles: articles});
            }
        })
    };
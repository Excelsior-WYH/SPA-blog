    var ArticleModel = require('../model/ArticleModel'),
        PraiseModel = require('../model/PraiseModel');

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
                return response.status(200).json(articles);
            }
        })
    };


    /**
     * [articlePraise description]
     * @param  {[type]} request  [description]
     * @param  {[type]} response [description]
     * @return {[type]}          [description]
     */
    exports.articlePraise = function (request, response) {

        var praiseData = {
            articleID: request.body.articleID,
            userIP: request.connection.remoteAddress
        };

        PraiseModel
            .where('articleID', praiseData.articleID)
            .where('userIP', praiseData.userIP)
            .exec(function (error, praise) {
                if(praise.length !== 0) {
                    var praiseDate = praise[0].praiseDate;
                    if(checkIsPraise(praiseDate)){
                        savePraise(praiseData);
                    }else { 
                        return response.status(200).json({status: 100, info: '你今天已经点过赞了哦(*^__^*)'});
                    }
                }else {
                    savePraise(praiseData);
                }
            }
        );

        /**
         *
         * @param praiseDate
         * @returns {boolean}
         */
        function checkIsPraise(praiseDate){
            var nowDate = (new Date()).getTime(); // 当前时间戳 * 1000
            return nowDate - praiseDate.getTime() > 3600 * 24000 ? true : false;
        }

        /**
         *
         * @param praiseData
         */
        function savePraise(praiseData){
            var praise = new PraiseModel(praiseData);
            praise.save(function (error, praise) {
                if(praise) {
                    ArticleModel.findByID(praiseData.articleID, function (error, article) {
                        try{
                            if(article.praises.push(praise._id)){
                                article.praiseCount = article.praiseCount + 1;
                                article.save(function (error, article) {
                                    if(error != null) console.log(error);
                                    if(article != null) {
                                        return response.status(200).json({info: 'now点赞成功'});
                                    }
                                });
                            }
                        } catch (e){
                            return response.status(500).json({info: '网络原因!稍后再试'});
                        }
                    });
                }else {
                    return response.status(500).json({info: '网络原因!稍后再试'});
                }
            });
        }
    };

    exports.articleDetail = function (request, response) {
        var _id = request.query.id;
        ArticleModel.findByID(_id, function (error, article) {
            if(error != null) console.log(error);
            if(article) {
                return response.status(200).json(article);
            }
        });
    };


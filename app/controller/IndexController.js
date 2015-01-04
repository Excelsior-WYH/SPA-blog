	

	
    /**
     * 首页渲染入口
     * @param request
     * @param response
     * @returns {*|String}
     */
    exports.index = function (request, response) {
        response.render('index', {title: '主页'});
    };
    
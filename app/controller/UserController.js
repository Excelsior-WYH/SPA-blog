    var UserModel = require('../model/UserModel');


    /**
     * 注册业务逻辑
     * @param request
     * @param response
     */
    exports.signIn = function (request, response) {
        var _userInfo = request.body; // 用户输入信息
        UserModel.findOne({user_name: _userInfo.user_name}, function (error, userData) {
            if(error !== null) {
                console.log(error);
                return false;
            }
            if(userData === null){
                return response.json({status: 0, info: '此用户不存在'});
            }else {
                if(userData.password == _userInfo.password) {
                    request.session.userInfo = _userInfo; // 用户信息存入session中
                    return response.json({status: 200, data: userData});
                }else{
                    return response.json({status: 0, info: '此用户不存在'})
                }
            }
        })
    };


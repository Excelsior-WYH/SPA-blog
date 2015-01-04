
    /**
     */
    function showWithAnimate(element, time){
        element.animate({
            'opacity': 1
        }, {
            easing: 'easeInOutQuad',
            duration: time,
            complete: function () {

            }
        })
    }

    function changeTitle(text) {
        $('title').html(text)
    }


    function checkIsLogin(flag, that, viewData){
        if(flag == true) { // 登录才显示的页面
            if(!$.cookie('id')){
                alert('请先登录!');
                router.navigate('/admin', true);
            }else {
                that.render(viewData);
            }
        }else {
            if($.cookie('id')){ // 未登录才能显示的页面
                alert('请先退出!');
                router.navigate('/admin/index', true);
            }else {
                that.render(viewData);
            }
        }
    }
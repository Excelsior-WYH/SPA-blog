




    $(function () {
        jQuery.easing.def = 'easeInOutQuad';
        $(document).on('scroll', function () {
            if ($('body').scrollTop() > $('#header').height()) {
                $('#mainNav').css({
                    display: 'block',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 20,
                    background: '#0666c5',
                    backgroundColor: '#0767c8',
                    backgroundImage: '-webkit-linear-gradient(top,#086ed5,#055db5)',
                    borderBottom: '1px solid #044e97',
                    boxShadow: '0 1px 2px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.15)'
                });
            }else{
                $('#mainNav').hide();
            }
        });
    });

    var userAgent = {
        agent: navigator.userAgent,
        isPC : function () {
            return !this.isMobile() ? true : false;
        },
        isMobile: function () {
            return this.agent.match(/Android/i) || this.agent.match(/iphone/i) ? true : false;
        }
    }

    function deviceIsMobile (argument) {
        return $(window).width() > 310 && $(window).width() < 520  ? true : false;
    }

    function showWithAnimate(element, time){
        element.animate({
            'opacity': 1
        }, {
            duration: time,
            complete: function () {

            }
        })
    }

    function setPageTitle (text) {
        $('title').html(text)
    }


    function checkIsLogin (flag, that, viewData) {
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


    /**
     * [triggerSearchInput 搜索框切换]
     * @return {[type]} [description]
     */
    (function searchInpuSwitch () {

        var flag = false; // 锁, 默认关闭状态

        var $searchInput = $('#searchInput'),
            $searchBtn = $('#searchBtn');

        if (userAgent.isPC()) {
            $searchBtn.on('click', !flag ? _searchInputShow : _searchInputHide);
        }else if (userAgent.isMobile()) {
            touch.on($searchBtn, 'tap', !flag ? _searchInputShow : _searchInputHide);
        }

        $searchInput.on('blur', _searchInputHide);


        function _searchInputShow () {
            if (flag === false) {
                $searchInput.animate({
                    opacity: 1,
                    width: '7rem'
                }, 300, function () {
                    flag = true;
                    $searchInput.focus();
                });
            }
        }      

        function _searchInputHide () {
            if (flag === true && !!!$.trim($searchInput.val())) {
                $searchInput.animate({
                    opacity: 0,
                    width: 0
                }, 300, function () {
                    flag = false;
                });
            }
        }

    })();


    
    (function phoneNavShowFunc () {

        var $phoneNav = $('#phoneNav');

        touch.on($('#phoneNavShowBtn'), 'hold tap doubletap', function () {
            // $('#phoneNav').css('height', $(window).height());

            $phoneNav.css({'transform': 'translate3d(19.8rem, 0, 0)', 'opacity': 1});

            $('body').css('overflow-y', 'hidden');  
        });

    })();


    (function phoneNavHideFunc () {

        touch.on($('#phoneNavHideBtn'), 'hold tap doubletap', function () {

            $('#phoneNav').css({'transform': 'translate3d(-20rem, 0, 0)', 'opacity': 0});

            $('body').css('overflow-y', 'auto');  
        });

    })();


    function phoneNavHideGlobal () {
        if(parseInt($('#phoneNav').css('opacity')) == 1){
            $('document').on('click', function (event) {
                console.log($(event.target));
                console.log($(event.currentTarget));
            })
        }
    }




    function articleShowAnimate (element, position) {
        if(position == 'left') {
            $(element).css({'transform': 'translate3d(5rem, 0, 0)', 'opacity': 1});
        }else if (position == 'right') {
            $(element).css({'transform': 'translate3d(-5rem, 0, 0)', 'opacity': 1});
        }
    }


    /**
     * [returnViewTopFunc 回到顶部]
     * @return {[type]} [description]
     */
    (function toolBarFunc () {


        var $goViewed = $('.toolBar i:first'),
            $goViewTop= $('.toolBar i:last');

        userAgent.isMobile() ? touch.on($goViewed, 'tap', _goViewedFunc) : $goViewed.on('click', _goViewedFunc);
        userAgent.isPC() ? touch.on($goViewTop, 'tap', _goViewTopFunc) : $goViewTop.on('click', _goViewTopFunc);

        function _goViewTopFunc (event) {
            var $scrollTop = $('body').scrollTop();
            if($scrollTop > 50) {
                $('html, body').animate({
                    scrollTop: 0
                }, $scrollTop / 0.5);
            }
        }

        function _goViewedFunc () {
            if(!!window.location.hash) {
                history.back(-1);
            }
        }

    })();



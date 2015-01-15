




    $(function () {
        jQuery.easing.def = 'easeInOutQuad';
        $(document).on('scroll', function () {

            if ($('body').scrollTop() > $('#header').height()) {
                $('.toolBar i:last').css('opacity', 1);
                $('#mainNav').addClass('floatNav');
                $('#mainNav ul li:last').css('display', 'none');
                $('#mainNav ul').css('text-align', 'center');
                $('#mainNav ul li a').css('color', '#333');
            }else {
                $('.toolBar i:last').css('opacity', 0);
                $('#mainNav').removeClass('floatNav');
                $('#mainNav ul li:last').show();
                $('#mainNav ul').css('text-align', 'left');
                $('#mainNav ul li a').css('color', '#D9D9D9');
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





    /**
     * [returnViewTopFunc 回到顶部]
     * @return {[type]} [description]
     */
    (function toolBarFunc () {


        var $goViewed = $('.toolBar i:first'),
            $goViewTop= $('.toolBar i:last');


         if(userAgent.isPC()) {
            $goViewed.on('click', _goViewedFunc);
            $goViewTop.on('click', _goViewTopFunc);
         }

         if(userAgent.isMobile()) {
            touch.on($goViewTop, 'tap', _goViewTopFunc);
            touch.on($goViewed, 'tap', _goViewedFunc); 
         }

        function _goViewedFunc () {
            if(!!window.location.hash) {
                history.back(-1);
            }
        }   

        function _goViewTopFunc (event) {
            var $scrollTop = $('body').scrollTop();
            if($scrollTop > 100) {
                $('html, body').animate({
                    scrollTop: 0
                }, $scrollTop / 1);
            }
        }
    })();

    

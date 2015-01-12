
    (function () {
        jQuery.easing.def = 'easeInOutQuad';
    })();

    function deviceIsPc () {
        return parseInt($(window).width()) > 1000 ? true : false;
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

        if (deviceIsPc()) {
            $searchBtn.on('click', !flag ? _searchInputShow : _searchInputHide);
        }else if (deviceIsMobile()) {
            touch.on($searchBtn, 'touchstart', !flag ? _searchInputShow : _searchInputHide);
        }

        $searchInput.on('blur', _searchInputHide);


        function _searchInputShow () {
            if (flag === false) {
                $searchInput.animate({
                    opacity: 1,
                    width: '7rem'
                }, {
                    duration: 300,
                    complete: function () {
                        flag = true;
                        $searchInput.focus();
                    }
                });
            }
        }      

        function _searchInputHide () {
            if (flag === true && !$.trim($searchInput.val())) {
                $searchInput.animate({
                    opacity: 0,
                    width: 0
                }, {
                    duration: 300,
                    complete : function () {
                        flag = false;
                    }
                });
            }
        }

    })();


    
    (function phoneNavShowFunc () {

        var $phoneNav = $('#phoneNav');

        touch.on($('#phoneNavShowBtn'), 'touchstart', _phoneNavShowFunc);
        

        function _phoneNavShowFunc () {
            $phoneNav.css('height', $(window).height());
            $phoneNav.animate({
                opacity: 1,
                left: 0
            }, {
                duration: 350,
                complete: function () {
                    $('body').css('overflow-y', 'hidden');
                }
            });
        }

    })();


    (function phoneNavHideFunc () {
        $('#phoneNavHideBtn').on('click', function(){
            $('#phoneNav').animate({
                opacity: 0,
                left: '-18rem'
            }, {
                duration: 350,
                complete: function () {
                   $('body').css('overflow-y', 'auto');
                }
            });
        })
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
        $(element).css(position, -5 + 'rem').css('opacity', 0);
        switch (position) {
            case 'left':
                $(element).animate({
                    opacity: 1,
                    left: 0
                }, 2000);
            case 'right':
                $(element).animate({
                    opacity: 1,
                    right: 0
                }, 2000);
        }
    }


    /**
     * [returnViewTopFunc 回到顶部]
     * @return {[type]} [description]
     */
    (function returnViewTopFunc () {

        var returnViewTopBtn = $('.returnViewTop i');
        
        if (deviceIsMobile()) {
            touch.on(returnViewTopBtn, 'touchstart', _returnViewTopFunc);
        }else if (deviceIsPc()) {
            returnViewTopBtn.on('click', _returnViewTopFunc)
        }

        function _returnViewTopFunc (event) {
            if($('body').scrollTop() > 100) {
                $('html, body').animate({
                    scrollTop: 0
                }, 1300);
            }
        }

    })();
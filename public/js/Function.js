
    
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
    (function triggerSearchInput () {

        var $searchInput = $('#searchInput');

        $('#searchBtn').on('click', function (event) {
            parseInt($searchInput.css('width')) == 0 ? _triggerSearchInput(true) : _triggerSearchInput(false);
        });

        $searchInput.on('blur', function (event) {
            _triggerSearchInput(false);
        });


        function _triggerSearchInput (flag) {
            if(flag === true){
                $searchInput.animate({
                    'opacity': 1,
                    'width': '7rem'
                }, {
                    easing: 'easeInOutQuad',
                    duration: 300,
                    complete: function () {
                        $searchInput.focus();
                    }
                });
            }else {
                if(!$.trim($searchInput.val())){
                    $searchInput.animate({
                        'opacity': 0,
                        'width': 0
                    }, {
                        easing: 'easeInOutQuad',
                        duration: 300
                    });
                }
            }
        }
    })();


    
    (function phoneNavShowFunc () {
        var $phoneNav = $('#phoneNav');
        $('#phoneNavShowBtn').on('click', function () {
            $phoneNav.css('height', $(window).height());
            $phoneNav.animate({
                'opacity': 1,
                'left': 0
            }, {
                easing: 'easeInOutQuad',
                duration: 350,
                complete: function () {
                    $('body').css('overflow-y', 'hidden');
                }
            });
        });
    })();


    (function phoneNavHideFunc () {
        $('#phoneNavHideBtn').on('click', function(){
            $('#phoneNav').animate({
                'opacity': 0,
                'left': '-18rem'
            }, {
                easing: 'easeInOutQuad',
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
                    'opacity': 1,
                    'left': 0
                }, {
                    easing: 'easeInOutQuad',
                    duration: 2000,
                    complete: function () {
                        // $(element).css({'position': 'auto'});
                    }
                });
            case 'right':
                $(element).animate({
                    'opacity': 1,
                    'right': 0
                }, {
                    easing: 'easeInOutQuad',
                    duration: 2000,
                    complete: function () {

                    }
                });
        }
    }


    /**
     * [returnViewTopFunc 回到顶部]
     * @return {[type]} [description]
     */
    (function returnViewTopFunc () {
        $('.returnViewTop i').on('click', function () {
            $('html, body').animate({
                'scrollTop': 0
            }, {
                easing: 'easeInOutQuad',
                duration: 1300,
                complete: function () {

                }
            });
        })
    })();
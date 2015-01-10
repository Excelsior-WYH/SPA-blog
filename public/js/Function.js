
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


    function showSearchInput(){
        // var $width = parseInt($('#search').css('width'));
        // var flag = false;
        // $('#search').css({'width': 0, 'opacity': 0});
        // $('form').find('i').on('click', function (event) {
        //     if (!flag){
        //         $('#search').animate({
        //             'opacity': 1,
        //             'width': 7 + 'rem'
        //         }, {
        //             easing: 'easeInOutQuad',
        //             duration: 300,
        //             complete: function () {
        //                 $('#search').focus();
        //                 flag = true;
        //             }
        //         })
        //     }
        // });
        // if(flag) {
            
        // }
        // function hideSearchInput(){
        //     $('#search').blur(function(event){
        //         $('#search').animate({
        //             'opacity': 0,
        //             'width': 0
        //         }, {
        //             easing: 'easeInOutQuad',
        //             duration: 300,
        //             complete: function () {

        //             }
        //         })
        //     })
        // }
        $('#searchBtn').click(function(){
            alert(1);
        })
    }

    function returnViewTopFunc (event) {
        $('.returnViewTop i').on('click', function (event) {
            // event.preventDefault();
            // $('html, body').animate({
            //     'scrollTop': 0
            // });
            alert(1);
        });
    }

    function phoneNavShowFunc () {
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
    }


    function phoneNavHideFunc (event) {
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
    }

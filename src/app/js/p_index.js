/**
 * Created by Administrator on 2015/10/8.
 */
define(function (require, exports, module) {
    var $ = require("jquery");
    var template = require("artTemplate");
    var http = require("http");
    var filter = require("filter");
    require("bxslider");
    require("jqueryui");
    require("common");


    wSlideWrap();
    showNotice();
    showLastInvest();
    showLogin();
    function showLogin(){
        filter.showLoginStatus(); // 如果已经是注册状态，设置页头的登录框
        if (filter.isLogin()) {
            $("#header_my_account").attr("href", "p_account_asset.html");
        } ;
    };

    //banner--轮播
    function wSlideWrap() {
        http.post("/banner/bannerList", {}, function (resp) {
            var z = template('t:j_slide_box', {
                list: resp.data
            });
            $("#j_slide_box").append(z);
            //banner轮播
            slider = $("#j_slide_box").bxSlider({
                auto: true,
                autoControls: true,
                onSliderLoad: function () {
                    //点击后继续自动播放
                    $(".bx-default-pager a").click(function () {
                        var thumbIndex = $(".bx-default-pager a").index(this);
                        slider.goToSlide(thumbIndex);
                        slider.startAuto();
                        $(".bx-default-pager a").removeClass('active');
                        $(this).addClass('active');
                        return false;
                    });
                }
            });
        });
    };
    //公告
    function showNotice() {
        http.get("/notice/getNoticeList", {
            pageSize: 7
        }, function (resp) {
            $("#j_notice_list").html(template('t:j_notice_list', {list: resp.data}));
        });
    }

    // 散标投资ajax请求
    http.post("/loan/homePage", {pageSize: 6}, function (resp) {
        $("#j_loan_list").html(template('t:j_loan_list', {list: resp.data}));
        //进度条
        $('.ui-progressbar-mid').each(function (index, el) {
            var num = $(this).find('span').text();
            $(this).css('background-position', -parseInt(num) * 64 - (parseInt(num) + 1) * 4 + 'px 0');
        });
    });

    //点击进入公告详情页
    $(document).delegate(".notice-list", "click", function () {
        var id = $(this).attr("data-id");
        window.location.href = "p_notice_detail.html?id=" + id;
    });

    //最新投资和投资排行tab
    $(".bid .title").click(function () {
        var index = $(this).index();
        if (index === 0) {
            //最新投资
            showLastInvest();
        } else {
            //投资排行
            showInvestRank();
        }
        $(this).parent().find(".title a").removeClass("div-hover-1").addClass("div-hover-2");
        $(this).find("a").addClass("div-hover-1").removeClass("div-hover-2");
        $(this).parents(".bid").find('.bid-content').hide();
        $(this).parents(".bid").find('.bid-content').eq(index).show();
    });

    function showLastInvest() {
        http.get("/invest/newInvest", {pageSize: 8}, function (resp) {
            $("#j_last_invest").html(template('t:j_last_invest', {list: resp.data}));
        });
    }

    function showInvestRank() {
        http.get("/invest/investRank", {pageSize: 8}, function (resp) {
            $("#j_invest_rank").html(template('t:j_invest_rank', {list: resp.data}));
        });
    }
    //二维码效果
    $(".download-app").mouseover(function () {
        $(".app-png-show").stop(true, true).show(200);
    });
    $(".download-app").mouseleave(function () {
        $(".app-png-show").stop(true, true).hide(200);
    });
});

// 控制font-size尺寸
new function() {
    var _self = this;
    _self.width = 640; //设置默认最大宽度
    _self.fontSize = 100; //默认字体大小
    _self.widthProportion = function() {
        var p = document.documentElement.offsetWidth / _self.width;
        return p > 1 ? 1 : p < 0.5 ? 0.5 : p;
    };
    _self.changePage = function() {
        document.documentElement.setAttribute("style", "font-size:" + _self.widthProportion() * _self.fontSize + "px !important");
    }
    _self.changePage();
    window.addEventListener("resize", function() {
        _self.changePage();
    }, false);
};

$(function() {
    $('.wrap').show();
    // 返回顶部
    $('.return_top').click(function() {
        $('body, html').animate({
            'scrollTop': 0,
        }, 400);
    });
    $(document).scroll(function() {
        var s = $(document).scrollTop();
        if (s < 300) {
            $('.return_top').hide()
        } else {
            $('.return_top').show();
        }
    });
    // 获取头部信息里的值， 大于0就是有消息， 显示； 小于小于等于0就是无消息， 隐藏；
    var bVal = $('header .msg b').text();
    if (bVal > 0) {
        $('header .msg b').show();
    } else {
        $('header .msg b').hide();
    };
    // my.html 开始===============
    // 订单详情   大于0就是有消息， 显示； 小于小于等于0就是无消息， 隐藏；
    $('.dd_bot b').each(function(index, el) {
        var sVal = $(this).text();
        if (sVal > 0) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
    // my.html 结束===============


    // kefu.html 与 liebiao.html 开始===============
    // 点击导航改变颜色
    $('nav a').click(function() {
        $('nav a').find('img').attr('src', 'images/xiajiatou1.png').css('transform', 'rotate(0deg)');
        $(this).find('img').attr('src', 'images/xiajiatou.png').css('transform', 'rotate(180deg)');
    })
    // kefu.html 与 liebiao.html 结束===============


    // 切换换状态调用   开始===============
    // 首页
    changeClass($('.guess_a a'), 'lIndex');
    changeClass($('.guess_b a'), 'aIndex');
    // 游记、客服、列表
    changeClass($('nav a'), 'navIndex');
    changeClass($('header .second'), 's_b');
    // 目的地
    changeClass($('.ml li'), 'mlIndex');
    changeClass($('.hot a'), 'hotIndex');
    // 换状态调用   结束===============
});
// 切换状态
function changeClass(aa, bb) {
    aa.click(function() {
        aa.removeClass(bb);
        $(this).addClass(bb);
    })
}
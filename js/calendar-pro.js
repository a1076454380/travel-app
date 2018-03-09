(function() {
    var calendarDate = {};
    var riliHtml = '';
    calendarDate.today = new Date();
    calendarDate.year = calendarDate.today.getFullYear(); //褰撳墠骞�
    calendarDate.month = calendarDate.today.getMonth() + 1; //褰撳墠鏈�
    calendarDate.date = calendarDate.today.getDate(); //褰撳墠鏃�
    calendarDate.day = calendarDate.today.getDay(); //褰撳墠鍛ㄥ嚑


    //缁樺埗
    function getIndexDay() {
        isLeapYear();
        getDays();
        riliHtml = '';
        //鏈湀涓€鍙峰懆鍑�
        calendarDate.monthStart = new Date(calendarDate.year + "/" + calendarDate.month + "/1").getDay();
        //涓婁釜鏈堟墍鍗犵┖鏍兼暟
        console.log(calendarDate)
        if (calendarDate.monthStart == 0) { //鐙崰涓€琛�
            calendarDate.monthStart = 7;
        }
        //涓婃湀鏁版嵁
        for (var i = calendarDate.monthStart; i > 0; i--) {
            var dataDateStr = calendarDate.lastYear + "-" + calendarDate.lastMonth + "-" + (calendarDate.lastDays - i + 1);
            riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr + '"><span class="ht-rili-day">' + (calendarDate.lastDays - i + 1) + '</span><span class="ht-rili-money"></span></div>'
        }
        //鏈湀鏁版嵁
        for (var k = 0; k < calendarDate.days; k++) {
            var flag
            var dataDateStr = calendarDate.year + "-" + calendarDate.month + "-" + (k + 1);
            for (var d in calendarDate.opt.data) {
                var nowDate = dataDateStr;
                var dataDate = calendarDate.opt.data[d].date;
                flag = checkDate(nowDate, dataDate);
                if (flag) {
                    riliHtml += '<div class="ht-rili-td ht-rili-onclick" data-date="' + dataDateStr + '"><span class="ht-rili-day">' + (k + 1) + '</span><span class="ht-rili-money" data-money="' + calendarDate.opt.data[d].data + '">&yen;' + calendarDate.opt.data[d].data + '</span></div>';
                    break;
                }
            }
            if (!flag) {
                riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr + '"><span class="ht-rili-day">' + (k + 1) + '</span><span class="ht-rili-money"></span></div>';
            }
        }
        //涓嬫湀鏁版嵁
        for (var j = 0; j < (42 - calendarDate.days - calendarDate.monthStart); j++) { //42-宸插崰鐢ㄨ〃鏍兼暟=鍓╀綑琛ㄦ牸鏁�
            var dataDateStr = calendarDate.nextYear + "-" + calendarDate.nextMonth + "-" + (j + 1);
            riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr + '"><span class="ht-rili-day">' + (j + 1) + '</span><span class="ht-rili-money"></span></div>';
        }
        $('.ht-rili-body').append(riliHtml);
        $('.ht-rili-onclick').on('click', function() {
            dateClick(this);
        })

    }
    //鏄惁鏄棸骞�
    function isLeapYear() {
        if ((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0)) {
            calendarDate.isLeapYear = true;
        } else {
            calendarDate.isLeapYear = false;
        }
    }
    //鏃ユ湡鐐瑰嚮浜嬩欢
    function dateClick(obj) {
        $(obj).siblings().each(function() {
            $(this).removeClass('ht-rili-td-active');
        });
        $(obj).addClass('ht-rili-td-active');
    }
    //鑾峰彇涓婁釜鏈堜唤锛屾湰鏈堬紝涓嬩釜鏈堜唤淇℃伅
    function getDays() {
        //涓婃湀澶╂暟
        if (parseInt(calendarDate.month) == 1) {
            calendarDate.lastDays = new Date(calendarDate.year - 1, 12, 0).getDate();
            calendarDate.lastMonth = new Date(calendarDate.year - 1, 12, 0).getMonth() + 1;
            calendarDate.lastYear = new Date(calendarDate.year - 1, 12, 0).getFullYear();
        } else {
            calendarDate.lastDays = new Date(calendarDate.year, calendarDate.month - 1, 0).getDate();
            calendarDate.lastMonth = new Date(calendarDate.year, calendarDate.month - 1, 0).getMonth() + 1;
            calendarDate.lastYear = new Date(calendarDate.year, calendarDate.month - 1, 0).getFullYear();
        }
        //涓嬩釜鏈堝ぉ鏁�
        if (parseInt(calendarDate.month) == 12) {
            calendarDate.nextDays = new Date(calendarDate.year + 1, 1, 0).getDate();
            calendarDate.nextMonth = new Date(calendarDate.year + 1, 1, 0).getMonth() + 1;
            calendarDate.nextYear = new Date(calendarDate.year + 1, 1, 0).getFullYear();
        } else {
            calendarDate.nextDays = new Date(calendarDate.year, calendarDate.month + 1, 0).getDate();
            calendarDate.nextMonth = new Date(calendarDate.year, calendarDate.month + 1, 0).getMonth() + 1;
            calendarDate.nextYear = new Date(calendarDate.year, calendarDate.month + 1, 0).getFullYear();
        }
        //鏈湀澶╂暟
        calendarDate.days = new Date(calendarDate.year, calendarDate.month, 0).getDate();
    }
    //妫€娴嬫椂闂存槸鍚︿竴鑷�
    function checkDate(dateStr1, dateStr2) {
        var date1 = dateStr1.split("-"); //[0]year,[1]month,[2]date;
        var date2 = dateStr2.split("-"); //[0]year,[1]month,[2]date;
        if (date1[1] < 10 && date1[1].length < 2) {
            date1[1] = "0" + date1[1];
        }
        if (date1[2] < 10 && date1[2].length < 2) {
            date1[2] = "0" + date1[2];
        }
        if (date2[1] < 10 && date2[1].length < 2) {
            date2[1] = "0" + date2[1];
        }
        if (date2[2] < 10 && date2[2].length < 2) {
            date2[2] = "0" + date2[2];
        }
        date1 = date1.join("-");
        date2 = date2.join("-");
        return date1 == date2;
    }

    $.fn.extend({
        calendar: function(opt) {
            if ((opt.beginDate != undefined && opt.endDate != undefined) || (opt.data.length > 0)) {
                var beginDate = opt.data[0].date;
                var endDate = opt.data[opt.data.length - 1].date;
                calendarDate.beginYear = parseInt(beginDate.split('-')[0]); //璧峰骞�
                calendarDate.beginMonth = parseInt(beginDate.split('-')[1]); //璧峰鏈�
                calendarDate.beginDate = parseInt(beginDate.split('-')[2]); //璧峰鏃�

                calendarDate.endYear = parseInt(endDate.split('-')[0]); //缁撴潫骞�
                calendarDate.endMonth = parseInt(endDate.split('-')[1]); //缁撴潫鏈�
                calendarDate.endDate = parseInt(endDate.split('-')[2]); //缁撴潫鏃�

                calendarDate.year = parseInt(beginDate.split('-')[0]); //璁剧疆璧峰鏃ユ湡涓哄綋鍓嶆棩鏈�
                calendarDate.month = parseInt(beginDate.split('-')[1]); //璁剧疆璧峰鏃ユ湡涓哄綋鍓嶆棩鏈�
                calendarDate.date = parseInt(beginDate.split('-')[2]); //璁剧疆璧峰鏃ユ湡涓哄綋鍓嶆棩鏈�
                calendarDate.opt = opt;

            } else {
                console.log('鏈紶鍏eginDate鎴杄ndDate锛�');
            }
            //鍔犺浇瀹瑰櫒
            calendarDate.container = '<div class="ht-rili-querybox"><div class="ht-rili-datebox"><span class="ht-rili-leftarr">&lt;</span><span class="ht-rili-date"></span><span class="ht-rili-rightarr">&gt;</span></div></div><div class="ht-rili-head"><div class="ht-rili-th">周日</div><div class="ht-rili-th">周一</div><div class="ht-rili-th">周二</div><div class="ht-rili-th">周三</div><div class="ht-rili-th">周四</div><div class="ht-rili-th">周五</div><div class="ht-rili-th">周六</div></div><div class="ht-rili-body"><!--<div class="ht-rili-td"><span class="ht-rili-day">1</span><span class="ht-rili-money">&yen;100</span></div>--></div>'
            $(opt.ele).append(calendarDate.container);
            $('.ht-rili-date').html(calendarDate.year + '年' + calendarDate.month + '月');

            getIndexDay();
            $('.ht-rili-leftarr').on('click', function() {
                $('.ht-rili-body').html('');
                if (calendarDate.month == 1) {
                    calendarDate.year -= 1;
                    calendarDate.month = 12;
                } else {
                    calendarDate.month -= 1;
                }
                $('.ht-rili-date').html(calendarDate.year + '年' + calendarDate.month + '月');
                getIndexDay();
            })
            $('.ht-rili-rightarr').on('click', function() {
                $('.ht-rili-body').html('');
                if (calendarDate.month == 12) {
                    calendarDate.year += 1;
                    calendarDate.month = 1;
                } else {
                    calendarDate.month += 1;
                }
                $('.ht-rili-date').html(calendarDate.year + '年' + calendarDate.month + '月');
                getIndexDay();
            })
        },
        calendarGetActive: function() { //鑾峰彇褰撳墠閫変腑鏃ユ湡鐨勫€�
            //鏈€変腑鏃惰繑鍥瀠ndefined
            var activeEle = $(this).find(".ht-rili-td-active");
            var date = activeEle.attr("data-date");
            var money = activeEle.children(".ht-rili-money").attr("data-money");
            return data = {
                date: date,
                money: money
            }
        }
    });
})(jQuery)
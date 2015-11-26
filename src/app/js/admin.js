define(function(require, exports, module){
    //创建对象
    var oAdmin = {};

    oAdmin.init = function(){
        this.list();    //管理员列表
    };

    /**
     * 管理员列表
     * @param data
     */
    oAdmin.list = function(data){
        var json = JSON.stringify({
            page : 0,
            pageSize : 10
        });
        var data = data || json;

        $.ajax({
            url : eightUrl+'staff/query',
            type : 'post',
            dataType : 'json',
            data : data,
            contentType: "application/json; charset=utf-8",
            xhrFields: {
                withCredentials: true
            },
            beforeSend : function(xhr) {
                // json格式传输，后台应该用@RequestBody方式接受
                xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                var token = $.cookie("token");
                if (token) {
                    xhr.setRequestHeader("X-Access-Auth-Token", token);
                }
            },
            success : function(json){
                console.log(json);
                var aContent = json.content;    //返回用户数据
                var adminList = '\
                    <dt>\
                        <ul class="line">\
                            <li class="w240">用户名</li>\
                            <li class="w242">最近登录时间</li>\
                            <li class="w242">用户状态</li>\
                            <li class="w240 no-boder">操作</li>\
                        </ul>\
                    </dt>';
                for(var i=0 ; i<aContent.length ; i++){
                    var adminName = aContent[i].username,    //用户名
                        time = aContent[i].updateTime,       //最近登陆时间
                        id = aContent[i].id,                 //id
                        oData = new Date(time),
                        year = oData.getFullYear(),
                        month = oData.getMonth()+ 1,
                        date = oData.getDate(),
                        hour = oData.getHours(),
                        minute = oData.getMinutes(),
                        updateYear = year+'-'+month+'-'+date,//最近登陆时间
                        updateDay = hour+':'+minute,         //最近登陆时间
                        status = aContent[i].status==1 ? '已启用' : '已禁用',//状态
                        status2 = aContent[i].status==1 ? '禁用' : '启用';  //操作
                    adminList+='\
                        <dd id="'+id+'" class="admin-list-box">\
                            <ul class="line">\
                                <li class="w240 blue">'+adminName+'</li>\
                                <li class="w242">\
                                    <span class="margin-r-10">'+updateYear+'</span>\
                                    <span>'+updateDay+'</span>\
                                </li>\
                                <li class="w242">'+status+'</li>\
                                <li class="w240 blue  no-boder">\
                                    <span class="margin-r-30 admin-edit">编辑</span>\
                                    <span>'+status2+'</span>\
                                    </li>\
                            </ul>\
                        </dd>';
                }
                $('.cus-service').html(adminList);
            }
        })
    };
    oAdmin.query = function(){
        var username = $('.admin-username').val(),    //用户名
            startTime = $('.start-time').val(),       //开始时间
            endTime = $('.ent-time').val(),           //结束时间
            status = 0;                               //状态码
        // 更新状态码
        $('.order-radio').each(function(){
            if( $(this).attr('checked') ){
                status = $(this).val();
            }
        });
        var data = JSON.stringify({
            realName : username,
            maxTime : endTime,
            minTime : startTime
        });
        this.list(data);
    };

    exports.admin = oAdmin;
});
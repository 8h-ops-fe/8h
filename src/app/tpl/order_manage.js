/**
 * Created by hantengfei on 15/11/14.
 */
var order = '<div class="condition">\
<ul class="normol">\
    <li>\
    <span>订单号：</span>\
<input type="text" />\
    </li>\
    <li>\
    <span>收件人：</span>\
<input type="text" />\
    </li>\
    <li>\
    <span>联系电话：</span>\
<input type="text" />\
    </li>\
    </ul>\
    <ul class="ditail">\
    <li>\
    <span>下单时间：</span>\
<input type="text" />\
    <span>-</span>\
    <input type="text" />\
    </li>\
    <li>\
    <span>订单总额：</span>\
<input type="text" />\
    <span>-</span>\
    <input type="text" />\
    </li>\
    </ul>\
    <ul class="state">\
    <li>订单状态：</li>\
<li><span class="r"></span><span class="w">全部订单</span></li>\
<li><span class="r"></span><span class="w">代付款</span></li>\
<li><span class="r"></span><span class="w">已付款</span></li>\
<li><span class="r"></span><span class="w">已配货</span></li>\
<li><span class="r"></span><span class="w">已出库</span></li>\
<li><span class="r"></span><span class="w">已收货</span></li>\
<li><span class="r"></span><span class="w">订单取消</span></li>\
</ul>\
<div class="search-box"><a href="javascript:;" class="search">查询</a></div>\
</div>\
    //<!--条件END-->\
    //<!--右侧列表内容-->\
<div class="list">\
    <a href="javascript:;" class="btn">导出订单</a>\
        <!--一个商品开始-->\
    <div class="order-list">\
    <ul class="detial-state">\
    <li><span class="detial-n">订单号：</span><span class="detial-w">20151011265331214</span></li>\
<li><span class="detial-n">下单时间：</span><span class="detial-w">2015-10-31&nbsp;13:25</span></li>\
<li><span class="detial-n">下单用户：</span><span class="detial-w">12112345678</span></li>\
<li><span class="detial-n">收货人：</span><span class="detial-w">黎明黎明</span></li>\
<li><span class="detial-n">联系电话：</span><span class="detial-w">12112112121</span></li>\
<li class="detial-z"><span class="detial-n">待付款</span></li>\
</ul>\
<dl class="detial-commodity">\
    <dt><img src="../images/img.jpg"></dt>\
    <dd class="second-w">\
    <dl>\
    <dd>8H床垫×1</dd>\
<dd>1.5m×2.0m</dd>\
<dd>咖啡金</dd>\
<dd>￥2799</dd>\
<dd>订单总额：<span>￥2799</span></dd>\
</dl>\
</dd>\
<dd class="third-w">\
    <ul class="three">\
    <li>编辑订单</li>\
    <li>订单详情</li>\
    <li>物流状态</li>\
    </ul>\
    </dd>\
    <dd class="forth-btn">\
    <ul class="one">\
    <li>订单详情</li>\
    </ul>\
    </dd>\
    </dl>\
    </div>\
        //<!--一个商品结束-->\
        //<!--一个商品开始-->\
    <div class="order-list">\
    <ul class="detial-state">\
    <li><span class="detial-n">订单号：</span><span class="detial-w">20151011265331214</span></li>\
<li><span class="detial-n">下单时间：</span><span class="detial-w">2015-10-31&nbsp;13:25</span></li>\
<li><span class="detial-n">下单用户：</span><span class="detial-w">12112345678</span></li>\
<li><span class="detial-n">收货人：</span><span class="detial-w">黎明</span></li>\
<li><span class="detial-n">联系电话：</span><span class="detial-w">12112112121</span></li>\
<li class="detial-z"><span>待付款</span></li>\
</ul>\
<dl class="detial-commodity">\
    <dt><img src="../images/img.jpg"></dt>\
    <dd class="second-w">\
    <dl>\
    <dd>8H床垫×1</dd>\
<dd>1.5m×2.0m</dd>\
<dd>咖啡金</dd>\
<dd>￥2799</dd>\
<dd>订单总额：<span>￥2799</span></dd>\
</dl>\
</dd>\
<dd class="third-w">\
    <ul class="two">\
    <li>订单详情</li>\
    <li>物流状态</li>\
    </ul>\
    </dd>\
    <dd class="forth-btn">\
    <ul class="two">\
    <li>配货订单</li>\
    <li>订单详情</li>\
    </ul>\
    </dd>\
    </dl>\
    </div>\
        //<!--一个商品结束-->\
        //<!--一个商品开始-->\
    <div class="order-list">\
    <ul class="detial-state">\
    <li><span class="detial-n">订单号：</span><span class="detial-w">20151011265331214</span></li>\
<li><span class="detial-n">下单时间：</span><span class="detial-w">2015-10-31&nbsp;13:25</span></li>\
<li><span class="detial-n">下单用户：</span><span class="detial-w">12112345678</span></li>\
<li><span class="detial-n">收货人：</span><span class="detial-w">黎明</span></li>\
<li><span class="detial-n">联系电话：</span><span class="detial-w">12112112121</span></li>\
<li class="detial-z"><span>待付款</span></li>\
</ul>\
<dl class="detial-commodity">\
    <dt><img src="../images/img.jpg"></dt>\
    <dd class="second-w">\
    <dl>\
    <dd>8H床垫×1</dd>\
<dd>1.5m×2.0m</dd>\
<dd>咖啡金</dd>\
<dd>￥2799</dd>\
<dd>订单总额：<span>￥2799</span></dd>\
</dl>\
</dd>\
<dd class="third-w">\
    <ul class="one">\
    <li>订单详情</li>\
    </ul>\
    </dd>\
    <dd class="forth-btn">\
    <ul class="two">\
    <li>编辑订单</li>\
    <li>订单详情</li>\
    </ul>\
    </dd>\
    </dl>\
    </div>\
        //<!--一个商品结束-->\
        //<!--一个商品开始-->\
    </div>';


console.log(order);

var headerTpl = '<header>' +
    '<a class="icon icon-logo"></a>' +
    '<a class="icon icon-eclock_font"></a>' +
    '<aside class="right">' +
    '<div class="select select-host select-btn" data-value="US">' +
    '<div class="select_main">' +
    '<p class="select_main_text select_target"><%= language %></p>' +
    '<button class="select_main_btn select_target">' +
    '<i class="select_main_btn_icon"></i>' +
    '</button>' +
    '</div>' +
    '<ul class="select_content">' +
    '<li class="select_content_list">' +
    '<a hreflang="zh" class="select_content_list_value" data-value="CN">中文</a>' +
    '</li>' +
    '<li class="select_content_list">' +
    '<a hreflang="tr" class="select_content_list_value" data-value="TR">Türkçe</a>' +
    '</li>' +
    '<li class="select_content_list">' +
    '<a hreflang="es" class="select_content_list_value" data-value="ES">español</a>' +
    '</li>' +
    '<li class="select_content_list">' +
    '<a hreflang="pt" class="select_content_list_value" data-value="PT">português</a>' +
    '</li>' +
    '<li class="select_content_list">' +
    '<a hreflang="en" class="select_content_list_value" data-value="US">English</a>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</aside>' +
    '</header>';

var articleTpl = '<article>' +
    '<section class="eclock-view">' +
    '<img class="eclock-view_img" src="/eclock/img/eclock_view.png">' +
    '<dl class="eclock-view_info">' +
    '<dt class="eclock-view_info_title">Eclock</dt>' +
    '<dd class="eclock-view_info_item"><%= introduction %></dd>' +
    '<dd>' +
    '<% if (language != "español") { %>' +
    '<a class="eclock-view_info_download" target="_blank" href="https://chrome.google.com/webstore/detail/hnplpedplphoahacdlbcepdokaakokno"><%= download %></a>' +
    '<% } else { %>' +
    '<a style="width:270px"  class="eclock-view_info_download" target="_blank" href="https://chrome.google.com/webstore/detail/hnplpedplphoahacdlbcepdokaakokno"><%= download %></a>' +
    '<% } %>' +
    '</dd>' +
    '</dl>' +
    '</section>' +
    '<section class="choose-me cf">' +
    '<dl class="left choose-me_info">' +
    '<dt class="choose-me_info_title"><%= description %></dt>' +
    '<dd class="choose-me_info_item"><%= chooseMe %></dd>' +
    '</dl>' +
    '<span class="icon icon-gear right choose-me_info_img"></span>' +
    '</section>' +
    '</article>';

var ulTpl = '<ul>' +
    '<li>' +
    '<p class="img">' +
    '<span class="icon icon-message"></span>' +
    '</p>' +
    '<dl>' +
    '<dt class="title"><%= meeting.title %></dt>' +
    '<dd class="item"><%= meeting.details %></dd>' +
    '</dl>' +
    '</li>' +
    '<li>' +
    '<p class="img">' +
    '<span class="icon icon-clock"></span>' +
    '</p>' +
    '<dl>' +
    '<dt class="title"><%= tellTime.title %></dt>' +
    '<dd class="item"><%= tellTime.details %></dd>' +
    '</dl>' +
    '</li>' +
    '<li>' +
    '<p class="img">' +
    '<span class="icon icon-calendar"></span>' +
    '</p>' +
    '<dl>' +
    '<dt class="title"><%= memorandum.title %></dt>' +
    '<dd class="item"><%= memorandum.details %></dd>' +
    '</dl>' +
    '</li>' +
    '</ul>';

var footerTpl = '<footer>' +
    '<p class="filing"><%= filing %></p>' +
    '</footer>';

var tpl = headerTpl + articleTpl + ulTpl + footerTpl;

define("tpl", [], function(){
    return tpl;
});

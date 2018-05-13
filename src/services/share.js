var angular = require('angular');
module.exports = angular.module('share',[]).factory('wxshare',wxshare).name;

wxshare.$inject = ['$http','$q'];

function wxshare($http,$q){
  return {

        shareTimeline:function(title,link,imgUrl){
            var deferred = $q.defer();
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () { 
                    // 用户确认分享后执行的回调函数
                    deferred.resolve("分享成功");
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数
                    deferred.resolve("分享取消");
                }
            });
            return deferred.promise;
        },
        shareAppMessage:function(title,desc,link,imgUrl,type,dataUrl){
            type = type||'';
            dataUrl = dataUrl||'';
            var deferred = $q.defer();
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                type: type, // 分享类型,music、video或link，不填默认为link
                dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                trigger:function(res){
                    //res.errMsg
                    deferred.notify("分享触发");
                },
                success: function (res) { 
                    // 用户确认分享后执行的回调函数
                    deferred.resolve("分享成功");
                },
                cancel: function (res) { 
                    // 用户取消分享后执行的回调函数
                    deferred.reject("分享取消");
                },
                fail:function(res){
                    deferred.reject("分享失败");
                }
            });
            return deferred.promise;
        },
        shareQQ:function(title,desc,link,imgUrl){
            var deferred = $q.defer();
            wx.onMenuShareQQ({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                trigger:function(res){
                    //res.errMsg
                    deferred.notify("分享触发");
                },
                success: function (res) { 
                    // 用户确认分享后执行的回调函数
                    deferred.resolve("分享成功");
                },
                cancel: function (res) { 
                    // 用户取消分享后执行的回调函数
                    deferred.reject("分享取消");
                },
                fail:function(res){
                    deferred.reject("分享失败");
                }
            });
            return deferred.promise;
        },
        shareWeibo:function(title,desc,link,imgUrl){
            var deferred = $q.defer();
            wx.onMenuShareWeibo({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                trigger:function(res){
                    //res.errMsg
                    deferred.notify("分享触发");
                },
                success: function (res) { 
                    // 用户确认分享后执行的回调函数
                    deferred.resolve("分享成功");
                },
                cancel: function (res) { 
                    // 用户取消分享后执行的回调函数
                    deferred.reject("分享取消");
                },
                fail:function(res){
                    deferred.reject("分享失败");
                }
            });
            return deferred.promise;
        },
        shareQZone:function(title,link,imgUrl){
            var deferred = $q.defer();
            wx.onMenuShareQZone({
                title: title, // 分享标题
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                trigger:function(res){
                    //res.errMsg
                    deferred.notify("分享触发");
                },
                success: function (res) { 
                    // 用户确认分享后执行的回调函数
                    deferred.resolve("分享成功");
                },
                cancel: function (res) { 
                    // 用户取消分享后执行的回调函数
                    deferred.reject("分享取消");
                },
                fail:function(res){
                    deferred.reject("分享失败");
                }
            });
            return deferred.promise;
        },
        hideWxMenuItems:function(){
            var deferred = $q.defer();
            wx.hideOptionMenu();
            wx.hideMenuItems({
                menuList: [
                    "menuItem:share:appMessage",
                    "menuItem:share:timeline",
                    "menuItem:share:qq",
                    "menuItem:share:weiboApp",
                    "menuItem:share:facebook",
                    "menuItem:share:QZone",
                    "menuItem:openWithQQBrowser",
                    "menuItem:openWithSafari"
                ],
                trigger:function(res){
                    //res.errMsg
                    deferred.notify("隐藏按钮触发");
                },
                success: function (res) { 
                    // 用户确认分享后执行的回调函数
                    deferred.resolve("隐藏按钮成功");
                },
                cancel: function (res) { 
                    // 用户取消分享后执行的回调函数
                    deferred.reject("隐藏按钮取消");
                },
                fail:function(res){
                    deferred.reject("隐藏按钮失败");
                }
                
            });
            return deferred.promise;
        },

        showWxMenuItems:function(){
            var deferred = $q.defer();
            wx.showOptionMenu();
            wx.showMenuItems({
                menuList: [
                    "menuItem:share:appMessage",
                    "menuItem:share:timeline",
                    "menuItem:share:qq",
                    "menuItem:share:weiboApp",
                    "menuItem:share:facebook",
                    "menuItem:share:QZone",
                    "menuItem:openWithQQBrowser",
                    "menuItem:openWithSafari"
                ],
                trigger:function(res){
                    //res.errMsg
                    deferred.notify("显示按钮触发");
                },
                success: function (res) { 
                    // 用户确认分享后执行的回调函数
                    deferred.resolve("显示按钮成功");
                },
                cancel: function (res) { 
                    // 用户取消分享后执行的回调函数
                    deferred.reject("显示按钮取消");
                },
                fail:function(res){
                    deferred.reject("显示按钮失败");
                }
            });
            return deferred.promise;
        }

    };
}


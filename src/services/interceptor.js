var layer = require('layer');
var layercss = require('layercss');
var angular = require('angular');
module.exports = angular.module('Interceptor',[]).factory('HttpInterceptor',httpInterceptor).name;

httpInterceptor.$inject = ['$rootScope','$q','$timeout'];

function httpInterceptor($rootScope,$q,$timeout){
  var loading;
  return {
   'request': function(requestConfig) {
       $timeout(function(){
          loading = layer.open({
            type: 2
            ,className:'pop-login'
            ,shadeClose:false
            ,style:''
          });
       },10)
       return requestConfig;
    },
    'requestError':function(reason){
        $timeout(function(){
          loading = layer.open({
              type: 1
              ,content: '数据加载失败'
              ,anim: 'scale'
              ,style: 'position:fixed; top:0; left:0; width: 100%; height: 200px; padding:10px 0; border:none;'
          });
        })
    },
    'response': function(response) {
       $timeout(function(){layer.close(loading);},20);
       if(response.data && response.data.msg == "用户未登录"){
          $rootScope.openBindPhone();
          // var returnUrl = encodeURIComponent(window.location.href);
          // window.location.href = "/auth/login?returnUrl=" + returnUrl;
       }
       return response;
    },
    'responseError':function(reason){}
  };
}
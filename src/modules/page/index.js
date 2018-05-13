
require('../../assets/css/global.less');
require('../../assets/css/page/main.less');
require('../../assets/js/head.common.js');
var angular = require('angular');
var zdutils = require('utility-func');

var service = require('../../services');
var controller = require('../../controllers');
var directive = require('../../directives');
var filter = require('../../filters');

angular.module('appLogin',[controller,service,directive,filter,'appLogin.controllers','appLogin.services'])
.constant('APIPrefix','http://chunzhen.f3322.net:18184')
.config(['$httpProvider',function($httpProvider){
  $httpProvider.interceptors.push('HttpInterceptor');
  // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  //$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
}]);
angular.module('appPage.controllers', [])
.controller('ExampleController', ["$scope", "$rootScope", "service1",function ($scope, $rootScope,service1) {

}]);
angular.module('appPage.services', [])
.factory("service1", ["$http","$q", function ($http,$q) {
    return{
        func:function(){
            var deferred = $q.defer();
            if(true){
                deferred.resolve();
            }else{
                deferred.reject();
            }
            return deferred.promise;
        }
    }
    
}]);

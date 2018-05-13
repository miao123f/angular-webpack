var angular = require('angular');
module.exports = angular.module('auth',[]).factory('auth',auth).name;

auth.$inject = ['$http','$q'];

function auth($http,$q){
  return {
       bindPhone:function(phone,code,openId){
        var deferred = $q.defer();
        $http.post('/ajax/Reg/RegLogin.ashx',{phone:phone,code:code,openid:openId}).then(function(result){
            if(result.data.code == 200){
                deferred.resolve(result.data);
            }else{
                deferred.reject(result.data.msg);
            }
        });
        return deferred.promise;
       },
       getValCode:function(phone){
        var deferred = $q.defer();
        $http.post('/ajax/sms/getValidateCode.ashx',{phone:phone}).then(function(result){
            if(result.data.code == 200){
                deferred.resolve(result.data.msg);
            }else{
                deferred.reject(result.data.msg);
            }
        });
        return deferred.promise;
       }
    };
}


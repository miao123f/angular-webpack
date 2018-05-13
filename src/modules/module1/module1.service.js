module.exports = ['$http','$q',function($http,$q){
  return {
    getInfo:function(){
      var deferred = $q.defer();
      if(result.data.code == 200){
          deferred.resolve();
        }else{
          deferred.reject();
        }
      return deferred.promise;
    }
  }
}];
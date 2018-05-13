module.exports.providerConfig = ['$locationProvider','$httpProvider',function($locationProvider,$httpProvider){
  $httpProvider.interceptors.push('HttpInterceptor');
}];

module.exports.routing = ['$routeProvider',function($routeProvider){

}];


module.exports.runConfig = ['$rootScope','$location','$timeout',function($rootScope,$location,$timeout){

}];

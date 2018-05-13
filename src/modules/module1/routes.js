module.exports = ['$routeProvider',function($routeProvider){
  $routeProvider.when('/module1/home',{
    template:require('./home.html'),
    controller:'homeController'
  });
}];
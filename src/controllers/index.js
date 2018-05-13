var angular = require('angular');
module.exports = angular.module('app.controller',[])
.controller('exampleController',exampleController)
.name;

exampleController.$inject = ['$scope'];

function exampleController($scope){
  
}
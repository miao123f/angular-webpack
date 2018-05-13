var angular = require('angular');
module.exports = angular.module('app.directive',[])
.directive('expampleDirective',expampleDirective)
.name;

expampleDirective.$inject = [];

function expampleDirective(){
   return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: '',
            templete: '',
            controller: '',
            link: function(scope, elm, attrs) {

            }
        }
}
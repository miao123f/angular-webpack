var angular = require('angular');
var ngRoute = require('angular-route');
require('./module1.less');

module.exports = angular.module('app.module1',[ngRoute])
  .config(require('./routes'))
  .controller('homeController',require('./home.controller'))
  .factory('module1',require('./module1.service'))
  .name;
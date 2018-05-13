var interceptor = require('./interceptor');
var auth = require('./auth');

var angular = require('angular');
module.exports = angular.module('app.service',[interceptor,auth]).name;
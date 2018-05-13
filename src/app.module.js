require('./assets/css/global.less');
require('./assets/js/head.common.js');
var zdutils = require('utility-func');
var angular = require('angular');
var ngRoute = require('angular-route');
var ngAnimate = require('angular-animate');
var ngModal = require('angular-modal');
var ngRap = require('angular-rap');

var config = require('./app.config');

var service = require('./services');
var controller = require('./controllers');
var directive = require('./directives');
var filter = require('./filters');

var module1 = require('./modules/module1');

module.exports = angular.module('app',[ngRoute,ngAnimate,ngRap,ngModal,service,controller,directive,filter,module1])
.config(config.providerConfig)
.config(config.routing)
.run(config.runConfig)
.name;

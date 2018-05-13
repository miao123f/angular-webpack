var angular = require('angular');
module.exports = angular.module('app.filter',[])
.filter('trustHtml',trustHtml)
.filter('trustHtml2',trustHtml2)
.filter('trustUrl',trustUrl)
.name;

trustHtml.$inject = ['$sce'];

function trustHtml($sce){
   return function(input) {
    return $sce.trustAsHtml(input);
  }
}


trustHtml2.$inject = ['$sce'];

function trustHtml2($sce){
   return function(input) {
    var t = input.replace(/\n/g, "<br />");
    return $sce.trustAsHtml(t);
  }
}


trustUrl.$inject = ['$sce'];

function trustUrl($sce){
   return function(recordingUrl) {
    return $sce.trustAsResourceUrl(recordingUrl);
  }
}

'use strict';

var rootUrl = "http://172.28.32.102:8001";

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.status',
  'myApp.cluster',
  'myApp.kong',
  'myApp.apis',
  'myApp.consumers',
  'myApp.plugins',
  'myApp.help',
  'myApp.settings',
  'myApp.version',
  'LocalStorageModule',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/kong'});
}]).
config(function (localStorageServiceProvider) {
  localStorageServiceProvider
      .setPrefix('kongbrowser')
      .setStorageType('localStorage')
      .setNotify(true, true)
})
.controller('RootCtrl', ['$scope', 'localStorageService', function($scope, localStorageService) {
  $scope.node = '';
  $scope.$on('node', function(d, node) {
    $scope.node = node;
  });
}]);
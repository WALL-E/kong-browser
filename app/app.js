'use strict';

var rootUrl = "http://172.28.32.102:8001";

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.status',
  'myApp.cluster',
  'myApp.kong',
  'myApp.apis',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/kong'});
}]);

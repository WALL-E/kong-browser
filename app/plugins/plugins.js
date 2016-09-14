'use strict';

angular.module('myApp.plugins', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plugins', {
    templateUrl: 'plugins/plugins.html',
    controller: 'PluginsCtrl'
  });
}])

.controller('PluginsCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("enter PluginsCtrl");
  $http({
    method: 'GET',
    url: $scope.rootUrl + '/plugins'
  }).success(function(data, status, headers, config){
    $scope.plugins = data;
    console.log($scope.plugins);
  }).error(function(data,status,headers,config){
    console.log(status);
  });
}]);
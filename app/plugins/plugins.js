'use strict';

angular.module('myApp.plugins', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plugins', {
    templateUrl: 'plugins/plugins.html',
    controller: 'PluginsCtrl'
  });
}])

.controller('PluginsCtrl', ['$scope', '$http', function($scope, $http) {
  $http({
    method: 'GET',
    url: rootUrl + '/plugins'
  }).success(function(data, status, headers, config){
    $scope.plugins = data;
    console.log($scope.plugins);
  }).error(function(data,status,headers,config){
    console.log(status);
  });
}]);
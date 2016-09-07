'use strict';

angular.module('myApp.status', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/status', {
    templateUrl: 'status/status.html',
    controller: 'StatusCtrl'
  });
}])

.controller('StatusCtrl', ['$scope', '$http', function($scope, $http) {
  $http({
    method: 'GET',
    url: rootUrl + '/status'
  }).success(function(data, status, headers, config){
    $scope.status = data;
    console.log($scope.status);
  }).error(function(data,status,headers,config){
    console.log(status);
  });
}]);
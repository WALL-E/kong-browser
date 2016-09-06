'use strict';

angular.module('myApp.cluster', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cluster', {
    templateUrl: 'cluster/cluster.html',
    controller: 'ClusterCtrl'
  });
}])

.controller('ClusterCtrl', ['$scope', '$http', function($scope, $http) {
  $http({
    method: 'GET',
    url: rootUrl + '/cluster'
  }).success(function(data, status, headers, config){
    $scope.cluster = data;
    console.log($scope.kong);
  }).error(function(data,status,headers,config){
    console.log(status);
  });
}]);
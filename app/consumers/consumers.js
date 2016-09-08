'use strict';

angular.module('myApp.consumers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/consumers', {
        templateUrl: 'consumers/consumers.html',
        controller: 'ConsumersCtrl'
    });
}])

.controller('ConsumersCtrl', ['$scope', '$http', function($scope, $http) {
    $http({
        method: 'GET',
        url: $scope.rootUrl + '/consumers'
    }).success(function(data, status, headers, config){
        $scope.consumers = data;
        console.log($scope.consumers);
    }).error(function(data,status,headers,config){
        console.log(status);
    });
}]);
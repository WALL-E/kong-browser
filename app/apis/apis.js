'use strict';

angular.module('myApp.apis', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/apis', {
        templateUrl: 'apis/apis.html',
        controller: 'ApisCtrl'
    });
}])

.controller('ApisCtrl', ['$scope', '$http', function($scope, $http) {
    $http({
        method: 'GET',
        url: rootUrl + '/apis'
    }).success(function(data, status, headers, config){
        $scope.apis = data;
        console.log($scope.apis);
    }).error(function(data,status,headers,config){
        console.log(status);
    });
}]);
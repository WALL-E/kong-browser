'use strict';

angular.module('myApp.kong', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/kong', {
        templateUrl: 'kong/kong.html',
        controller: 'KongCtrl'
    });
}])

.controller('KongCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
    console.log("enter KongCtrl");
    $scope.update = function () {
        $http({
            method: 'GET',
            url: $scope.rootUrl
        }).success(function (data, status, headers, config) {
            $scope.kong = data;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    }

    $scope.update();
}]);
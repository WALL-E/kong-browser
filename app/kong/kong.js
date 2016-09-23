'use strict';

angular.module('myApp.kong', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/kong', {
        templateUrl: 'kong/kong.html',
        controller: 'KongCtrl'
    });
}])

.controller('KongCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("enter KongCtrl");
    $scope.update = function () {
        $http({
            method: 'GET',
            url: $scope.rootUrl
        }).success(function (data) {
            $scope.kong = data;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.update();
}]);
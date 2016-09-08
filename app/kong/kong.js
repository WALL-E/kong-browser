'use strict';

angular.module('myApp.kong', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/kong', {
        templateUrl: 'kong/kong.html',
        controller: 'KongCtrl'
    });
}])

.controller('KongCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.update = function () {
        $http({
            method: 'GET',
            url: $scope.rootUrl
        }).success(function (data, status, headers, config) {
            $scope.kong = data;
            console.log($scope.kong);
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    }

    $scope.update();
}]);
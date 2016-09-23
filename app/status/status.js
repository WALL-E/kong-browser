'use strict';

angular.module('myApp.status', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/status', {
            templateUrl: 'status/status.html',
            controller: 'StatusCtrl'
        });
    }])

    .controller('StatusCtrl', ['$scope', '$http', function ($scope, $http) {
        console.log("enter StatusCtrl");

        $scope.update = function () {
            $http({
                method: 'GET',
                url: $scope.rootUrl + '/status'
            }).success(function (body) {
                $scope.status = body;
            }).error(function (data, status) {
                console.log(status);
            });
        };

        $scope.update();
    }]);
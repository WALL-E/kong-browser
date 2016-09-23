'use strict';

angular.module('myApp.cluster', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cluster', {
            templateUrl: 'cluster/cluster.html',
            controller: 'ClusterCtrl'
        });
    }])

    .controller('ClusterCtrl', ['$scope', '$http', 'ngNotify', function ($scope, $http, ngNotify) {
        console.log("enter ClusterCtrl");

        $scope.newNode = "";

        $scope.update = function () {
            $http({
                method: 'GET',
                url: $scope.rootUrl + '/cluster'
            }).success(function (body) {
                $scope.cluster = body.data;
            }).error(function (body, status) {
                console.log(status);
            });
        };

        $scope.forceLeave = function (val) {
            $http({
                method: 'DELETE',
                url: $scope.rootUrl + '/cluster',
                params:{name:val}
            }).success(function () {
                ngNotify.set("delete cluster ok");
            }).error(function () {
                ngNotify.set("delete cluster failed");
            });
        };

        $scope.add = function () {
            $http({
                method: 'POST',
                url: $scope.rootUrl + '/cluster',
                data:{address: $scope.newNode}
            }).success(function () {
                ngNotify.set("add cluster ok");
            }).error(function () {
                ngNotify.set("add cluster failed");
            });
        };

        $scope.update();
    }]);
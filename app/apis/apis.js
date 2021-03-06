'use strict';

angular.module('myApp.apis', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/apis', {
            templateUrl: 'apis/apis.html',
            controller: 'ApisCtrl'
        });
    }])

    .controller('ApisCtrl', ['$scope', '$http', 'ngNotify', '$location', function ($scope, $http, ngNotify, $location) {
        console.log("enter ApisCtrl");

        $scope.boolMap = [
            {'id': 0, 'name': 'false'},
            {'id': 1, 'name': 'ture'}
        ];
        $scope.boolArray = ['false', 'true'];

        $scope.name = "";
        $scope.requestHost = "";
        $scope.requestPath = "";
        $scope.stripRequestPath = 0;
        $scope.preserveHost = 0;
        $scope.upstreamUrl = "";

        $scope.location2plguin = function(val){
            $location.path("/plugins").search({api_id:val});
        };
        $scope.add = function () {
            var data = {
                name: $scope.name,
                request_host: $scope.requestHost,
                request_path: $scope.requestPath,
                strip_request_path: $scope.stripRequestPath === 1,
                preserve_host: $scope.preserveHost === 1,
                upstream_url: $scope.upstreamUrl
            };

            $http({
                method: 'POST',
                url: $scope.rootUrl + '/apis',
                data: data
            }).success(function () {
                $scope.update();
                ngNotify.set('add api ok!');
            }).error(function () {
                ngNotify.set("add api failed, " + angular.toJson(data));
            });
        };

        $scope.update = function () {
            $http({
                method: 'GET',
                url: $scope.rootUrl + '/apis'
            }).success(function (data) {
                $scope.apis = data;
            }).error(function () {
                console.log(status);
            });
        };

        $scope.delete = function (val) {
            $http({
                method: 'DELETE',
                url: $scope.rootUrl + '/apis' + '/' + val
            }).success(function () {
                $scope.update();
                ngNotify.set('delete api ok!');
            }).error(function () {
                ngNotify.set("delete api failed");
            });
        };

        $scope.reset = function () {
            $scope.name = "";
            $scope.requestHost = "";
            $scope.requestPath = "";
            $scope.stripRequestPath = 0;
            $scope.preserveHost = 0;
            $scope.upstreamUrl = "";
        };

        $scope.update();
    }]);
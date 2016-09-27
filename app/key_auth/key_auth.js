'use strict';

angular.module('myApp.keyAuth', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/key-auth', {
            templateUrl: 'key_auth/key_auth.html',
            controller: 'keyAuthCtrl'
        });
    }])

    .controller('keyAuthCtrl', ['$scope', '$location', '$http', 'ngNotify', function ($scope, $location, $http, ngNotify) {
        console.log("enter keyAuthCtrl");

        var api_id;
        var consumer_id;

        api_id = $location.search().api_id;
        consumer_id = $location.search().consumer_id;
        $scope.prompt = api_id == undefined && "Global" || "API";

        $scope.name = 'key-auth';
        $scope.consumerId = consumer_id !== undefined && consumer_id || '';
        $scope.key = '';

        $scope.isUndefined = function (val) {
            return val === undefined;
        };

        $scope.add = function () {
            $http({
                method: 'POST',
                url: $scope.rootUrl + '/plugins',
                data: {
                    name: $scope.name
                }
            }).success(function () {
                $scope.update();
                ngNotify.set('add plugin ok!');
            }).error(function () {
                ngNotify.set("add plugin failed");
            });
        };

        $scope.enable = function () {
            $http({
                method: 'PATCH',
                url: $scope.rootUrl + '/plugins' + '/' + $scope.id,
                data: {
                    enabled: true
                }
            }).success(function () {
                $scope.update();
                ngNotify.set('enable plugin ok!');
            }).error(function () {
                ngNotify.set("enable plugin failed");
            });
        };

        $scope.disable = function () {
            $http({
                method: 'PATCH',
                url: $scope.rootUrl + '/plugins' + '/' + $scope.id,
                data: {
                    enabled: false
                }
            }).success(function () {
                $scope.update();
                ngNotify.set('disbale plugin ok!');
            }).error(function () {
                ngNotify.set("disbale plugin failed");
            });
        };

        $scope.delete = function () {
            $http({
                method: 'DELETE',
                url: $scope.rootUrl + '/plugins' + '/' + $scope.id
            }).success(function () {
                $scope.update();
                ngNotify.set('delete plugin ok!');
            }).error(function () {
                ngNotify.set("delete plugin failed");
            });
        };

        $scope.update = function () {
            $scope.id = undefined;

            $http({
                method: 'GET',
                url: $scope.rootUrl + '/consumers'
            }).success(function (body) {
                $scope.consumers = body.data;
            }).error(function (data, status) {
                console.log(status);
            });

            $http({
                method: 'GET',
                url: $scope.rootUrl + '/plugins'
            }).success(function (body) {
                angular.forEach(body.data, function (val) {
                    if (val.name == $scope.name) {
                        $scope.enabled = val.enabled;
                        $scope.id = val.id;
                    }
                });
            }).error(function (body, status) {
                console.log(status);
            });
        };

        $scope.addKey = function () {
            $http({
                method: 'POST',
                url: $scope.rootUrl + '/consumers' + '/' + $scope.consumerId + '/' + $scope.name,
                data: {
                    key: $scope.key
                }
            }).success(function () {
                $scope.update();
                $scope.viewKey();
                ngNotify.set('add key ok!');
            }).error(function (body) {
                console.log(body);
                ngNotify.set("add key failed:" + angular.toJson(body));
            });
        };

        $scope.viewKey = function () {
            $http({
                method: 'GET',
                url: $scope.rootUrl + '/consumers' + '/' + $scope.consumerId + '/' + $scope.name + '/'
            }).success(function (body) {
                $scope.keys = body.data;
            }).error(function (data, status) {
                console.log(status);
            });
        };

        $scope.deleteKey = function (val) {
            $http({
                method: 'DELETE',
                url: $scope.rootUrl + '/consumers' + '/' + $scope.consumerId + '/' + $scope.name + '/' + val
            }).success(function () {
                $scope.viewKey();
                ngNotify.set('delete key ok!');
            }).error(function () {
                ngNotify.set('delete key failed!');
            });
        };

        $scope.update();
    }]);

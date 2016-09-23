'use strict';

angular.module('myApp.plugins', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/plugins', {
            templateUrl: 'plugins/plugins.html',
            controller: 'PluginsCtrl'
        });
    }])

    .controller('PluginsCtrl', ['$scope', '$http', 'ngNotify', '$location', function ($scope, $http, ngNotify, $location) {
        console.log("enter PluginsCtrl");
        var api_id = $location.search().api_id;
        $scope.prompt = api_id == undefined && "Global" || "API";

        $scope.location2plguin = function(val){
            $location.path("/" + val).search("api_id", api_id);
        }

        $scope.update = function () {
            $http({
                method: 'GET',
                url: $scope.rootUrl + '/plugins'
            }).success(function (body, status, headers, config) {
                $scope.plugins = new Array();
                angular.forEach(body.data, function(val, index, array){
                    console.log(val.api_id, "=?", api_id);
                    if (val.api_id == api_id) {
                        $scope.plugins.push(val);
                    }
                });
            }).error(function (data, status, headers, config) {
                console.log(status);
            });

            $http({
                method: 'GET',
                url: $scope.rootUrl + '/plugins/enabled'
            }).success(function (data, status, headers, config) {
                $scope.enabled_plugins = data.enabled_plugins;
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }

        $scope.delete = function (val) {
            $http({
                method: 'DELETE',
                url: $scope.rootUrl + '/plugins' + '/' + val,
            }).success(function (data, status, headers, config) {
                $scope.update();
                ngNotify.set('delete api ok!');
            }).error(function (data, status, headers, config) {
                ngNotify.set("delete api failed");
            });
        }

        $scope.enable = function (val) {
            $http({
                method: 'PATCH',
                url: $scope.rootUrl + '/plugins' + '/' + val,
                data: {enabled: true}
            }).success(function (data, status, headers, config) {
                $scope.update();
                ngNotify.set('enable plugin ok!');
            }).error(function (data, status, headers, config) {
                ngNotify.set("enable plugin failed");
            });
        }

        $scope.disable = function (val) {
            $http({
                method: 'PATCH',
                url: $scope.rootUrl + '/plugins' + '/' + val,
                data: {enabled: false}
            }).success(function (data, status, headers, config) {
                $scope.update();
                ngNotify.set('disbale plugin ok!');
            }).error(function (data, status, headers, config) {
                ngNotify.set("disbale plugin failed");
            });
        }

        $scope.update();
    }]);
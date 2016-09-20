'use strict';

angular.module('myApp.plugins', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/plugins', {
            templateUrl: 'plugins/plugins.html',
            controller: 'PluginsCtrl'
        });
    }])

    .controller('PluginsCtrl', ['$scope', '$http', 'ngNotify', function ($scope, $http, ngNotify) {
        console.log("enter PluginsCtrl");

        $scope.update = function () {
            $http({
                method: 'GET',
                url: $scope.rootUrl + '/plugins'
            }).success(function (data, status, headers, config) {
                $scope.plugins = data;
                console.log($scope.plugins);
            }).error(function (data, status, headers, config) {
                console.log(status);
            });

            $http({
                method: 'GET',
                url: $scope.rootUrl + '/plugins/enabled'
            }).success(function (data, status, headers, config) {
                $scope.enabled_plugins = new Array();
                angular.forEach(data.enabled_plugins, function(data,index,array){
                    $scope.enabled_plugins.push({name:index, enable:data});
                });
            }).error(function (data, status, headers, config) {
                console.log(data);
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
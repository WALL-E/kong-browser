'use strict';


// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.status',
    'myApp.cluster',
    'myApp.kong',
    'myApp.apis',
    'myApp.consumers',
    'myApp.plugins',
    'myApp.help',
    'myApp.settings',
    'myApp.version',
    'myApp.correlationId',
    'myApp.keyAuth',
    'LocalStorageModule',
    'ngNotify',
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/kong'});
    }]).
    config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('kongbrowser')
            .setStorageType('localStorage')
            .setNotify(true, true)
    })
    .controller('RootCtrl', ['$scope', 'localStorageService', '$location', function ($scope, localStorageService, $location) {
        console.log( "enter RootCtrl");
        $scope.$on('nodeEndpointChange', function (d, node) {
            $scope.node = node;
            $scope.sync();
        });


        $scope.sync = function () {
            $scope.node = localStorageService.get("node");
            if ($scope.node == undefined) {
                alert("You must set Kong admin endpoint");
                $location.path("/settings");
            } else {
                $scope.rootUrl = "http://" + $scope.node;
            }
        }
        $scope.sync();
    }]);
'use strict';

angular.module('myApp.consumers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/consumers', {
        templateUrl: 'consumers/consumers.html',
        controller: 'ConsumersCtrl'
    });
}])

.controller('ConsumersCtrl', ['$scope', '$http', 'ngNotify', function($scope, $http, ngNotify) {
    console.log("enter ConsumersCtrl");

    $scope.consumerTypeMap = [
        {'id': 0, 'name': 'username'},
        {'id': 1, 'name': 'customer_id'},
    ];
    $scope.consumerTypeArray = ['username', 'customer_id'];

    $scope.consumerType = 0;
    $scope.usernameOrCustomerId = "";

    $scope.add = function () {
        if ($scope.consumerType === 0 ){
            var data = {username: $scope.usernameOrCustomerId}
        } else {
            var data = {custom_id: $scope.usernameOrCustomerId}
        }
        $http({
            method: 'POST',
            url: $scope.rootUrl + '/consumers',
            data:data
        }).success(function (data, status, headers, config, statusText) {
            $scope.update();
            ngNotify.set('add consumer ok!');
        }).error(function (data, status, headers, config, statusText) {
            ngNotify.set("add consumer failed, " + angular.toJson(data));
        });
    }

    $scope.update = function () {
        $http({
            method: 'GET',
            url: $scope.rootUrl + '/consumers'
        }).success(function (data, status, headers, config) {
            $scope.consumers = data;
            console.log($scope.consumers);
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    }

    $scope.delete = function(val){
        $http({
            method: 'DELETE',
            url: $scope.rootUrl + '/consumers' + '/' + val,
        }).success(function(data, status, headers, config){
            console.log("delete consumer ok");
            $scope.update();
            ngNotify.set('delete consumer ok!');
        }).error(function(data,status,headers,config){
            ngNotify.set("delete consumer failed");
        });
    }

    $scope.reset = function(){
        $scope.usernameOrCustomerId = "";
    }

    $scope.update();
}]);
'use strict';

angular.module('myApp.correlationId', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/correlation-id', {
            templateUrl: 'correlation_id/correlation_id.html',
            controller: 'correlationIdCtrl'
        });
    }])

    .controller('correlationIdCtrl', ['$scope', '$location', function ($scope, $location) {
        console.log("enter correlationIdCtrl");

        $scope.api_id = $location.search().api_id;
    }])

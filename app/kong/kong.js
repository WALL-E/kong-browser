'use strict';

angular.module('myApp.kong', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/kong', {
        templateUrl: 'kong/kong.html',
        controller: 'KongCtrl'
    });
}])

.controller('KongCtrl', [function() {

}]);
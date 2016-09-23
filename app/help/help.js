'use strict';

angular.module('myApp.help', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/help', {
            templateUrl: 'help/help.html',
            controller: 'HelpCtrl'
        });
    }])

    .controller('HelpCtrl', [function () {
        console.log("enter HelpCtrl");
    }]);
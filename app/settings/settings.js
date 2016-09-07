'use strict';

angular.module('myApp.settings', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/settings', {
    templateUrl: 'settings/settings.html',
    controller: 'SettingsCtrl'
  });
}])

.controller('SettingsCtrl', ['$scope', 'localStorageService', function($scope, localStorageService) {
  $scope.isSupported = localStorageService.isSupported;
  if(!$scope.isSupported) {
    console.log("The browser does not support the local storage");
  } else {
    var storageType = localStorageService.getStorageType();
    console.log("The browser support the local storage");
    console.log("storageType:", storageType);
  }

  $scope.setItem = function (key, val) {
      return localStorageService.set(key, val);
  }

  $scope.getItem = function (key) {
      return localStorageService.get(key);
  }

  $scope.reset = function () {
    $scope.node = "";
  }

  $scope.submit = function () {
    $scope.setItem("node", $scope.node);
    $scope.$emit('node', $scope.node);
    alert("submit ok");
  }

  $scope.node = $scope.getItem("node");
  $scope.$emit('node', $scope.node);
}])

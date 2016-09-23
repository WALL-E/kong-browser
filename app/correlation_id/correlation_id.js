'use strict';

angular.module('myApp.correlationId', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/correlation-id', {
            templateUrl: 'correlation_id/correlation_id.html',
            controller: 'correlationIdCtrl'
        });
    }])

    .controller('correlationIdCtrl', ['$scope', '$location', '$http', 'ngNotify', function ($scope, $location, $http, ngNotify) {
        console.log("enter correlationIdCtrl");

        var api_id = $location.search().api_id;
        $scope.prompt = api_id == undefined && "Global" || "API";

        $scope.name = 'correlation-id';
        $scope.headerName = '';
        $scope.generator = 0;
        $scope.isEchoDownstream = false;

        $scope.generatorMap = [
            {'id': 0, 'name': 'uuid'},
            {'id': 1, 'name': 'uuid#counter'},
            {'id': 2, 'name': 'tracker'},
        ];
        $scope.generatorArray = ['uuid', 'uuid#counter', 'tracker'];

        $scope.generator2id = function (name){
            var id = 0;
            angular.forEach($scope.generatorArray, function(val, index, array){
                if (val == name) {
                    id = index;
                }
            });
            return id;
        }

        $scope.id2generator = function (val){
            return $scope.generatorArray[val];
        }

        $scope.update = function(){
            $http({
                method: 'GET',
                url: $scope.rootUrl + '/plugins'
            }).success(function (body, status, headers, config) {
                angular.forEach(body.data, function(val, index, array){
                    if (val.name == $scope.name) {
                        console.log("hit:", val);
                        $scope.headerName = val.config.header_name;
                        $scope.generator = $scope.generator2id(val.config.generator);
                        $scope.isEchoDownstream = val.config.echo_downstream;
                        $scope.id = val.id;
                    }
                });
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }

        $scope.post = function () {
            var data = {
                name: $scope.name,
                config: {
                    header_name: $scope.headerName,
                    generator: $scope.generator,
                    echo_downstream: $scope.id2generator($scope.isEchoDownstream)
                }
            };

            $http({
                method: 'POST',
                url: $scope.rootUrl + '/plugins',
                data: data
            }).success(function (data, status, headers, config, statusText) {
                $scope.update();
                ngNotify.set('add plugin ok!');
            }).error(function (data, status, headers, config, statusText) {
                ngNotify.set("add plugin failed, " + angular.toJson(data));
            });
        }

        $scope.patch = function () {
            var data = {
                name: $scope.name,
                config: {
                    header_name: $scope.headerName,
                    generator: $scope.id2generator($scope.generator),
                    echo_downstream: $scope.isEchoDownstream
                }
            };

            $http({
                method: 'PATCH',
                url: $scope.rootUrl + '/plugins/' + $scope.id,
                data: data
            }).success(function (data, status, headers, config, statusText) {
                $scope.update();
                ngNotify.set('add plugin ok!');
            }).error(function (data, status, headers, config, statusText) {
                ngNotify.set("add plugin failed, " + angular.toJson(data));
            });
        }

        $scope.addOrUpdate = function (){
            if ($scope.id == undefined){
                $scope.post();
            }else{
                $scope.patch();
            }
        }

        $scope.update();
    }])

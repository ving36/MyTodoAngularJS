'use strict';

/**
 * @ngdoc directive
 * @name mytodoApp.directive:myTreeGrid
 * @description
 * # myTreeGrid
 */
angular.module('mytodoApp')
    .directive('myTreeGrid', function () {
        return {
            templateUrl: 'views/mytreegrid.html',
            restrict: 'E',
            scope: {
                list: "="
            },
            controller: function ($scope) {
                $scope.editItem = function (index, item) {
                    if (angular.isArray($scope.list)) {
                        for (var i = 0; i < $scope.list.length; i++) {
                            if (i != index)
                                $scope.list[i].edit = false;
                        }
                    }
                    item.edit = !item.edit;
                };

                var init = function () {
                    if (angular.isArray($scope.list)) {
                        for (var i = 0; i < $scope.list.length; i++) {
                            $scope.list[i].edit = false;
                        }
                    }
                }
                init();
            }
        };
    })
    .directive("unorderedList", function () {
        return {
            scope: {
                data: '='
            },
            link: function (scope, element, attrs) {
                //scope.data = scope[attrs["unorderedList"]];
            },
            restrict: "E",
            templateUrl: 'views/unorderedlist.html',
            controller: function ($scope) {

            }
        }
    });
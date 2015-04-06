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
            link: function (scope, element, attrs) {

            },
            controller: function ($scope) {
                $scope.rowEditIndex = undefined;
                $scope.currentProp = undefined;
                $scope.editItem = function (index, prop, item) {
                    if ($scope.rowEditIndex !== index) {
                        $scope.rowEditIndex = index;
                        if (angular.isArray($scope.list)) {
                            for (var i = 0; i < $scope.list.length; i++) {
                                if (i != index)
                                    $scope.list[i].edit = false;
                            }
                        }
                    }
                    item.edit = true; //!item.edit;
                    $scope.currentProp = prop;
                    if (prop != undefined)
                        item.focus = true;
                };

                $scope.hasFocus = function (prop, index) {
                    return $scope.currentProp === prop && index === $scope.rowEditIndex ? true : false;
                };
                var init = function () {
                    if (angular.isArray($scope.list)) {
                        for (var i = 0; i < $scope.list.length; i++) {
                            //                            var config = {
                            //                                edit: false,
                            //                                focus: false
                            //                            };
                            //                            $scope.list[i].config = config;
                            $scope.list[i].edit = false;
                            $scope.list[i].focus = false;

                        }
                    }
                }
                init();
            }
        };
    })
    .directive("focusMe", function () {
        return {
            restrict: 'A',
            scope: {
                setFocus: '=focusMe'
            },
            link: function (scope, element, attrs) {
                //scope.setFocus = scope.$eval(attrs['focusMe']);
                if (scope.setFocus != undefined && scope.setFocus) {
                    element[0].focus();
                }
                scope.$watch('setFocus', function (newValue, oldValue) {
                    if (newValue != null && newValue != undefined && newValue === true) {
                        element[0].focus();
                    }
                });
            }
        }
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
'use strict';

/**
 * @ngdoc directive
 * @name mytodoApp.directive:chGrid
 * @description
 * # chGrid
 */
angular.module('mytodoApp')
    .directive('chGrid', function ($timeout) {
        return {
            templateUrl: 'views/chgrid.html',
            restrict: 'E',
            replace: true,
            scope: {
                list: "="
            },
            link: function (scope, element, attrs) {
                if (angular.isArray(scope.list)) {
                    for (var i = 0; i < scope.list.length; i++) {
                        var config = {};
                        config.edit = {
                            value: false,
                            show: false
                        };
                        config.focus = {
                            value: false,
                            show: false
                        };
                        config.focusOn = {
                            value: undefined,
                            show: false
                        };
                        scope.list[i].rowConfig = config;
                    }
                }
                scope.props = [];
                for (var prop in scope.list[0]) {
                    if (prop != 'rowConfig')
                        scope.props.push(prop);
                    else {
                        for (var i in scope.list[0][prop])
                            if (scope.list[0][prop][i].show)
                                scope.props.push(i);
                    }
                }
            },
            controller: function ($scope, $timeout) {
                $scope.obj = {
                    items: $scope.list
                };
                $scope.rowEditIndex = undefined;
                $scope.currentProp = undefined;
                $scope.editItem = function (index, prop, item) {
                    //console.log('control is here');
                    if ($scope.rowEditIndex !== index) {
                        $scope.rowEditIndex = index;
                        if (angular.isArray($scope.list)) {
                            for (var i = 0; i < $scope.list.length; i++) {
                                if (i !== index)
                                    $scope.list[i].rowConfig.edit.value = false;
                            }
                        }
                    }
                    //console.log(prop);
                    item.rowConfig.edit.value = true; //!item.edit;
                    $scope.currentProp = prop;
                    if (prop !== undefined) {
                        item.rowConfig.focus.value = true;
                        item.rowConfig.focusOn.value = prop;
                    }
                };

                $scope.hasFocus = function (prop, index) {
                    //console.log('control in hasFocus');
                    return $scope.currentProp === prop && index === $scope.rowEditIndex ? true : false;
                };

                $scope.inputBlur = function (item) {
                    //item.edit = !item.edit;
                    $scope.currentProp = undefined;
                };

                $scope.inputFocus = function (prop) {
                    $scope.currentProp = prop;
                    console.log('ng-focus executed');
                };

                $scope.addRow = function ($index, level) {

                }
            }
        };
    })
    .directive('colFocusOn', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                selected: '=colFocusOn'
            },
            link: function (scope, element, attrs) {
                //scope.selected = scope.$eval(attrs['colFocusOn']);
                if (scope.selected !== undefined && scope.selected) {
                    element[0].focus();
                }
                scope.$watch('selected', function (newValue, oldValue) {
                    if (newValue !== null && newValue !== undefined) {
                        $timeout(function () {
                            //element[0].focus();
                            var cols = element.find('td#' + scope.selected + ' input');
                            console.log(cols);
                            if (cols != undefined && cols != null) {
                                cols[0].focus();
                            }

                            console.log('focus me executed2');
                        }, 0);
                    }
                });
            }
        };
    });
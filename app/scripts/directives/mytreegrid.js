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
                dList: "="
            },
            /*link: function (scope, element, attrs) {
                 var grid = element.find('.grid');
                 var inputs = grid.find('tr input');
                 inputs.focus(function () {
                     this.parent('tr').attr('enableEdit', true);
                 }).blur(function () {
                     this.parent('tr').attr('enableEdit', false);
                 });
            },*/
            controller: function ($scope) {
                $scope.obj = {
                    items: $scope.dList
                };
                $scope.rowEditIndex = undefined;
                $scope.currentProp = undefined;
                $scope.editItem = function (index, prop, item) {
                    if ($scope.rowEditIndex !== index) {
                        $scope.rowEditIndex = index;
                        if (angular.isArray($scope.list)) {
                            for (var i = 0; i < $scope.list.length; i++) {
                                if (i !== index)
                                    $scope.list[i].edit = false;
                            }
                        }
                    }
                    item.edit = true; //!item.edit;
                    $scope.currentProp = prop;
                    if (prop !== undefined)
                        item.focus = true;
                };

                $scope.hasFocus = function (prop, index) {
                    //return $scope.currentProp === prop && index === $scope.rowEditIndex ? true : false;
                    return $scope.currentProp === prop && index === $scope.rowEditIndex ? true : false;
                };

                $scope.inputBlur = function (item) {
                    item.edit = !item.edit;
                    $scope.currentProp = undefined;
                };

                $scope.inputFocus = function (prop) {
                    $scope.currentProp = prop;
                };

                var init = function () {
                    if (angular.isArray($scope.list)) {
                        for (var i = 0; i < $scope.list.length; i++) {
                            $scope.list[i].edit = false;
                            $scope.list[i].focus = false;
                        }
                    }
                };

                init();
            }
        };
    })
    .directive('focusMe', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                setFocus: '=focusMe'
            },
            link: function (scope, element, attrs) {
                //scope.setFocus = scope.$eval(attrs['focusMe']);
                if (scope.setFocus !== undefined && scope.setFocus) {
                    element[0].focus();
                    //console.log('focus me executed1');
                }
                scope.$watch('setFocus', function (newValue, oldValue) {
                    if (newValue !== null && newValue !== undefined && newValue === true) {
                        $timeout(function () {
                            //if (scope.$eval(attrs.focusMe)) {
                            element[0].focus();
                            //console.log('focus me executed2');
                            //}
                        }, 0);
                    }
                });
            }
        };
    })
    .directive('unorderedList', function () {
        return {
            scope: {
                data: '='
            },
            link: function (scope, element, attrs) {
                //scope.data = scope[attrs["unorderedList"]];
            },
            restrict: 'E',
            templateUrl: 'views/unorderedlist.html',
            controller: function ($scope) {

            }
        };
    })
    .directive('enableEdit', ['$timeout', function ($timeout) {
        return {
            scope: {
                value: '=enableEdit',
            },
            link: function (scope, element, attrs) {
                var delayFn, parentObj, exitEditFn;
                // function to update the value on the property on the parent scope that is assigned to directive
                var updateAssociatedParentProp = function (prop, newVal) {
                    if (prop.indexOf('.') > -1) {
                        var temp = parentObj.split('.');
                        var parentVar = scope.$parent;
                        for (var i = 0; i < temp.length - 1; i++) {
                            if (parentVar[temp[i]])
                                parentVar = parentVar[temp[i]];
                        }
                        parentVar[temp[temp.length - 1]] = newVal;
                    } else {
                        scope.$parent[prop] = newVal;
                    }
                };

                scope.target = undefined;
                parentObj = attrs.enableEdit;
                delayFn = element.on('blur', 'input', function (event) {
                    scope.target = event.delegateTarget;
                    $timeout(function () {
                        updateAssociatedParentProp(parentObj, false);
                    }, 0);
                });
                element.on('focus', 'input', function (event) {
                    if (scope.target === undefined || scope.target === event.delegateTarget) {
                        clearTimeout(delayFn);
                        $timeout(function () {
                            updateAssociatedParentProp(parentObj, true);
                        }, 0);
                    }
                });
            }
        };
    }])
    .directive('svgCircle', function () {
        return {
            restrict: 'E',
            scope: {
                size: "@",
                stroke: "@",
                fill: "@",
                dSource: "="
            },
            replace: true,
            templateUrl: 'views/svgcircle.html',
            link: function (scope, element, attr) {
                var calculateValues = function (size) {
                    var canvasSize = size * 2.5;
                    scope.obj = scope.dSource;
                    //scope.obj = scope.$eval(attr['objArray']);
                    //console.log(scope.obj);
                    scope.values = {
                        canvas: canvasSize,
                        radius: size,
                        center: canvasSize / 2
                    };
                };

                var size = parseInt(attr.size, 0);

                attr.$observe('size', function (newSize) {
                    calculateValues(parseInt(newSize, 0));
                });
            }
        };
    });
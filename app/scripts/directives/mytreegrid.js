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
                list: '='
            },
            link: function (scope, element, attrs) {
                /* var grid = element.find('.grid');
                 var inputs = grid.find('tr input');
                 inputs.focus(function () {
                     this.parent('tr').attr('enableEdit', true);
                 }).blur(function () {
                     this.parent('tr').attr('enableEdit', false);
                 });*/
            },
            controller: function ($scope) {
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
                scope.target = undefined;
                parentObj = attrs.enableEdit;
                delayFn = element.on('blur', 'input', function (event) {
                    scope.target = event.delegateTarget;
                    //console.log('blurred1:' + target);
                    $timeout(function () {
                        console.log('blurred:');
                        console.log(scope.target);
                        console.log(scope.target !== event.delegateTarget);
                        scope.$parent.r.edit = false;
                        //alert('hi');
                        //scope.target = undefined;
                    }, 0.5);
                });
                element.on('focus', 'input', function (event) {
                    console.log('focus:');
                    console.log(event.delegateTarget);
                    console.log('target:');
                    console.log(scope.target);
                    //console.log(scope.$parent.parentObj);
                    if (scope.target === undefined || scope.target === event.delegateTarget) {
                        clearTimeout(delayFn);
                        //alert('new hi');
                        $timeout(function () {
                            scope.$parent.r.edit = true;
                        }, 0);
                    } else {
                        //scope.target = event.delegateTarget;
                    }
                });
            }
        };
    }]);
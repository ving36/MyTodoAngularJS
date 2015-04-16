'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.size = 10;
        $scope.stroke = 'black';
        $scope.fill = 'blue';

        $scope.activeMenu = 'home';
        $scope.todos = [];

        $scope.addTodo = function () {
            $scope.todos.push($scope.todo);
            $scope.todo = '';
        };

        $scope.removeTodo = function (index) {
            $scope.todos.splice(index, 1);
        };

        $scope.menuItemClick = function () {

        };

        $scope.countries = [{
                Name: 'England',
                Code: 123
            },
            {
                Name: 'India',
                Code: 456
            }];
    }]);
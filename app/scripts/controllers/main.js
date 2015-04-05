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

        $scope.products = [
            {
                name: "Apples",
                category: "Fruit",
                price: 1.20,
                expiry: 10
            },
            {
                name: "Bananas",
                category: "Fruit",
                price: 2.42,
                expiry: 7
            },
            {
                name: "Pears",
                category: "Fruit",
                price: 2.02,
                expiry: 6
            }
            ];

        //    $scope.todos = [
        //      'Item 1',
        //      'Item 2',
        //      'Item 3'
        //    ];

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
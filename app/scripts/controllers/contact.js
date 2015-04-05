'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('ContactCtrl', function ($scope) {
    $scope.contactDetails = {};
    $scope.contactDetails.email='vinayakm.ganu@gmail.com';
    $scope.contactDetails.mobile='+919819539365';
  });

'use strict';

angular.module('mytodoApp')
    .controller('ContactCtrl',['$scope', function($scope){
        $scope.contactDetails = {};
        $scope.contactDetails.email='vinayakm.ganu@gmail.com';
        $scope.contactDetails.mobile='+919819539365';
    }]);
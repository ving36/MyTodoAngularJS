'use strict';

describe('Directive: myTreeGrid', function () {

    // load the directive's module
    beforeEach(module('mytodoApp'));
    //beforeEach(module('views/mytreegrid.html'));
    beforeEach(module('mytemplates'));

    var el,
        $scope;

    beforeEach(inject(function ($rootScope, $compile) {
        
        $scope = $rootScope.$new();
        el = angular.element("<my-tree-grid></my-tree-grid>");
        $compile(el)($scope);
        $rootScope.$digest();
        
        console.log(el.html());

        $scope.list = [
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
            }];
    }));

    it('should show a grid view', inject(function () {
        expect($scope.list.length).toEqual(3);
        expect(el.find('p').length).toBe(1);
        //expect(element.find('p').text()).toBe('this is the myTreeGrid directive');
    }));

    it('should get source list in the link function', inject(function ($compile) {
        //expect(element.text()).toBe(undefined);
    }));
});
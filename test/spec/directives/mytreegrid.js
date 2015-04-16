'use strict';

describe('Directive: myTreeGrid', function () {

    // load the directive's module
    beforeEach(module('mytodoApp'));
    //beforeEach(module('views/mytreegrid.html'));
    beforeEach(module('mytemplates'));

    var el,
        scope, $compile;

    beforeEach(inject(function ($rootScope, _$compile_) {

        scope = $rootScope.$new();
        $compile = _$compile_;

        scope.countries = {
            items: [{
                    Name: "England",
                    Code: 123
            },
                {
                    Name: "India",
                    Code: 456
            }]
        };

        el = '<my-tree-grid list="countries.items"></my-tree-grid>';
        el = $compile(el)(scope);
        scope.$digest();
    }));


    it('should have rows equal to number of items in source list', inject(function () {
        var isolated = el.isolateScope();
        expect(isolated.list).toBeDefined();
        expect(el.find('table').find('tbody').find('tr').length).toEqual(isolated.list.length);
    }));
});

/*Directive to test passing of object to isolate scope*/
describe('directive: svg-circle', function () {
    var element, scope;

    beforeEach(module('mytodoApp'));
    beforeEach(module('mytemplates'));

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();

        element =
            '<svg-circle size="{{size}}" stroke="{{strokeValue}}" fill="blue" obj-array="{{countries.items}}" d-source="countries.items"></svg-circle>';

        scope.size = 100;
        scope.strokeValue = 'black';
        scope.countries = {
            items: [{
                    Name: "England",
                    Code: 123
            },
                {
                    Name: "India",
                    Code: 456
            }]
        };

        element = $compile(element)(scope);
        scope.$digest();
    }));

    describe('with the first given value', function () {
        it("should compute the size to create other values", function () {
            var isolated = element.isolateScope();
            expect(isolated.values.canvas).toBe(250);
            expect(isolated.values.center).toBe(125);
            expect(isolated.values.radius).toBe(100);
            console.log(element.find('svg').html());
            //            console.log('isolated: obj: ');
            //            console.log(isolated.dSource);
            //            console.log(isolated.stroke);
        });

        it("should contain a svg tag with proper size", function () {
            expect(element.attr('height')).toBe('250');
            expect(element.attr('width')).toBe('250');
        });

        it("should contain a circle with proper attributes", function () {
            expect(element.find('circle').attr('cx')).toBe('125');
            expect(element.find('circle').attr('cy')).toBe('125');
            expect(element.find('circle').attr('r')).toBe('100');
            expect(element.find('circle').attr('stroke')).toBe('black');
            expect(element.find('circle').attr('fill')).toBe('blue');
        });
    });
});
'use strict';

describe('Directive: myTreeGrid', function () {

    // load the directive's module
    beforeEach(module('mytodoApp'));
    //beforeEach(module('views/mytreegrid.html'));
    beforeEach(module('mytemplates'));

    var el, scope, controller, $compile;
    var elEE, scopeEE, controllerEE, compileEE;
    var elDirFo, dirFo, scopeDirFo, isolateScopeFo, focusMeVal;
    var isolateScope;
    beforeEach(inject(function ($rootScope, _$compile_, $controller) {
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
        controller = el.controller('myTreeGrid');
        isolateScope = el.isolateScope();
        scopeDirFo = isolateScope.$new();
        elDirFo = el.find('table').find('tbody').find('tr').eq(0).find('td').find('div').eq(0).find('input');
        elDirFo = $compile(elDirFo)(scopeDirFo);
        isolateScopeFo = elDirFo.isolateScope();
    }));

    it('should have rows equal to number of items in source list', inject(function () {
        var isolated = el.isolateScope();
        expect(isolated.list).toBeDefined();
        expect(el.find('table').find('tbody').find('tr').length).toEqual(isolated.list.length);
    }));

    describe('double click on row', function () {

        beforeEach(inject(function () {
            /*isolateScope = el.isolateScope();*/
            spyOn(isolateScope, 'inputFocus');
        }));

        it('should set rowEditIndex and currentProp values', function () {
            var item = {
                Name: "England",
                Code: 123,
                edit: false,
                focus: false
            };
            //console.log('before: ' + isolateScope.rowEditIndex);

            console.log('setFocus: ' + isolateScopeFo.setFocus);
            console.log('focus-Me: ' + isolateScope.$eval(elDirFo.attr('focus-me')));
            isolateScope.editItem(0, 'Name', item);
            isolateScope.$digest();
            
            focusMeVal = isolateScope.hasFocus(isolateScope.currentProp, isolateScope.rowEditIndex);
            elDirFo.attr('focus-me', focusMeVal);
            isolateScope.$digest();
            
            elDirFo = el.find('table').find('tbody').find('tr').eq(0).find('td').find('div').eq(0).find('input');
            console.log(elDirFo);
            elDirFo = $compile(elDirFo)(scopeDirFo);
            isolateScopeFo = elDirFo.isolateScope();
            isolateScope.$digest();
            console.log('setFocus: ' + isolateScopeFo.setFocus);
            console.log('focus-Me: ' + isolateScope.$eval(elDirFo.attr('focus-me')));
            
            expect(isolateScope.rowEditIndex).toEqual(0);
            expect(isolateScope.currentProp).toEqual('Name');
            expect(item.edit).toEqual(true);
            expect(item.focus).toEqual(true);
            //expect(isolateScope.inputFocus).toHaveBeenCalled();
            /*expect(isolateScope.$eval(el.find('table').find('tbody').find('tr').eq(0).find('td').find('div').eq(0).find('input').attr('focus-me'))).toEqual(true);*/
            /*console.log(isolateScope.$eval(el.find('table').find('tbody').find('tr').eq(0).find('td').find('div').eq(0).find('input').attr('focus-me')));
             */
        });

        it('should set focus to the property to edit', function () {
            //     el.find('table').find('tbody').find('tr').eq(0).find('td').find('div').eq(0).dblclick();
            //            console.log(el.find('table').find('tbody').find('tr').eq(0).find('td').find('div').eq(0));
            //            expect(scope.editItem).toHaveBeenCalled();
        });
    });
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
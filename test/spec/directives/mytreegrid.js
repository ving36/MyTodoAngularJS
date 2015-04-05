'use strict';

describe('Directive: myTreeGrid', function () {

  // load the directive's module
  beforeEach(module('mytodoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-tree-grid></my-tree-grid>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myTreeGrid directive');
  }));
});

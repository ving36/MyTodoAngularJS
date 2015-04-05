'use strict';

describe('Controller: ContactCtrl', function () {

  // load the controller's module
  beforeEach(module('mytodoApp'));

  var ContactCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactCtrl = $controller('ContactCtrl', {
      $scope: scope
    });
  }));

  it('should check contact details to be an object', function () {
    expect(scope.contactDetails).toEqual(jasmine.any(Object));
  });
    
  it('should compare against undefined or null email', function(){
    expect(scope.contactDetails.email).not.toBe(null);
    expect(scope.contactDetails.email).toBeDefined();
  });
      
  it('should compare against undefined or null mobile number', function(){
    expect(scope.contactDetails.mobile).not.toBe(null);
    expect(scope.contactDetails.mobile).toBeDefined();
  });
});

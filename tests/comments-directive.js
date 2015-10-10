angular.module('mock.firebase', [])
.value('Firebase', MockFirebase)
.run(function() {
  MockFirebase.override();
  MockFirebase.DEFAULT_DATA = [
  { md: "comment test data",
    user: {
      displayName: "sean",
      id: 1234
      }
    }
  ];
});

describe("Comments directive", function(){

  beforeEach(module('mock.firebase', 'angular-demo'));

  var $complie, $rootScope;

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    var template = angular.element("<comments></comments>");
    $compile(template)($scope);
    $scope.$digest();
    
  }));

  it("Renders some comments", function(){


  });
});

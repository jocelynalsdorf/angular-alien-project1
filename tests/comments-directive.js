angular.module('mock.firebase', [])
.value('Firebase', MockFirebase)
.run(function(){
  MockFirebase.override();
  MockFirebase.DEFAULT_DATA = [
  { md: "comment test data",
  user: {
    displayName: "Sean McGee",
    id: 1234
  }
}
];
});

angular.module('mock.commentsCtrl', [])
.controller("CommentsCtrl", function($scope, $firebaseArray){

});

describe("Comments directive", function(){

  beforeEach(module('mock.firebase', 'angular-demo'));
  beforeEach(module('templates/comments.html',
    'templates/karma.html',
    'templates/pending.html',
    'templates/login.html'));

  var $compile, $rootScope, $scope, template;

  beforeEach(inject(function(_$compile_, _$rootScope_, FirebaseRef, $firebaseArray,$timeout){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    template = angular.element("<comments></comments>");
    $compile(template)($scope);
    $scope.$digest();
    console.log(MockFirebase.DEFAULT_DATA);
    FirebaseRef.flush();
    $timeout.flush();
  }));

  it("Renders some comments", function(){
    expect(template.html()).toContain("McGee");
  });
})

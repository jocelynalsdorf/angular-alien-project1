(function(){

var app = angular.module('angular-demo', ['ngSanitize', 'firebase']);

app.constant("FIREBASE_URL","https://popping-torch-6088.firebaseio.com/");

app.directive('comments', function(){
  return {
    restrict: "EA",
    controller: ["$scope", "$firebaseArray", "FIREBASE_URL", function($scope, $firebaseArray, FIREBASE_URL ){
     
      var comments = $firebaseArray(new Firebase(FIREBASE_URL));

      
      $scope.commentMd = "";

      $scope.post = function(){
      comments.$add({md:$scope.commentMd});
      $scope.commentMd = "";
      };
      $scope.comments = comments;
    }],
    templateUrl: 'comments.html'
  }

});

app.filter("mdToHtml", function(){
  return function(md) {
    return markdown.toHTML(md);
  };
});

})();
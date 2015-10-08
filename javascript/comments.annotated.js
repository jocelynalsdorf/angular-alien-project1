(function(){

var app = angular.module('angular-demo', ['ngSanitize', 'firebase', 'ngRoute']);
app.constant("FIREBASE_URL","https://popping-torch-6088.firebaseio.com/");

app.directive('comments', function(){
  return {
    restrict: "EA",
    controller: ["$scope", "Comments", function($scope,Comments){  
      $scope.comments = Comments; 
      $scope.commentMd = "";

      $scope.post = function(){
       Comments.post($scope.commentMd);
      $scope.commentMd = "";
       };
      
    }],
    templateUrl: 'comments.html'
  }
});

app.factory('Comments', ["$firebaseArray", "FIREBASE_URL", function($firebaseArray, FIREBASE_URL){
  var comments = $firebaseArray(new Firebase(FIREBASE_URL));     

  comments.post = function(markdown){
  comments.$add({md:markdown});
  };

return comments;
}]);



app.filter("mdToHtml", function(){
  return function(md) {
    return markdown.toHTML(md);
  };
});

})();
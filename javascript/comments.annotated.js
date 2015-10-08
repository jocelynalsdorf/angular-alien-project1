(function(){

var app = angular.module('angular-demo', ['ngSanitize', 'firebase', 'ngRoute']);
app.constant("FIREBASE_URL","https://popping-torch-6088.firebaseio.com/");

//Comment object returned from the Comment factory is now being passed to the ctrl in the directive
//Controller should be glueing the model to the view using scope, DOM stuff should be in link fxin directives
app.directive('comments', function(){
  return {
    restrict: "EA",
    controller: ["$scope", "Comments", function($scope,Comments){  
      $scope.user = 1;
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

//app logic moved to a service and should not be in controller
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

//login controller for login route
app.controller('LoginCtrl', ["$scope", "$routeParams", function($scope, $routeParams){

}]);

//wire up routes
app.config(["$routeProvider", function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl:'post.html',
    //dont need a controller for this page
  })
  .when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginCtrl'
  })
}]);







})();
(function(){

var app = angular.module('angular-demo', ['ngSanitize', 'firebase', 'ngRoute']);
app.constant("FIREBASE_URL","https://popping-torch-6088.firebaseio.com/");

//Comment object returned from the Comment factory is now being passed to the ctrl in the directive
//Controller should be glueing the model to the view using scope, DOM stuff should be in link fxin directives
app.directive('comments', function(){
  return {
    restrict: "EA",
    controller: function($scope,Comments, UserAuth){  
      $scope.UserAuth = UserAuth;
      $scope.comments = Comments; 
      $scope.commentMd = "";

      $scope.post = function(){
       Comments.post($scope.commentMd);
      $scope.commentMd = "";
       };
      
    },
    templateUrl: 'comments.html'
  }
});

//create a firebase ref that can be shared
app.factory('FirebaseRef', function(FIREBASE_URL, $firebaseAuth){
   var ref = new Firebase(FIREBASE_URL);
   return ref;
});

//create the user auth factory
app.factory('UserAuth', function(FirebaseRef, $rootScope, $firebaseAuth){
//create UserAuth object to return
 

var auth = $firebaseAuth(FirebaseRef);

 var UserAuth = {
  login: function(provider) {
    auth.$authWithOAuthPopup(provider);
  },
  logout: function(provider) {
    auth.$unauth();
  },

  user: null
 }

  

  // auth.authAnonymously(function(error, user) {
  //   if (user) {
  //     // Global Message:User authenticated with Firebase
  //     $rootScope.$broadcast('FirebaseLogin::LoggedIn', user);
  //     $rootScope.$apply(function(){
  //        UserAuth.user = user;
  //     });
     
  //   } else {
  //     //Global Message: there was an error
  //      $rootScope.$broadcast('FirebaseLogin::LoggedOut', user);
  //      $rootScope.$apply(function(){
  //        UserAuth.user = null;
  //     });
       
      
  //   }
  // })
   console.log(UserAuth);
  return UserAuth;
});


//app logic moved to a service and should not be in controller
app.factory('Comments', function($firebaseArray, FirebaseRef){
  var comments = $firebaseArray(FirebaseRef);     

  comments.post = function(markdown){
  comments.$add({md:markdown});
  };

return comments;
});

app.filter("mdToHtml", function(){
  return function(md) {
    return markdown.toHTML(md);
  };
});

//login controller for login route
app.controller('LoginCtrl', function($scope, $routeParams, UserAuth){
  $scope.UserAuth = UserAuth;
});

//wire up routes
app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl:'post.html',
    //dont need a controller for this page
  })
  .when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginCtrl'
  })
});







})();
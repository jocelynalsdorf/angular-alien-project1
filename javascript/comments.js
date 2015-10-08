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
//create empty array to make a copy of all comments so we have 2 watches due to pending directive
      
      $scope.loaded = [];
      

      

      $scope.refresh = function(data) {
        $scope.loaded = data;
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
    auth.$authWithOAuthPopup(provider)
    .then(function(authData) {
    console.log("Logged in as:", authData.uid);
    UserAuth.user = authData.uid;
    console.log(UserAuth.user);
  }).catch(function(error) {
    console.log("Authentication failed:", error);
  });
  },
  logout: function(provider) {
    auth.$unauth();
    UserAuth.user = null;
  },

  user: null
 }

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
app.controller('LoginCtrl', function($scope, $routeParams, UserAuth, $location){
  $scope.UserAuth = UserAuth;
  $scope.$watch('UserAuth.user', function(user){
    if(user) {
      $location.path('/');
    }
  });
});

app.directive('pending', function(){
  return {
    restrict: 'E',
    scope: {
      data: '=watch',
      reload: '&update'
    },
    templateUrl: 'pending.html',

    link: function(scope){
      scope.pending = 0;
      var start = scope.data.length;
      
      scope.data.$loaded(function(){
        start = scope.data.length; 
        scope.reload({data: scope.data.slice(0)}); 
      });

      scope.$watchCollection('data', function(){
        scope.pending = scope.data.length - start;
      });

      scope.update = function() {
        scope.reload({data: scope.data.slice(0)});
        scope.pending = 0;
      };
    }
  };
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
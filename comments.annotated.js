(function(){

var app = angular.module('angular-demo', []);

app.directive('comments', function(){
  return {
    restrict: "EA",
    controller: ["$scope", function($scope){
      $scope.comments = [
      {text: "great"},
      {text: "hated it"},
      {text: "loved it"},
      {text: "great"},
      {text: "hated it"},
      {text: "loved it"}

      ];
    }],
    templateUrl: 'comments.html'
  }

});



})();
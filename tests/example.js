angular.module('example', [])
.factory('Calculator', function() {
  return {
    add: function(a,b){
      return a + b
    },
    subtract: function(a,b) {

      return a - b; 
    }
  };
});

describe("Calculator test suite", function(){

  beforeEach(function(){
    module('example');
  });

  it("adds two numbers together", inject(function(Calculator){
    expect(Calculator.add(1,2)).toBe(3);
  }));
});
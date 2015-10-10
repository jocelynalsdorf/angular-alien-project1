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

   var Calculator;

  beforeEach(module('example'));
  beforeEach(inject(function(_Calculator_){
    Calculator = _Calculator_;
  }));

  it("adds two numbers together", function(){
    expect(Calculator.add(1,2)).toBe(3);
  });

  it("Subtracts two numbers together", function(){
    expect(Calculator.subtract(2,1)).toBe(1);
  });

});
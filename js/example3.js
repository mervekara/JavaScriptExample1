function foo() {
   var a = 100;
   
   function bar() {
    a *= 2;
    return a;
   }
   
   return bar;
}
    var baz = foo();  
   
    console.log(baz());
   
    console.log(baz());
   
    console.log(baz());
    
    var blat = foo();
    console.log(blat());
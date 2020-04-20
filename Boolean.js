let boo1 = true
let boo2 = false
console.log('boo1:',boo1.toString());
console.log('boo2:',boo2.valueOf());

let constructor = boo1.constructor
console.log('constructor:',constructor);

let prototype = Boolean.prototype
console.log('prototype:',prototype);
Boolean.prototype.hello = function () {
    console.log("hello-this：",this);
}
let hello = new Boolean(1)
console.log("hello:",hello.hello()); 
// hello-this： [Boolean: true]
// hello: undefined



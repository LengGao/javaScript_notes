/**
 * Generator 异步编程解决方案 即多线程实现方案
 * Generator 函数呗()调用后不会执行，而是吧结果封装在状态机里，调用函数的返回结果是一个指向内部状态的指针对象，也就是遍历对象Iterator Object，需要调用函数后得到返回对象再在返回对象上钓调用next() generator().next()
 * next() 调用后得到的是一个包含yield/return产出的返回值属性和遍历是否结束的状态属性的对象
 */

function* generator () {
  yield 'heello'
  yield 'generator'
  return 'end'
}
console.log('generator:', generator(), 'next:', generator().next()) // Object [Generator] {} next: { value: 'heello', done: false }

/**
 * next() 可以遍历下一个內部不状态,也是generator 还是执行的开关
 * yield 是暂停标志，遇到他后函数执行遍暂停
 */

//  yield语句如果用在一个表达式之中，必须放在圆括号里面
// console.log('yield:', (yield 123))

// yield语句用作函数参数或赋值表达式的右边，可以不加括号

var arr = [1, [[2, 3], 4], [5, 6]];
function* yieldTest (array) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    yield element //OK
    console.log('Hello' + (yield 123)); // OK
  }
  // foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
yieldTest(arr).next() // 
// 除以上情况外 在 其他普通函数中使用yield 都会出错

/**
 * 任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象
 */
let myIterator = {}
console.log('iterator:', myIterator[Symbol.iterator]); // undefined
myIterator[Symbol.iterator] = function* () {
  console.log('iterator:', myIterator[Symbol.iterator]); // GeneratorFunction 遍历器生成函数
  yield 1
  yield 2
  yield 3
}
let iterator_v = [...myIterator] // 由此可知具有iterator接口的就可以被...运算符遍历
console.log('iterator_v:', iterator_v, 'obj[Symbol.iterator===g?:]', myIterator[Symbol.iterator]() === g);
function* gen () {
  // some code
}

var g = gen();
console.log('obj[Symbol.iterator===g?:]', g[Symbol.iterator]() === g); // true

/**
 * next(x) 第一个next方法用来启动遍历器对象，所以不用带有参数,V8引擎直接忽略第一次
 * yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值
 */
function* f () {
  for (var i = 0; true; i++) {
    var reset = yield i
    console.log('reset:', reset); // undefined true
    if (reset) { i = -1 }
  }
}
var g_f = f()
console.log('next_result:', g_f.next()); //  value: 0, done: false }
console.log('next_result:', g_f.next()); // { value: 1, done: false 
console.log('next_result:', g_f.next(true)); // { value: 0, done: false }

// 第一次调用就带参数
function wrapper (generatorFunction) {
  return function (...args) {
    console.log('generator_args_returnFunc:', ...args); // 啥也没有  // 
    // let generatorObject = generatorFunction(...args)   // 被误导
    let generatorObject = generatorFunction()
    generatorObject.next()
    return generatorObject
  }
}

const wrapped = wrapper(function* () {
  let a = yield
  // let a = 'a'  // a
  // console.log(`First input: ${yield}`)
  console.log(`First input: ${a}`)
  // 可以看出 yield 关键字还可以接受 next()传进的参数，并作为返回值，可以给当成变量使用
  return 'DONE'
})
wrapped().next('hello') // First input: hello
wrapped().next('seconed') // First input: seconed
function aa (callback) {
  return callback()
}
aa(function* bb () {
  console.log('exec');
}).next()

// for...of 可以子看懂遍历Iterator函数时生态城的iterator对象因此不需要使用next方法 但是最后的值不会遍历出来，因为最后的对象,done 为true
function* g2 () {
  yield 1
  yield 2
  yield 3
  return 4
}
for (const iterator of g2()) {
  console.log('iterator:', iterator); // 1,2,3
}
//  自行添加Iterator 接口
function* ObjEntries (obj) {
  let props = Reflect.ownKeys(obj)
  // 转换成本来就有iteraotr接口的数据类型
  for (let keys of props) {
    yield [keys, obj[keys]]
  }
}
let jane = { first: 'jane', last: 'doe' }
for (let [key, val] of ObjEntries(jane)) {
  console.log(`${key}:${val}`); // first:jane last:doe
}

/**
 * yield*  在一个generator函数中调用另一个generator函数
 * 一般情况下在一个generator调用另一个generator函数时无效的
 *
 */

// 转为对象属性
let g_obj = {
  * generarotrFunc () {
    console.log('this_obj', this);
    yield* this.generatorFunc2() //generarotrFunc: [GeneratorFunction: generarotrFunc]
  },
  generatorFunc2: function* () {
    console.log('this_obj', this); // generarotrFunc: [GeneratorFunction: generarotrFunc]
  }
}
g_obj.generatorFunc2().next()

// generator 因为enerator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法，所以可以在其原型链上添加方法 
function* edm () {
}
edm.prototype.e = function () {
  console.log('egm', this);
}
let xx = edm()
xx.e() // egm Object [Generator] {}

// 不能同new  一期用 ， generator总是反水内部对象，而不是this对象，所以generator不能作为公构造函数
function* g3 (params) {
  this.a = 12
}
let g3_obj = g3()
console.log('g3_obj:', g3_obj.a); // undefined
// 变通方法
function* g4 () {
  this.a = 1
  console.log('this:', this); // this: { a: 1 }
  yield this.b = 2
  yield this.c = 3
  console.log('this2:', this);
}
let g4_obj = {}
let g4_call = g4.call(g4_obj)
console.log('g4_call:', g4_call, 'g4_obj', g4_obj.a); // g4_call: Object [Generator] {} g4_obj undefined
g4_call.next()
console.log('g4_call:', g4_call, 'g4_obj', g4_obj.a); // g4_call: Object [Generator] {} g4_obj 1
// 上述代码体现了 call作用 和 generator调用但不会立即执行的特点以及yield的暂停作用
function toBeConstructor () {
  return g4.call(g4.prototype)
}
let toBeConstructorObj = new toBeConstructor()
console.log('toBeConstructorObj:', toBeConstructorObj, toBeConstructorObj.next(), toBeConstructorObj.a); // Object [Generator] {} { value: 2, done: false } 1
// 上面代码说明 普通函数是可以作为构造函数被 new 运算的
class c_g {
  constructor() {
    return toBeConstructor()
  }
}
let o_g = new c_g()
console.log('o_g:', o_g, 'o_g:', o_g.next()); //  Object [Generator] {} o_g: { value: 2, done: false }

// 状态机
let ticking = true
let clock = function () {
  if (ticking) {
    console.log('Tick');
  } else {
    console.log('Tack');
  }
  ticking = !ticking
}
// generator 实现
let g_clock = function* () {
  // while (true) {
  console.log('Tick_g');
  yield 1;
  console.log('Tack_g');
  yield 2;
  // }
}
g_clock().next() // Tick
g_clock().next()  // Tick
// let ccc = [...g_clock()]
// let ddd = g_clock()
// ddd.next() // Tick
// ddd.next() // Tack
// for (const iterator of g_clock()) {
//   console.log('iterator:', iterator); // 1,2
// }
// console.log('g_clock:', g_clock().next()); {value: undefined,done:false}
// console.log('g_clock:', g_clock().next());  {value: undefined,done:false}
// console.log('g_clock:', g_clock().next());  {value: undefined,done:false}
// 上述代码说明  generator每次被调用都会返回一个新的指向内部状态的指针对象，只用在同一对象上连续使用next(),程序才会在原来的地方向下运行


// 异步化操作同步表达 不等于讲异步函数转换成同步函数，但是我们可以将异步操作拆分利用yield 和 next达到同步的目的
function* g5 () {
  showLoadingScreen()
  yield* g_f2()
}
function showLoadingScreen () {
  console.log('showLoadingScreen')
}
function loadIdataAsynchrononly () {
  console.log('loadIdataAsynchrononly');
  return '如果yield后面是函数 否会在next()后被执行，如同表达式会被求值返回一样,如果函数有返回值，那么产出对象的值属性就为函数返回值'
}
function hideLoadingScreen () {
  console.log('hideLoadingScreen');
}
function* g_f2 () {
  yield loadIdataAsynchrononly()
  hideLoadingScreen()
}
let g5_obj = g5()
console.log('g5_obj.next():', g5_obj.next());
g5_obj.next()
// 部署 iterator接口
function* iteratorinterface (obj) {
  let keys = Object.keys(obj)
  for (let index = 0; index < keys.length; index++) {
    const element = keys[index];
    yield [element, obj[element]]
  }
}
let myObj = { foo: 3, bar: 7 }
for (const it of iteratorinterface(myObj)) {
  console.log('it:', it, typeof it, Array.isArray(it)); // ['foo', 3] object true
  // console.log('key:', key, 'val:', val);
}

var gg = function* () {
  var a = yield 'a'
  // console.log(a)
  var b = yield* ff()
  // console.log(d2)
  return 'c'
}
var ff = function* () {
  yield 'd'
  return 'e' 
}
var iterator = gg();
console.log(iterator.toString());
// var a = iterator.next()
// var b = iterator.next()
// var c = iterator.next()
// console.log("iterator2",a,b,c)

for (const iterator of gg()) {
  console.log("iterator2",iterator)
}
function* gg2 () {
  yield 'a';
  var a = 1
  console.log("try",a)
  return  
}
var i_1 = gg2();
// i_1.return() 
console.log(i_1.next());
console.log(i_1.next());
console.log(i_1.next());
console.log(i_1.next('1'));

var gen_2 = function* () {
  this.o = 'o'
  yield this.a = 1;
  yield this.b = 2;
}
var ite_1 = gen_2.call(gen_2.prototype);
console.log("generator this:",ite_1.a,ite_1.b,ite_1.o) // undefined undefined undefined
ite_1.next();
ite_1.next();
console.log("generator this:",ite_1.a,ite_1.b,ite_1.o) // undefined undefined o

// 状态机
var flag = true
var fn = function () {
  if(flag) 
    console.log('Tick!');
  else 
    console.log('Tock!');
  flag = !flag
}
fn(); fn(); // Tick! Tock!
/// generator状态机
var gen_3 = function* () {
  while (true) {
    yield console.log('Tick!');
    yield console.log('Tock!');
  }
}
var ite_3 = gen_3()
ite_3.next() // Tick! 
ite_3.next() // Tock!
ite_3.next() // Tick!

function* gen_4 () {
  yield 'a'
  yield* gen_5()
  yield 'c'
}
function* gen_5() {
  yield 'b'
  yield* gen_4()
  yield 'e'
}
// for (const iterator of gen_4()) {
//   console.log('generator coroutine',iterator)
// }
// aximum call stack size exceeded  这么干的结果就是这个

// iteraotr接口部署
function* gen_6 (obj) {
  let keys = Object.keys(obj)
  for (let index = 0; index < keys.length; index++) {
    const element = keys[index];
    yield [element, obj[element]]
  }
}
let obj_iterator = { foo: '1', bar: '2' } 
for (const iterator of gen_6(obj_iterator)) {
  console.log('iteraotr接口部署', iterator)
}
















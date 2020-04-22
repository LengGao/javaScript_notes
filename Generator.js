/**
 *  Generator 异步编程解决方案 即多线程实现方案
 * Generator 函数呗()调用后不会执行，而是吧结果封装在状态机里，调用函数的返回结果是一个指向内部状态的指针对象，也就是遍历对象Iterator Object，需要调用函数后得到返回对象再在返回对象上钓调用next() generator().next()
 * next() 调用后得到的是一个包含yield/return产出的返回值属性和遍历是否结束的状态属性的对象
 */

function* generator () {
  yield 'heello'
  yield 'generator'
  return 'end'  // 
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
    console.log('generator_args_returnFunc:', ...args);
    let generatorObject = generatorFunction(...args)
    generatorObject.next()
    return generatorObject
  }
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`)
  return 'DONE'
})
wrapped().next('hello')
// wrapper().next('seconed')
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
    yield* this.generatorFunc2()
  },
  generatorFunc2: function* () {
  }
}

// generator 因为enerator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法，所以可以在其原型链上添加方法 
function* edm () {
}
edm.prototype.e = function () {
  console.log('egm', this);
}
let xx = edm()
xx.e() // egm Object [Generator] {}

// 不能同new  一期用 this














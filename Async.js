var fs = require('fs')

// // then添加的回调函数会在所有 await 之后执行
// async function a_f3 (name) {
//   let symbol = await getStockSymbol(name)
//   console.log('symbol:', symbol); //symbol: undefined
// }
// function getStockSymbol (name) {
//   console.log('getStockSymbol:', name);
// }
// a_f3('hello is me').then(function (res) {
//   console.log('res:', res); // res: undefined
// })
// a_f3()

// async function* gen1 () {
//   yield 'a';
//   yield 'b';
//   return 2;
// }

// async function* gen2 () {
//   const result = yield* gen1();
// }
// (async function () {
//   for await (const x of gen2()) {
//     console.log('x', x);
//   }
// })();

// async function* g4 () {
//   yield await 1
// }
// let o_g4 = g4()
// o_g4.next().then(s => {
//   console.log('s:', s); //s: { value: 1, done: false }
// })

// /**
//  * 遍历器对象除了具有next方法，还可以具有return方法和throw方法。如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。
// return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句或continue语句），就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法
//  */
// function readLinesSync (file) {
//   return {
//     next () {
//       if (file.isAtEndOfFile()) {
//         file.close();
//         return { done: true };
//       }
//     },
//     return () {
//       file.close();
//       return { done: true };
//     }
//   }
// }


//  而行里一下
// 首先 万物的由来 
/**
 * 异步的由来：函数参数的传递策略
 * call by value：先求表达式值，在传入，good：在函数内多次使用时，避免再次计算。bad：先求值在一定程度上丢失了性能：以及函数体内没有使用参数，也被求值了
 * call by name：先将表表达式存入Thunk函数中传入引用地址，在使用时再求值，good：提高了程序性能。bad：多次使用时要多次求值
 * js中采用call by value策略，但js中的Thunk与众不同，它时将多参数简化成单参数再计算
 */
function callByValue (n) {
  return n * 2
}
function callByName (thunk) {
  return thunk() * 2
}
function thunk () {
  return x + 2
}
let x = 0
callByValue(x + 2) // -> callByValue(2)
callByName(thunk) // -> callByValue(thunk)
/* --- js 中 thunk 以下为描述性内容--- */
let file = 'README.md'
let callback = function (e, d) {
  console.log('callback:', e, 'data:', d ? d.toString() : '');
}
// fs.readFile(file, callback) // 正常版本
function thunk_read (file) {
  console.log('file:', file, 'arguments:', arguments); // file2: README.md arguments: [Arguments] { '0': 'README.md' }
  return function (callback) {
    console.log('file:', file, 'arguments:', arguments); // file2: README.md arguments2: [Arguments] { '0': [Function: callback] }
    return fs.readFile(file, callback)
  }
}
let thunk_read_func = thunk_read(file) // 这一步已经将文件传入 但是没有callback 所以我们看不到输出内容,但是程序已经运行了一次,所以此时的thunk_read_Func = function (callback) { return fs.readFile(被求值了的文件名file2,callback) }
thunk_read_func(callback)  // 有了上面的步骤以后,那么我们此时传入callback就可以直接输出了,因为thunk_read_func被赋予了求值过了的函数表达式,

/* ---以上为thunk函数,以下为将任何带有回调函数参数的函数转换为thunk函数,--- */
let transformation_thunk = function (func) {
  console.log('transformation_thunk_arguments:', arguments); // { '0': [Function: readFile] }
  return function () {
    console.log('transformation_thunk_arguments:', arguments); //{ '0': 'README.md' }
    let args = Array.prototype.slice.call(arguments)
    return function (callback) {
      console.log('transformation_this:', this); // Object [global] 当被调用时this值被绑定在直接调用对象或者当前对象上
      args.push(callback)
      return func.apply(this, args)
    }
  }
}
let transformation_thunk_express = transformation_thunk(fs.readFile)
let transformation_thunk_express_file = transformation_thunk_express(file)
transformation_thunk_express_file(callback)
// 总结: 这样的转换器大多数式返回一个表达式,尤其是函数的表达式,它是需要经过求值的,并不是直接返回结果,所以容易混淆

// generator自动执行机
// 简单版
function* gen_easy () {
  yield 1
  yield 2
  return 3
}
let obj_gen_easy = gen_easy()
let res_obj_gen_easy = obj_gen_easy.next()
while (!res_obj_gen_easy.done) {
  console.log('res_obj_gen_easy:', res_obj_gen_easy.value);
  res_obj_gen_easy = obj_gen_easy.next()
}
// 上述操作并不适用于异步操作，为了保证前一步执行完才能执行后一步我们需使用下面异步generator自动执行机
// 基于Thunk,
let async_thunk = transformation_thunk(fs.readFile)
function* g_thunk () {
  var a = yield async_thunk('/README.md')
  var b = yield async_thunk('/README.md')
}
function run_thunk (fn) {
  let gen = fn()
  function next (arr, data) {
    let result = gen.next(data)
    if (result.done) return;
    console.log('result.value:', result)
    result.value(next) // 由于yield 产出的时一个方法所以value值织染也时一个Funtion
  }
  next()
}
run_thunk(g_thunk)
// 基于Promise
// async 函数的实现--将Generator函数自动执行器包装在一个函数里
// async funciton xx (xx) {} 等价于
function async_equali_gen (args) {
  // args === Genertor
  return spawn(args);
}
function spawn (gen_func) {
  return new Promise((resolve, reject) => {
    var gen = gen_func()
    function step (next_func) {
      try { var next = next_func() } catch (e) { reject(e) } //错误处理
      if (next.done) return resolve(next.value); // 结束处理
      Promise.resolve(next.value).then((v) => {
        step(() => { return gen.next(v); });
      }, (e) => {
        step(() => { return gen.throw(e); });
      });
      // Promise.resolve(next.value).then(function (v) { step(() => { return gen.next(v) }) }).catch(function (e) { step(() => { return gen.throw(e) }) })// done == false 递归调用
    }
    step(() => { return gen.next() }) // 启动
  })
}
async_equali_gen(function* () {
  yield console.log('1');
  yield console.log('2');
  return console.log('3');
})
// async 
async function async_complie (params) {
  var b = await 1 + 2;
  var a = await 2 + 2 + b;
  // 假设以上是异步操作那么他也会变为同步操作
  console.log(a, b);
}
async_complie()











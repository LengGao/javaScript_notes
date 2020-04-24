var fs = require('fs')
// /**
//  * 求职测虐
//  * x=1;
//  * call by value：f(x+5) -> f(5)
//  * call by name：f(x+5) 在使用时求值  (x+5) * 2
//  * 求值简单但是可能造成性能对丢失
//  */
// /**
//  * Thunk 函数
//  * 编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做Thunk函数。
//  */

// var n = 1
// function f (x) {
//   return x + 5
// }
// f(n + 1)
// // 编译 等同于、
// var thunk = function () {
//   return n + 1
// }

// function f_t (thunk) {
//   return thunk() + 5
// }
// // JavaScript语言是传值调用，它的Thunk函数含义有所不同。在JavaScript语言中，Thunk函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数

// var Thunk = function (fn) {
//   return function (...args) {
//     console.log('this_call', ...args);
//     return function (callback) {
//       console.log('this_call', this);
//       return fn.call(this, ...args, callback);
//     }
//   };
// };
// Thunk(1, function () {
//   console.log('this', this);
// })

// async function a_f () {
//   await console.log('1'); // await 等同于同步操作
//   await f2()
//   // 只要一个await语句后面的Promise变为reject，那么整个async函数都会中断执行。
//   // 为了避免这个问题，可以将第一个await放在try...catch结构里面，这样第二个await就会执行。
//   await 3
//   return 'a_f'
// }
// let f2 = function () {
//   console.log('2');
// }
// a_f().then(x => console.log(x)) // undefined
// console.log(a_f()); // a_f

// async function a_f2 () {
//   try {
//     await f3()
//     await f4()
//     await f5()
//   } catch (error) {
//     console.log(error);
//   }
// }
// function f3 () {
//   console.log('f3');
// }
// function f4 () {
//   throw new Error('后面的await会中断吗？')
// }
// function f5 () {
//   console.log('f5');
// }
// a_f2()  // 答案是会中断  如果await后面的异步操作出错，那么等同于async函数返回的Promise对象被reject

// // async 函数的实现  async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里
// function f3 (params) {
//   return spavn(function* () { })
// }
// // 自动执行器
// function spavn (genf) {
//   return new Promise(function (resolve, reject) {
//     let gen = genf()
//     function step (nextF) {
//       let next = undefined;
//       try {
//         next = nextF()
//       } catch (error) {
//         return reject(error)
//       }
//       if (next.done) {
//         return resolve(next.value)
//       }
//       Promise.resolve(next.value).then(function (v) {
//         step(function () {
//           return gen.next(v)
//         })
//       }, function (e) {
//         step(function () {
//           return gen.throw(e)
//         })
//       })
//     }
//     step(function () {
//       return gen.next(undefined) // 传值
//     })
//   })
// }

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
      console.log('transformation_this:', this); // Object [global]
      args.push(callback)
      return func.apply(this, args)
    }
  }
}
let transformation_thunk_express = transformation_thunk(fs.readFile)
let transformation_thunk_express_file = transformation_thunk_express(file)
transformation_thunk_express_file(callback)
// 总结: 这样的转换器大多数式返回一个表达式,尤其是函数的表达式,它式需要经过求值的,并不是直接返回结果,所以容易混淆








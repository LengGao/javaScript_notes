/** Promise Promise对象代表一个异步操作
 * 特点:
 * 1，对象状态不受外部影响，
 * 2，一旦状态改变就不再变，任何时候都可以得到这个结果且只可能从pending->resolve或pending->reject
 * 3，对象一旦新建九会立即执行，无法中途取消
 * 4，Promise如果不设置回调函数那么内部抛出的错误将不会反应到外部，所以再参一个回调i函数时要传入错误处理方式程序才不会死
 *
 */
var request_simulation = function (url) {
  var promise = new Promise((resolv, reject) => {
    if (!url) return reject('url_err')
    resolv('url_succ')
  })
  return promise
}
// 错误处理
// Promise.prototype.catch() 等价于 then(null,reject)
// reject作用等同于抛出错误，如果状态已经编程resolved，再抛错无效
// catch不同于trycatch/then(null,reject) 它具有冒泡性质，前面任何一个抛出的错误，都胡最后一个catch到，而trycatch没有再catch执行错误处理那么错误不会传递到外层代码，即不会有任何反应
var promise = new Promise(function (resolve, reject) {
  resolve("ok");
  // setTimeout(function () { throw new Error('test') }, 0)
});
promise.then(function (value) { console.log(value) });
process.on('unhandledRejection', (err, p) => {
  console.error('errstack', err.stack);
})
// catch方法返回的还是一个promise 即还可以用then，catch，但是后面的then再抛出错误就与前面的catch无关
var promise_2 = function () {
  return new Promise((resolve, reject) => {
    resolve(x + 2)
  })
}
promise_2().catch(err => {
  console.log('oh no:', err);
}).then(res => {
  console.log('carry on');
})
// Promise.all方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例
// 原生具有iterator接口的数据结构i有：Array,Set,Map,String,TypedArray（TypedArray是一种通用的固定长度缓冲区类型，允许读取缓冲区中的二进制数据，参考链接：https://blog.csdn.net/fanhenghui/article/details/54879873）,arguments对象，NodeList对象
var p1 = new Promise((resolve, reject) => {
  resolve('p1p')
})
var p2 = new Promise((resolve, reject) => {
  resolve('p2p')
})
var p_all = Promise.all([p1, p2]).then(([res1, res2]) => {
  console.log('res1:', res1, 'res2:', res2);
})
var p_all2 = Promise.all([p1, p2]).then((arr) => {
  console.log('全部为resolved才返回 arr:', arr);
}).catch(err_first => {
  console.log('只要有一个变为rejected那么就返回第一个rejected')
})
// Promise.race() 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数
var p_race = Promise.race([p1, p2]).then(res => {
  console.log('哪个率先改变状态哪个就是最后的返回值r', res);
}).catch(err => {
  console.log('哪个率先改变状态哪个就是最后的返回值e', err);
})
let thenable = {
  then: function (resolve, reject) {
    resolve(42);
  }
};
Promise.resolve(thenable).then(function (value) {
  console.log('value', value);  // 42
});
// Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
/**
 * 上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log(’one‘)则是立即执行，因此最先输出
 */

// 部署done方法，由于Promise内部错误不会冒泡到全局，所有Promise，then,或catch 结尾抛出错误都会捕捉不到。因此我们部署done到最尾端
Promise.prototype.done = function (onFulfilled, onReject) {
  console.log('method:', onFulfilled, onReject);
  this.then(onFulfilled, onReject).catch((err) => { throw err })
}
var p_done = new Promise((resolve, reject) => {
  resolve(1)
})
p_done.done((s) => {
  console.log('s:', s);
})
// 不管状态怎么样都执行 finally 部署
Promise.prototype.finally = function (callback) {
  let p = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}
// 不管是否时异步方法都想让它可以加then，catch
// 还在提案
// var p_f = console.log('now');
// Promise.try(p_f)
// console.log('next');

// 部署done
Promise.prototype.done = function (onFulfilled, onReject) {
  this.then(onFulfilled, onReject).catch(err => {
    throw err
  })
}
Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    (value) => { P.resolve(callback()).then(() => value)},
    (reson) => { P.resolve(callback()).then(() => reson)}
  )
}

const fn = () => console.log('非常官方');
// 如果我们不相关函数时异步函数同步我们都想让其橘鼻涕异步处理的一些列处理方法
// Promise.resolve().then(fn)
// 这样写的话 同步操作会再下一轮事件中已婚行也就是 不会理解执行，也就相当与片成了异步了
//  那么我们如果或想让异步异步执行，同步同步执行
// (async function () {
//   return fn()
// })().then((res) => console.log(res)).catch(err => console.log(err)) // 第一种
(async function() {
  return fn();
})().then().catch()

// (function () {
//   return new Promise(resolve => resolve(fn()))
// })().then().catch()
// (
//   () => new Promise(
//     resolve => resolve(fn())
//   )
// )().then().catch();
// 以上操作就可以异步函数异步执行同步函数同步执行
// 如果想讲异步函数编程同步执行呢
function getFoo () {
  return new Promise(function (resolve){
    resolve('foo');
  });
}
const promiseFun = () => new Promise(resolve => resolve('promise'))
const genertorFun = function* () {
  try {
    var n1 = yield promiseFun();
  } catch (error) {
    console.error();  
  }
} // 调用链中抛出错误我们做出出压力
function runer (gn) {
  var it = gn();
  function go (result) {
      if (result.done) return result.value; 
      return result.value.then(function (res){
        return go(it.next(res))
      },function(err) {
        return go(it.throw(err))
      })
  }
  go(it.next())
} // genertor函数自动执行器
runer(genertorFun); // 入口

function foo () {
  throw new Error('y')
  function bar () {
    throw new Error('x')
  }
  bar();
}
foo()









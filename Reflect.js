/**
 * Reflect
 * 同Proxy一样，为了将语言跟家语义化，数据跟家安全，类似于java的get，set读取数据是的对象更安全，封装的更好
 * 设计目的
 * 1，将一些明显属于语言内部的方法如 Object.defineProperty 在未来都将部署在Reflect上，便于新API的加入，和分类，不再都部署再Object之上，
 * 2，修改默写方法返回结果，Object跟多的是描述一个数据的类型，而Relect主要猫叔再方法，比Object更上层
 * 3，让语言更高级，减少像，name in obj  delete obj[prop]，纸样的指令形式操作，Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)
 * 4，它是默认行为的归集，不管怎么再Proxy上修改默认行为，总可以再Relect上找到
 */
// ! 由于ES6不玉奴徐使用Object.Observer() 来监听独享的属性变化了
// 我们转而插曲 proxy 与 Relect  来实现。其实这也是以重作用
const queuedObservers = new Set()  // 观察者
const observe = fn => queuedObservers.add(fn)

const observable = obj => new Proxy(obj, {
  set: function (target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    queuedObservers.forEach(observer => observer())
    return result
  }
}) //obj 观察目标  observable 观察器/监视器

const obj1 = {
  name: 'zs',
  age: 12
}

const obj2 = new Proxy(obj1, {
  set: function (target, key, value, receiver) {
    console.log('receiver:', receiver);
    console.log('target:', target);
    // return Reflect.set(target, key, value, receiver)
    return 23
  }
})
obj1.hello = 'hello'  // { name: 'zs', age: 12, hello: 'hello' }  revi  最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）。
// 比如：假设有一段代码执行 obj.name = "jen"， obj 不是一个 proxy，且自身不含 name 属性，但是它的原型链上有一个 proxy，那么，那个 proxy 的 set() 处理器会被调用，而此时，obj 会作为 receiver 参数传进来。

obj2.hello = 'hello' //  name: 'zs', age: 12 } this.props.

console.log('target:', obj1, 'receiver:', obj2);

// 应用
// 数据劫持，验证操作
//  劫持验证年龄
let handler_age = {
  get: function (target, key) {
    return Reflect.has(target, key) ? target[key] : 37
  },
  set: function (target, key, value) {
    if (key === 'age') {
      if (Number(value) > 200 || !Number.isInteger(value)) throw new RangeError('the age is involid')
    }
    return Reflect.set(target, key, value)
  }
}
let proxy_age = new Proxy({}, handler_age)
proxy_age.age = 20
console.log('proxy_age:', proxy_age.age);

// 函数节流
// 该实例通过proxy的handler.apply()拦截了函数调用,当只有时间超过1s时候函数才会再次被调用
const createThrottleProxy = (fn, rate) => {
  let lastClick = Date.now() - rate
  return new Proxy(fn, {
    apply (target, context, args) {
      if (Date.now() - lastClick >= rate)
        fn.bind(target)(args)
      lastClick = Date.now()
    }
  })
}
const handler = () => console.log('Do something...');
const handlerProxy = createThrottleProxy(handler, 1000);
// document.addEventListener('scroll', handlerProxy) // 因为是node环境 没有document


// 图片懒加载
// const IMG_LOAD = 'https://img.alicdn.com/tfs/TB11rDdclLoK1RjSZFuXXXn0XXa-300-300.png';
// const ImageProxy = (loadingImg) => {
//   return new Proxy(Image, {
//     construct: function (target, args) {
//       const instance = Reflect.construct(target, args)
//       instance.src = loadingImg;
//       return instance;
//     }
//   })
// }
// const imageProxy = ImageProxy(IMG_LOAD);
// const createImageProxy = (realImg) => {
//   const img = new ImageProxy()
//   const virtualImg = new Image()
//   virtualImg.sr = realImg
//   virtualImg.onload = () => {
//     hasloaed = true,
//       img.src = realImg
//   }
// }
// var img = createImageProxy('https://cdn.dribbble.com/users/329207/screenshots/5289734/bemocs_db_dribbble_03_gold_leaf.jpg');
// document.body.appendChild(img);

// 单例模式
function makeSingleton (func) {
  let instance, handler = {
    construct: function (target, args) {
      if (!instance) {
        instance = new func()
      }
      return instance
    }
  }
  return new Proxy(func, handler)
}
function Test () {
  this.value = 0;
}
const t1 = new Test(), t2 = new Test()
t1.value = 123
console.log('Normal:', t2.value);  // 0 - 因为 t1、t2 是不同的实例
const TestSimgleton = makeSingleton(Test)
s1 = new TestSimgleton()
s2 = new TestSimgleton()
s1.value = 123
console.log('Singleton:', s2.value);  // 123 - 现在 s1、s2 是相同的实例。


// 居于次可以实现Vue得双向绑定 比dinPropert实现方比那得多
// 简单版
// 基于defineProperty
let obj_bind = { name: 'zs' }
console.log('obj_bind.name', obj_bind.name);
let newName = obj_bind.name
Object.defineProperty(obj_bind, 'name', {
  get: function () {
    console.log('get');
    return newName
  },
  set: function (val) {
    console.log('set', val);
    newValue = val
    // document.getElementById("text").innerText = newName;
    // document.getElementById("box").value = newName;
  }
})
obj_bind.name = "张无忌";
obj_bind.age = 12
console.log('obj_bind.name', obj_bind.name);

//说明Object.defineProperty具有监听作用 
// 劫持data数据的getter和setter操作。这使得data在被访问或赋值时，动态更新绑定的数据的页面元素
// 但是 只能劫持一个属性，需要对对象遍历进行批量劫持  ， 无法监听数组变化
// 基于 Proxy 修改上面代码
let obj_bind_pro = new Proxy(obj_bind, {
  get (target, key, receiver) {
    return target[key]
  },
  set (target, key, value, receiver) {
    target[key] = val;
    // document.getElementById("text").innerText = target[key];
    // document.getElementById("box").value = target[key]
  }
})
// 总结Object.defineProperty只能监听属性，而Proxy能监听整个对象
// Object.defineProperty只能监听对象一个属性，通过遍历监听所有
// Proxy可以监听整个对象，不用再去遍历所有属性进行劫持了，这样就省去了遍历元素
// Object.defineProperty不能监测到数组变化，Proxy可以。







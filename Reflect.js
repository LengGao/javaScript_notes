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
// 基于以上我们可以实现数据的双向绑定

class Vue {
  constructor(configs) {
    this.root = configs.root
    this._data = configs.data
    this._data._bindings = {}
    this.method = configs.method
    this.data = new Proxy(this_data, set)
    this._complie(this.root)
  }
}






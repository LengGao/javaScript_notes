// Proxy 可以让他程序员对语言底层进行元编程，应为有了一层拦截所以才把权限放出来

var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    // console.log(`getting ${target},${key},${receiver}!`);
    console.log('getting：' + key.toString())
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, value, receiver) {
    console.log('setting：' + key.toString(), 'value', value)
    return Reflect.set(target, key, value, receiver)
  }
})
obj.count = 1
++obj.count
var proxy_obj1 = new Proxy(this, {
  get: function (target, property) {
    console.log('this', this); //指向代理原型ProxyHandler 对象
    return 35
  }
})
console.log('getting_p_b_1:', proxy_obj1.name, proxy_obj1.age); // getting_p_b_1: 35 35

// 可取消的Proxy实例
let target = {}
let handle = {}
let { proxy, revoke } = Proxy.revocable(target, handle) // ProxyHandler<T>): { proxy: T; revoke: () => void; };
proxy.foo = 2
revoke() // 调用后，上一行代码将报错，因为Proxy实例被取消


// this 问题
var proxy_target = {
  m: function () {
    console.log("complie:", this === proxy_this, this);
  }
}
var proxy_handle = {}
var proxy_this = new Proxy(proxy_target, proxy_handle)
proxy_target.m() // false
proxy_this.m() // true
// Proxy非同名代理 进行过代理后，目标对象得this 会指向代理生成得实例对象，并且无法指向目标对象 此外，有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。
// 因此我们采用this绑定原始对象来解决此类问题
var target_bind = new Date('2020-2-2')
var handle_bind = {
  get: function (target, key, receiver) {
    if (key === 'getDate') return target.getDate.bind(target)
    return Reflect.get(target, key, receiver)
  }
}
var proxy_bind = new Proxy(target_bind, handle_bind)
console.log('getDate:', proxy_bind.getDate());


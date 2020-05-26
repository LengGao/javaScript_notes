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









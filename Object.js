let arr = [1, , null, undefined, '']
let obj = {
  a: 1,
  'b': null,
  'c': 2,
  d: undefined,
  ['a' + 'b']: 123, // 字面量定义属性名/方法名 []中可以写入表达式 
  e () {
    console.log('d');
  },
  f: function () {
  },
  get h () { return 'h' },
  set h (x) { x = 'h' },
  [Symbol.g]: 'g'
}
// console.log('obj:', obj);
// console.log('arr:', ...arr); // 1 undefined null undefined
// console.log('arr:', ...arr, 'obj:', ...obj); // TypeError: obj is not iterable
let getAndset = Object.getOwnPropertyDescriptor(obj, 'h');
console.log('getAnbdSet:', getAndset.get(), obj.h); // getAnbdSet: h  h

/**
 * 对象属性的对象
 *  Descript 描述性对象
 * 描述性对象的内容
* enumerable 可枚举属性 例如：for...in,Object.keys(),JSON.stringify,Object.assign都会忽略 enumerable=false的属性
 */

/**
 * 常用遍历对象方法
 * 以下方法都遵循 数值键（升序）-> 字符键（加入顺序）-> Symbol键（加入顺序） 的顺序遍历
 * 
 */
// for...in 便利自身可枚举和继承的可枚举属性，不含Symbol
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    const element = obj[key];
    console.log('forin:', element);
  }
}
// array Object.keys() 返回滋生所有可枚举enumberable=true的属性的键名，不含Symbol
let keys = Object.keys(obj)
console.log('keys:', keys);

// array getOwnPropertyNames 返回自身所有属性的键名，不含Symbol
let getOwnPropertyNames = Object.getOwnPropertyNames(obj)
console.log('getOwnPropertyName:', getOwnPropertyNames);

// array getWnPropertySymbols 返回自身所有Symbol属性简明
let getOwnPropertySymbols = Object.getOwnPropertySymbols(obj)
console.log('getOwnPropertySymbols:', getOwnPropertySymbols);

// array Reflect.ownKeys 返回自身所有属性键名
let ownKeys = Reflect.ownKeys(obj)
console.log('ownKeys:', ownKeys);

// 返回对象 自身某一个属性/除继承的所有属性 的可描述性对象
let getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor(obj, 'a')
let getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors(obj)
console.log('getOwnPropertyDescriptor:', getOwnPropertyDescriptor, 'getOwnPropertyDescriptors:', getOwnPropertyDescriptors);

// == 自动转换数据类型  === NaN 不等于自身以及 +0 等于 -0  
// Object.is  采用同值相等算法 解决了上面两个问题，bool Object.is(anyValue,anyValue)
let objectis = Object.is(obj, {})
console.log('object.is:', objectis, +1 === -1, +0 === -0, Object.is(1, 2)); // false false true,false

/**
 * 浅拷贝 Object.assign(target,[source,....]) 将系列source对象自身的可枚举、Symbol属性拷贝到target上
 * 参数会呗自动类型转换，但不能传入单个null或undefined
 * 会替换同名属性
 * 布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性是不会被Object.assign拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。
 * Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制
 */
let assign1 = Object.assign(true)
let assign2 = Object.assign('abc')
console.log('assign1:', assign1, 'assign2:', assign2); //assign1: [Boolean: true] assign2: [String: 'abc'] [Boolean: true] [String: 'abc'
let assignArr = Object.assign([1, 2], [3, 4]) // 可以用来处理数组，但是会把数组视为对象
console.log('assign:', assignArr); //ssign: [ 3, 4 ] 
// 上面代码中 Object.assign把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1

class Ponit {
  constructor(x, y) {
    Object.assign(this, { x, y })
  }
}
Object.assign(Ponit.prototype, {
  someMethod () { }
})

// Object.fromEntries  用于将一个键值对数组转为对象
let fromEntries = Object.fromEntries([['A', 1], ['B', 2]])
console.log('fromEntries:', fromEntries); // { A: 1, B: 2 }





























/** ES2020
 * 链判断运算符  ?.  解决对象属性null或undefined的问题以及解决是否存在的属性判断,如 number?.length 依然会报错
 * 用饭
 * obj?.a
 * obj?.b
 * func?.() 函数会对象方法的调用，如a.b?.():若a.b方法存在则立即调用
 * 不能再new  super 运算符上使用
 */
// let num = 1
// if (obj?.length) {
//   console.log('yes');
// } else {
//   console.log('no');
// }


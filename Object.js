let arr = [1, , null, undefined, '']
let g = Symbol('g')
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
  [g]: 'g'
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
 * enumerable 可枚举属性 例如：for...in,Object.Keys(),JSON.stringify,Object.assign都会忽略 enumerable=false的属性
 * configurable 可配置的 只要实可配置的就可以 配置属性的描述性对象 Object.dineProperty(obj,propertyNmae,option:配置对象)
 * writable 可写入 买哦书对象是否可以修改属性值
 */

/**
 * 常用遍历对象方法
 * 以下方法都遵循 数值键（升序）-> 字符键（加入顺序）-> Symbol键（加入顺序） 的顺序遍历
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
console.log('getOwnPropertySymbols:', getOwnPropertySymbols); // []

// 定义一个或多个新得或者修改现有的属性的描述性对象 并返回该对象 此时为浅拷贝
let defineProperty = Object.defineProperty(obj, 'j', {
  value: 'j',
  writable: true,
  enumerable: true,
  configurable: true
})
let defineProperties = Object.defineProperties(obj, { k: { value: 'k', writable: true, enumerable: true, confingurable: true } })
console.log('definedProperty:', defineProperty, 'defineProperties:', defineProperties);


// array Reflect.ownKeys 返回自身所有属性键名
let ownKeys = Reflect.ownKeys(obj)
console.log('ownKeys:', ownKeys);

// 返回对象 自身某一个属性/除继承的所有属性 的可描述性对象
let getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor(obj, 'a')
let getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors(obj)
console.log('getOwnPropertyDescriptor:', getOwnPropertyDescriptor, 'getOwnPropertyDescriptors:', getOwnPropertyDescriptors);

//  hasOwnProperty 判断是否有可枚举属性
let hasOwnProperty = obj.hasOwnProperty
console.log('hasOwnProperty:', hasOwnProperty); // [Function: hasOwnProperty]

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

// Object.create(protoObj[,propertiesObject])  //往往用于类的继承
let super_obj = { name: 'zs' }
let subo_obj = Object.create(super_obj) // 继承其他对象包括原型链__proto__并放入__proto__
// subo_obj.name // zs
subo_obj.name = 'zsf'
// subo_obj.name // zsf、
let freeze_obj = Object.freeze({})
freeze_obj, name = 'ku'
console.log("freeze:", freeze_obj);
let entries_obj = Object.entries({ a: 'a', b: 'b' })
for (const [k, v] of entries_obj) {
  console.log('extries:', 'k', k, 'v', v)
  console.log('extries:', entries_obj, typeof entries_obj, entries_obj.__proto__)
}
let test_map = [['a', 'a', 'b', 'b'], ['d', 'd', 'e', 'e']]
for (const item of test_map) {
  console.log('extries:', item)
  // console.log('extries:', 'k', k, 'v', v)
  console.log('extries:', test_map, typeof test_map, test_map.__proto__)
}
let extendable_obj = {}
console.log(Object.isExtensible) // 属性是否可以扩展  是否可以在它上面添加新的属性
Object.preventExtensions(extendable_obj) //不可扩展
console.log(Object.isExtensible) // false
let sealed_obj = {}
console.log(Object.isSealed(sealed_obj)) // 对象是否是密封的 （不可以添加新属性）
Object.seal(sealed_obj)
console.log(sealed_obj) // false
  /**
   * seal  freeze  preventExtensions 区别
   * preventExtensions之后只是不允许添加新属性, 原有属性可修改可删除；
  seal之后不允许添加新属性， 不允许删除原有属性， 是否可修改由原属性的配置决定；
  freeze之后不允许添加新属性， 不允许删除原有属性, 不允许修改值以及属性描述符；
   */
  ;
var Ponit_subo = new Ponit()
console.log("Ponit:", Ponit.isPrototypeOf(Ponit_subo), Ponit_subo) // false
console.log('subo_obj', super_obj.isPrototypeOf(subo_obj)) // true


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

let ownKesys = new Array(1, 2, 3, 4);
console.log('ownKesys', ownKesys, Reflect.ownKeys(ownKesys))
let symbols = Symbol('a')
console.log('symbols', symbols, typeof symbols)
let symbols_obj = {}
symbols_obj = Object.defineProperty(symbols_obj, 'a', {
  configurable: false,
  // writable: false,
  enumerable: false,
  set function (value) {
    this.value = value
  },
  get function () {
    return '1'
  }
})
console.log("symbols_obj", symbols_obj, symbols_obj['a'], typeof symbols_obj['a'])

let firstName = Symbol();
let person = {};
person[firstName] = "song"
console.log(person, person[firstName], typeof person[firstName]);
// var getOwnPropertyDescriptorsperson_obj2 = Object.getOwnPropertyDescriptorsperson(person);
// console.log(Object.getOwnPropertyDescriptors());

const o1 = { a: 1 };
const o2 = { [Symbol('foo')]: 2 };
const obj_21 = Object.assign({}, o2);
console.log(obj_21); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
Object.getOwnPropertySymbols(obj_21); // [Symbol(foo)]

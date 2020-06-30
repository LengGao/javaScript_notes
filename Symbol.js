/**
Symbol 就是用来键名的原始数据类型，
目的就是为了不和其他属性名冲突
它没有字面量，不像其他原始类型一样，必须要通过专用函数赋值
形成的Symbol值并不会写入全集Symbol登记机制中，也就是不会登记Symbol 可显式转换为字符串  以及使用方式
 */
let fn_symbol = Symbol();
let str_symbol = Symbol('str');
let str2_symbol = Symbol('str');
let str = String(str_symbol);
console.log('symbol:', fn_symbol, str_symbol, str, '===', str_symbol === str2_symbol); // Symbol() Symbol(str) Symbol(str) === false
let obj_symbol = { [str2_symbol]: '做键名时Symbol值必须要放在中括号中', 'a': '字符串属性名是否要用[]' }
console.log('obj_symbol:', obj_symbol[str2_symbol], obj_symbol.a) // 做键名时Symbol值必须要放在中括号中 字符串属性名是否要用【】
// 总结：Symbol是一个不完整的类，它需要用内置的Symbol()创建匿名的 symbol值,而传入的参数时symbol描述的存在
/**
为了让Symbol值复用，因此针对复用的登录注册机制Symbol.for()，Symbol.keyFor()产生了，两个函数存在的目的就是为了让symbol值复用，形成的Symbol值会表注册在全局symbol注册表中 [key] [symbol] 结构，由于symbol()没有写入登录机制，不论调用多少次symbol()都会返回一个不同的值，因此不可以被复用
 */
// Symbol.for() 先在全局注册表先搜索是否有已经以该参数作为名称的Symbol值，有者拿出来服用，没有就新建
let for_symbol = Symbol.for('str2')
let for2_symbol = Symbol.for('str2')
console.log('for', Symbol, for_symbol === for2_symbol) // for [Function: Symbol] true
// Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key
let keyFor_symbol = Symbol.for('keyFor')
console.log('keyFor', keyFor_symbol, Symbol.keyFor) // keyFor Symbol(keyFor) [Function: keyFor]


let obj = { a: '1' }
let new_obj = Object.create(obj);
console.log('new_obj', Object.getOwnPropertyNames(new_obj)); //new_obj []

// 内置Symobol 
//  当使用instanceof运算拍段是否为该对象实例时 会启用Symobol.hasInstance
class HasInstacn {
  [Symbol.hasInstance] (foo) {
    return foo instanceof Array
  }
}

// isConcatSpreadable 表示使用 Array.prototype.concat()时是否可以展开 
let isConcatSpreadable_arr = ['a', 'b'];
isConcatSpreadable_arr[Symbol.isConcatSpreadable] = false;
console.log([].concat(isConcatSpreadable_arr, 'c')) // [ [ 'a', 'b'], 'c' ]
// 类数组 也就是有长度属性的独享，默认为false 需要手动打开，而对于一个类来说，该属性必须写成实例属性，才可以操作他的扩展性

/**
 * 知名的 Symbol.species 是个函数值属性，其被构造函数用以创建派生对象,即如果this.constructor[Symbol.species]就会使用这个属性作为构造函数，来创造新的实例对象
 * species 访问器属性允许子类覆盖对象的默认构造函数。
 */
class Species extends Array {
  static get [Symbol.species] () { return Array; }
}
let species_obj = new Species(1, 2, 3); // 对象可以使用Array原想上的方法但时却不输入Array的实例结果
const species_map = species_obj.map(x => x * x);
console.log(species_map instanceof Array, species_map instanceof Species) // true false

/**
 * 对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
 */
class Iterator {
  *[Symbol.iterator] () {
    let i = 5;
    while (i !== undefined && i > 0) {
      yield i;
      --i;
    }
  }
}
console.log([...new Iterator()]); // [ 5, 4, 3, 2, 1 ]

/**
 * 对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。
Number：该场合需要转成数值
String：该场合需要转成字符串
Default：该场合可以转成数值，也可以转成字符串
 */
let toPrimitive_obj = {
  [Symbol.toPrimitive] (hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str'
      case 'default':
        return 'default'
      default:
        throw new Error()
    }
  }
}
console.log(2 * toPrimitive_obj, '1' + toPrimitive_obj, toPrimitive_obj == 'default', String(toPrimitive_obj)) // 246 1default true str

/**
 *对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。
 */
let toStringtag = {}
toStringtag[Symbol.toStringTag] = 'foo'
console.log(toStringtag.toString()) // [object foo]

/**
 * 对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
 */

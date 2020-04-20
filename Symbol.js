/**
 * Symbol 转换为Symbol不登记
 * Symbol.for 转换为Symbol并等级
 * Symbol.keyFor 引用一个等级了的Symbol
 */

// String.prototype.match(regexp)
// 等同于
// regexp[Symbol.match](this)

let hi = Symbol()
let MyClass = {
  [hi]: 'hello',
  [Symbol.match] (string) {
    return 'easasd'.indexOf(string)
  }
}
console.log('Symbol.match:', 'ea'.match(new MyClass())); // 0

// 上述代码中表明  在class 中不能使用[hi]:'hello' 这样的命名

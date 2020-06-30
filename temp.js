/**
 * Symbol应用
 * 模块的singleton模式
 */
// 当前内容在 mod.js中
function moduleSingleton () {
  this.foo = 'hello'
}
if (!global.__foo) {
  global.__foo = new moduleSingleton()
}

module.exports = global.__foo;
// var a = require('./mod.js');
/**
 * 上述代码中，a任何时候加载的都是同一个 moduleSingleton的同一个实例，但global.__foo时任何文件都可以修改的,所以引出了下面代码
 */
const FOO_KEY = Symbol.for('foo')
function ModuleSingleton () {
  this.foo = 'hello'
}
if (!global[FOO_KEY]) {
  global[FOO_KEY] = new ModuleSingleton()
}
module.exports = global[FOO_KEY]
/**
 * 上述代码可以保证global[FOO_KEY]不会被无意间股改
 * 但是还是可以被改写的
 * var a = require('./mod.js');global[Symbol.for('foo')] = 123;
 * 若不想修改，呢么就使用激光Symobol()让其无法被引用
 */




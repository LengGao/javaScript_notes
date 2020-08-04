 /** require 与 inport
  * require 只能引入整个模块对象，，inport可以引入指定不笨内容
  * require 再仍和位置都可以使用，inport 必须写在头部，不能写在代码治仲
  * require 在运行时开始引入，import 在编译时引入，也可以说 reuire是动态的，inport是静态的
  * reuire相对import来说性能较低
  * require模块到处之后就不能再变化，inport可以变化导出内容，因为一个是拷贝，一个是引用
 */

module.export = {
  x:'x'
}

export function A() {
  return '1'
}
export var a = 'a';


 /** 阳饿模式
  * 变量必须声明后再使用、
  * 函数的参数不能有同名属性，否则报错】、
  * 不能使用with语句
  * 不能对只读属性赋值，否则报错
  * 不能使用前缀0表示八进制数，否则报错
  * 不能删除不可删除的属性，否则报错
  * 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
  *  eval不会在它的外层作用域引入变量
  *  eval和arguments不能被重新赋值
  *  arguments不会自动反映函数参数的变化
  * 不能使用arguments.callee，arguments.caller
  * 禁止this指向全局对象
  * 不能使用fn.caller和fn.arguments获取函数调用的堆栈
  * 增加了保留字（比如protected、static和interface）
  */

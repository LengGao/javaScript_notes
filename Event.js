/**
 * 事件机制
 * 宏观，围观
 * 事件循环，事件机制
 * 主线程栈，任务队列
 * 事件机制与语言线程关系
 * 非阻塞 === 异步
 * 事件环原理
 * 浏览器与node不同环境下得不同实现
 */

 /**EventTarget
  * 它是一个DOM接口，由可以接收事件，并且可以创建侦听器对象实现
  * EventTarget.addEventListener() // 再EventTarget上注册特定事件类型得事件处理程序
  * EventTarget.removeEventListener() // EventTarget 删除事件侦听器 
  * EventTarget.dispatchEvent() // 将事件分派到此EventTarget，如果当前事件是可取消的，也就是cancelable 为true并且该事件得处理方法只要有一个嗲用了Event.preventDefault 则返回值为false，否则为true, 此方法意思就是再某个对象上调用指定得事件 target.dispatchEvent(eventObject)
 */

var EventTarget = function () {
  console.log('EventTarget:',this);
  this.listeners = {}
}
EventTarget.prototype.listeners = null;
EventTarget.prototype.addEventListener = function (type,callback) {
  if (!(type in this.listeners)) {
    this.listeners[type] = []
  }
  this.listeners[type].push(callback)
}
EventTarget.prototype.removeEventListener = function (type,callback) {
  if (!(type in this.listeners)) {
      return;
  }
  var stack = this.listeners[type];
  for (let i = 0; i < stack.length; i++) {
    if (stack[i] === callback) {
      stack.splice(i,1);
      return this.removeEventListener(type,callback)
    }
  }
}

EventTarget.prototype.dispatchEvent = function (event) {
  if (!(event.type in this.listeners)) {
    return;
  }
  var stack = this.listeners[Element.type];
  event.target = this
  for (let i = 0; i < stack.length; i++) {
    stack[i].call(this,event)
  }
}
var eventTarget = new EventTarget()
console.log('eventTarget:',eventTarget)
eventTarget.addEventListener('click',function (e) {
  console.log('SELF',e)
})

var event = new Event('dog',{detail:'wang'});
this.addEventListener('dog',function (params) {
  console.log(params) // undefined 
})
this.dispatchEvent(event)
var customEvent = new CustomEvent('cat',{
  detail:{
    shut: 'miao'
  },
  canBubble: false,
  cancelable: true
});
// customEvent.
this.addEventListener('cat',function (params) {
  console.log('叫声:',params.detail.shut); // miao
})
this.dispatchEvent(customEvent)



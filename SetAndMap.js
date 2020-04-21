let s1 = new Set()
let m1 = new Map()
let iterator = {};
[1, 2, 3, 4, 5].map(x => s1.add(x))
console.log('s1:', s1); // Set { 1, 2, 3, 4, 5 }

let set_delete = s1.delete(1)
let set_has = s1.has(1)
console.log('set_delete:', set_delete, 'set_has:', set_has); //set_delete: true set_has: false
let set_clear = s1.clear()
console.log('set_clear:', set_clear, 's1:', s1); // set_clear: undefined s1: Set {}
//  总结 操作结合都会改变原籍和

/**
 * 集合遍历操作
 * keys()
 * values()
 * entries()
 * forEach()
 */

/**
 * WeakSet
 * 成员只能是对象 而且是弱引用。无法引用weakSet的成员，所以不可以遍历
 * 同时 WeakSet还是一个钩爪函数，这以为这她可以吧其他对象嘴啊换成WeakSet
 */
let ws = new WeakSet()
ws.add({})
console.log('ws:', ws); // WeakSet { <items unknown> }
let ws2 = new WeakSet([[1, 2], [3, 4]])
console.log('ws2:', ws2); // WeakSet { <items unknown> }
m1.set({ 'a': 1 }, 'map')
m1.set(1, '1')
console.log('m1:', m1.get(1), m1); // 1 Map { {} => 'map', 1 => '1' }
// 重复set后盖前 ，并且只有同一个对象的引用，Map才会是为同一个值
m1.set(1, '2')
console.log('m1:', m1.get(1), 'm1:', m1.get({ 'a': 1 })); // m1: 2 m1: undefined

// 类型转换
let m2 = [...m1]
let m3 = new Map([[1, 2], [3, 4]])
let m4 = function strMapToObj (object) {
  let obj = Object.create(null)
  for (const [key, value] of object) {
    obj[key] = value
  }
  return obj
}
// 转JOSN  如果键名都为字符串则可以直接JSON.stringify 否则先转数组在转JSON [...m1]


















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
 * for...of
 */


// Set 
let set_1 = new Set();
set_1.add(1); // Boolean
set_1.add(2);
set_1.add(3);
set_1.forEach((value, key, set) => {
  console.log('forEact', value, key, set)
})
set_1.delete(1); // Boolean
set_1.has(2);// Boolean
console.log(set_1.clear()); // 没有返回值void // undefined
let set_2 = new Set([1, 2, 3, 4])
console.log('set_2', set_2, set_2.size); //Set { 1, 2, 3, 4 } 4
// Map  同Set
let map_1 = new Map()
map_1.set(1, 2)
console.log(map_1.get(1), map_1.has(2), map_1.has(1)) // 2 false true
// 数组与Set Map 转换
let arr_set_map = [...map_1]
let set_map_arr = new Map([['1', 4], ['2', 5]])
console.log(arr_set_map, set_map_arr, arr_set_map.flat())
// map 转换为对象
function strMapToObj (strMap) {
  let object = Object.create(null)
  for (const [k, v] of strMap) {
    object[k] = v;
  }
  return object;
}

/**
 * WeakSet WeakMap
 * 这个数据结构也是不重复集合，但Weak成员只能时对象，其中的对象都时弱引用，也就是说垃圾回收机制不考虑Weak对该对象的引用，即若其他对象都不引用该对象，那么拉季会说机制会自动回收该对象占用的内容，不开率它是否还在Weak中，所以呢Weak中的成员无法引用，也不可以遍历
 * 那么它的用处时什么呢？
 * 答案是做临时储存，例如，DOM节点，不会出现内存泄漏
 * WeakMap 与 WeakSet 的却在于 WeakMap除了用对象做键名 还可以接受Null,键名所指向的对象,不计入垃圾回收机制
 */
// WeakMap另一用处就是 部署私有属性
let _couter = new WeakMap()
let _action = new WeakMap()
class Countdown {
  constructor(couter, action) {
    _couter.set(this, couter)
    _action.set(this, action)
  }
  dec () {
    let couter = _couter.get(this)
    if (couter < 1) return
    couter--;
    _couter.set(this, couter)
    if (couter === 0) {
      _action.get(this)();
    }
  }
}
let countdown = new Countdown(2, () => { console.log('DONE') })
countdown.dec()
countdown.dec()


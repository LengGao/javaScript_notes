let arr1 = [1]
let arr2 = [2, 3, 4, '']
let arr3 = [4, '6', true]
let arr4 = [7, '8', false, '']
let arr5 = [9, '10', false, '', {}]
let arr6 = [11, , '', null, undefined]
let arr7 = [12, /asdasd/, NaN]
let thisValue = this
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}
/* 
'thisValue:','执行 callback时使用的this值',不填默认为undefined
默认为积极的：会校验空数组，会校验空值，自行类型转换，不会改变原数组
naE:不计算空数组，naC:不改变原数组，waC:会改变原数组，nvE:不会计算空值，wvC:会计算空值，nT:不会类型转换再计算，wT:会类型转换再
*/
let concat = arr1.concat(arr2, arr3)
console.log('concat:', concat) // concat: [ 1, 2, 3, 4, '6', true ]


/* ---检索方法--- */


// number / -1  indexOf(item,startIndex:起始位置) 若为负数则从后往前找
let indexOf = arr2.indexOf(2)
let lastIndexOf = arr2.lastIndexOf(2)// startIndex：从此位置逆向寻找默认为长度-1，若为负数则从末尾开始偏移，即使该值为负，数组仍然会被从后向前查找，范围数组中该元素最后一次出现的索引
console.log('index,lastIndex:', indexOf, lastIndexOf)

// \* 返回第一个匹配的元素否则返回undefined  但是他可识别NaN 此类的特殊类型
let find = arr3.find(function (value, index, arr) {
  return typeof value == 'string'
}, thisValue)
console.log('find:', find, typeof find) // find: 6 string
let findIndex = arr3.findIndex(function (value, index, arr) {
  return typeof value == 'string'
}, thisValue)
console.log('find:', findIndex, typeof find) // find: 1 number

// boolean some // 用于检测数组中是否有符合条件的元素
let some = arr3.some(function (value, index, arr) {
  return value = 4
}, thisValue) //naE
let nam = arr7.some(function (v) {
  return v == NaN
})
console.log('some:', some, nam) // some: true flase

// boolean every 用于检测所有数组元素中的值是否全部符合条件符合条件，
let every = arr3.every(function (value, index, arr) {
  return value > 1
}, thisValue) // naE
console.log('every:', every) // every: true

// boolean 是否包含某个值 arr.includes(valueToFind[, fromIndex]) fromIndex 为负数则从后往前找
let includes = arr2.includes(4)


/* ---修改数组类--- */


// number:数组的长度  从头，从尾添加元素 waC
let unshift = arr1.unshift(3)
let push = arr1.push(2)

// \*：任意类型，被删除的元素 从头，从尾删除一个元素  waC
let pop = arr1.pop()
let shift = arr1.shift()
console.log('pop:', pop, 'shift:', shift, 'arr:', arr1);

// array 颠倒元素顺序 waC
let reverse = concat.reverse()
console.log('reverse:', reverse) // reverse: [ true, '6', 4, 3, 2, 1 ]


// arr：原数组引用 sort(function:排序规则) 按一定规则对数组元素排序，默认排序顺序为按字母升序。 
let sort = arr2.sort(function (a, b) {
  /**
   * 过程解析: a为第一个用于比较的元素，第二参数的后一位arr2[1] ,b为第二个用于比较的元素，第一位arr2[0]
   * 如果计算得来的结果用来确定元素的属顺序 相等则为零 如果大于则按 ASCLL值升序排序/Unicode位点进行排序
   * 如：以上述[2,3,4]做降序为例
   * fucntion compareFn(c){
   *  2-3 = -1
   * 那么 可以确定 要往后移动一位
   * 根据返回值 -1 
   * if(res < 0){
   * arr2.splice(0,1,v)
   * arr.splice(1,1,v)
   * }
   * }
   * 
   */
  // return a - b // 升序
  return b - a // 降序 
}) // waC
console.log('sort:', sort) // sort: [ 4, 3, 2, '' ]

// array fill(value,start,end) 像数组中添加固定数据 区间为 length - start/end 所以区间参数可以为负数
let fill = arr1.fill(1, 0, 3) //waC 
console.log('fill:', fill) // fill: [ '1' ]

// array copyWithin(target：开始的位置,start:,end) 将指定位置的元素复制到其他位置
let copyWithin = arr1.copyWithin(0) //waC
console.log('copyWithin:', copyWithin) // copyWithin: [ '1' ]


/* --- 筛选类--- */


// arr filter 用于筛选出数组中符合条件的所有元素
let filter = arr3.filter(function (value, index, arr) {
  return value > 1
}, thisValue) // naE
console.log('filter:', filter) // filter: [ 4, '6' ]

// arr map 返回新数组，数组中的元素为原始数组元素调用函数处理后的值。
let map = arr4.map(function (value, index, arr) {
  return value > 1
}, thisValue) // naE 
console.log('map:', map) // map: [ true, true, false, false ]

// arr flat(delpth:number) 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回，并且去空项
let flat = arr6.flat()
console.log('flat:', flat) // flat: [ 11, '', null, undefined ]

// arr slice(start,end) 从指定位置截取并返回新数组 前开后闭，从start到end之前 start 可以为负数意为从后向前但end 没有负数
let slice = arr3.slice(1, 3)
console.log('slice:', slice) // slice: [ '6', true ]

// arr:如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组 splice(start,size:删除元素的个数,itsem) 天幻删除数组 若length为填写则删除后面所有元素
let splice = arr1.splice(0, 1, '1') // waC
console.log('splice:', splice, 'arr1:', arr1) // splice: [ 1 ] arr1: [ '1' ]


/* ---转化类 */


// String join(separator:分隔符) 根据分隔符参数将数组转换为字符串
let join = arr5.join(',')
console.log('join:', join) // join: 9,10,false,,[object Object]

// valueOf() 方法返回 Array 对象的原始值。该原始值由 Array 对象派生的所有对象继承。valueOf() 方法通常由 JavaScript 在后台自动调用，并不显式地出现在代码中。
let valueOf = arr2.valueOf()
console.log('valueOf:', valueOf) // valueOf: [ 4, 3, 2, ''] 

// 将数据变为数组对象
let arrayFrom = Array.from(arrayLike) // 将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）
// ES5的写法
// var arr = [].slice.call(arrayLike); // ['a', 'b', 'c']
let arrayOf = Array.of(1, 2, 3) // 将一组值变为数组
// 将数据转换为数组
let array = Array(1)
let array2 = Array(1, 2, 3)
console.log('arrayFrom:', arrayFrom, 'arrayOf:', arrayOf, 'array:', array, 'array2:'); // arrayFrom: [ 'a', 'b', 'c' ] arrayOf: [ 1, 2, 3 ] array: [ <1 empty item> ] array2: [ 1, 2, 3 ]

// arr.toLocaleString([locales[,options]]); locales 带有BCP 47语言标记的字符串或字符串数组，关于locales参数的形式与解释，请看Intl页面
// 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。
let toLocaleString = arr3.toLocaleString()
console.log('toLocaleString:', toLocaleString)


/* ---其他--- */


/**
 * accumulator 累计值
 * currentValue 当前值
 * index 数组中正在处理的当前元素的索引。 如果提供了initialValue
 * 调用reduce()的数组
 * initialValue 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
 * 回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值
 */
// number:累计值 arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
let reduce = arr2.reduce((accumulator, currentValue) => accumulator + currentValue)
console.log('reduce:', reduce); // reduce: 9
// 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将
let reduceRight = [[0, 1], [2, 3], [4, 5]].reduceRight(
  (accumulator, currentValue) => accumulator.concat(currentValue)
)
console.log('reduceRight:', reduceRight) // reduceRight: [ 4, 5, 2, 3, 0, 1 ]
let arrT1 = [[0, 1], [2, 3], [4, 5]]
console.log(arrT1.reduce((a, b) => a + b), arrT1.reduceRight((a, b) => a + b)) //0,12,34,5 4,52,30,1


// 都返回 Iterator 对象 因此可以使用l for  of 
arr1.entries() // 对键值对的遍历
arr1.keys() //对键名的遍历
arr2.values() //对键值的遍历
for (const key of arr2.entries()) {
  /*
  entries: [ 0, 4 ]
  entries: [ 1, 3 ]
  entries: [ 2, 2 ]
  entries: [ 3, '' ]
  */
  console.log('entries:', key);
}
for (const key of arr2.keys()) {
  /*
  keys: 0
  keys: 1
  keys: 2
  keys: 3
   */
  console.log('keys:', key);
}
for (const key of arr2.values()) {
  /*
  values: 4
  values: 3
  values: 2
  values:
   */
  console.log('values:', key);
}

// 数组空位  注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点
// forEach(), filter(), every() 和some()都会跳过空位。
// map()会跳过空位，但会保留这个值
// join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
// reduceRight 

// Array.of方法用于将一组值，转换为数组 Array.of(3, 11, 8) 
// Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于2个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

// Array.from方法用于
// 将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。
// 还可以 传入 call  Array.from({ length: 2 }, () => 'jack')     Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。

// species 属性返回默认构造函数, 它用于 Array 对象的构造函数 Array:
console.log(Array[Symbol.species]) // [Function: Array]


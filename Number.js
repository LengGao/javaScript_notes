let num = new Number()
let num1 = 10
let num2 = 1.33
// MAX_VALUE 最大值
console.log('MAX_VALUE:', Number.MAX_VALUE); // 1.7976931348623157e+308
// NEGATIVE_INFINITY  负无穷大
console.log('NEGATIVE:', Number.NEGATIVE_INFINITY); // -Infinity
// POSITIVE_INFINITY  正无穷大
console.log('POSITIVE_INFINITY:', Number.POSITIVE_INFINITY); // Infinity

// 把对象的值转换为指数计数法。 
let toExponential = num1.toExponential() // 1e+1
console.log('toExponentail:', toExponential);

// 转为字符串，小数保留指定位数的数字
let toFixed = num2.toFixed(1)
console.log('toFixed:', toFixed); // 1.3

// 把数字格式化为指定长度
let toPrecision = num2.toPrecision(1)
console.log('toPrecision:', toPrecision); // 1

// number.toString(radix) 把数字转换为字符串，使用指定的基数
/**
 * 	可选。规定表示数字的基数，使 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。但是要注意，如果该参数是 10 以外的其他值，则 ECMAScript 标准允许实现返回任意值。
2 - 数字以二进制值显示
8 - 数字以八进制值显示
16 - 数字以十六进制值显示
 */
console.log('valueOf:', num.valueOf(), 'toString:', num1.toString(2)); // valueOf: 0 toString: 1010

console.log('round', Math.round(4.5)) // 5




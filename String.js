let str1 = '123abcEFG&^()'
let str2 = 'js html css'
let u_a = 97
let regexp = /123/ig

/* ---检索类--- */

let indexOf = str1.indexOf(1)
let lastIndexOf = str1.lastIndexOf(1)

// number:位置 search(searchValue：要搜索哦的值) 
let search = str1.search('123')
console.log('search:',search) // 0

// array: 存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。 如果没找到匹配结果返回 null  match(regexp)
let match = str1.match(regexp)
console.log('match:',match) // match: [ '123' ]

/* --- 提取类 --- */

// string charAt(index) 获取指定位置的字符串
let charAt = str1.charAt(0)
console.log('charAt:',charAt) // 1
 
// string charCodeAt 返回在指定的位置的字符的 Unicode 编码。
let charCodeAt = str1.charCodeAt(3)
console.log('charCodeAt:',charCodeAt)

// 长度 substr(index,length)
let substr = str1.substr(1,4) 
// 位置 substring(start,end) 前闭后开
let substring = str1.substring(1,4)
console.log('substr:',substr,'substring:',substring) // substr: 23ab substring: 23a

// string slice(start,end) 提取字符
let slice = str1.slice(-1.-4) 
console.log('slice:',slice) // G&^()

/* --- 操作类 --- */

// string 替换字符
let replace = str1.replace(regexp,'1123')
/**3
 * v1：匹配 到的字符串值。v2：匹配到的字符串的位置。v3：源字符串 
 */
let replace2 = str1.replace(regexp,(v1,v2,v3,v4) => {
    console.log('v:',v1,v2,v3,v4); // v: 123 0 123abcEFG&^() undefined
    return '1123'
})
console.log('replace:',replace)

let concat = 'a a'.concat(str1)
console.log('concat:',concat) // a a123abcEFG&^()

//去除字符串两边的空白
let trim = str2.trim() 
console.log('trim:',trim);

/* ---转化类--- */

// array  split(separator:【从何处开始分割字符串】,limit：【返回数组的最大长度】) 默认将字符串全部返回成一个长度为1的数组
let split = str2.split(' ',2) // [ 'js', 'html' ]
console.log('split:',split)

// string fromCharcCode(u1,u2,,,,) 将 Unicode 编码转为字符。
let fromCharCode = String.fromCharCode(u_a)
console.log('fromCharCode:',fromCharCode) // a

// 小写 大写转换
let toLowerCase = str1.toLowerCase
let toUpperCase = str1.toUpperCase
console.log('toLowerCase:',toLowerCase,'toUpperCase:',toUpperCase,'考虑到主机环境的当前区域设置，将所有字母字符转换为小写:',str1.toLocaleLowerCase('window')); // toLowerCase: [Function: toLowerCase] toUpperCase: [Function: toUpperCase] 考虑到主机环境的当前区域设置，将所有字母字符转换为小写: 123abcefg&^

let valueOf = str1.valueOf()
console.log('返回原始值:',valueOf, typeof valueOf); // 返回原始值: 123abcEFG&^() string

//  html 包装方法
// anchor(mame) 方法用于创建 HTML 锚。miao 点
let anchor = str2.anchor('chap10')
console.log('anchor :',anchor); // <a name="chap10">js html css</a>
 
// link(url:string)  将字符串显示为连接

let link = str1.link('www.baidu.com')
console.log('link:',link); // <a href="www.baidu.com">123abcEFG&^()</a>

// 字体加特效
let big = str2.big() // 大号
let bold = str2.bold() // 粗体
let blink = str1.blink() // 闪动字体
let fixed = str2.fixed()  // 打印机文本显示 
// string fontsize(number)
let fontsize = str1.fontsize(12) 
// string fontcolor (string)
let fontcolor = str1.fontcolor('#fff')
console.log('fixed: ',fixed,'fontcolor:',fontcolor); // <tt>js html css</tt>, <font color="#fff">123abcEFG&^()</font>
let sub = str1.sub() // 下标   比如化学水
let sup = str1.sup() // 上标   指数幂
console.log('sub:',sub,'sup:',sup);
// .... 































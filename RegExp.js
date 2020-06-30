let str = '123/asd *QWE/ASD[456]'
let str1 = "maomao365\n maomao365.com";

let spit = str.split(/asd/ig)
console.log('i/g:', spit); //  '123/', ' *QWE/', '[456]' ]
console.log('单行模式:', str1.match(/maomao365$/), '多行模式:', str1.match(/maomao365$/m)); //单行模式: null 多行模式: ['maomao365',index: 0,input: 'maomao365\n maomao365.com',groups: undefined]

// bool Regexp.test(string) 是否有符合正则的字符
let test = /[^123]/.test(str)
console.log('test:', test); //true

// array/null Regexp.exec(str) 找到符合正则的字符，并返回相信信息
let exec = /\w+/.exec(str)
console.log('exec:', exec); // '123', index: 0, input: '123/asd *QWE/ASD[456]', groups: undefined ]

// this regexpObject.complie(regexp:表达式,modifier:匹配模式) 编译正则表达式 在脚本执行过程中编译正则表达式/用于改变和重新编译正则表达式
let complie = /123/.compile('d')
console.log('complie:', complie, typeof complie, complie instanceof RegExp); // /d/ object true

// 用户名(以英文开头,后面包括英文、数字或_)
let username = /^[A-z]\w+$/
console.log('username:', username.test('Aa33_'));
let password = /^[A-Z]\w+$/
// 手机
let phone = /[1][\d]{10}$/
// 带区号固定电话
let tell = /^([0]{1}[1-9]{2,3}[-]?)?([1-9]{1}[0-9]{6,7}){1}$/
// 电子邮箱
let email = /^(\w+@\w+){1}(\.\w+){1,2}$/
console.log('电子邮箱:', email.test('244@qq.com')); //true
// 18位身份证号码
let id_card = /^[1-9]\d{5}[1-9]\d{3}[0,\d]{4}[\d]{3}[x,X,\d]{1}$/
console.log('身份证:', id_card.test('43048119970629721s')); // 身份证: false
// 时间(时分秒
let time = /^[0-2]?[0-9]\:[0-5][0-9]\:[0-5]{0-9}$/
// 网址
let url = /^(((https|http)?:\/\/)?(www\.)?)?[a-z0-9A-Z\u4e00-\u9fa5]+(\.[a-zA-Z]+){1,2}$/
console.log('网址:', url.test('www.baidu.com')); //true
/**
 * --- 定语/修饰符 ---
 * i 忽略大小写 默认对大小写敏感
 * g 执行全局匹配 默认为匹配第一个匹配成功的
 * m 执行多好匹配 默认为单行模式 多行模式只作用与行首与行尾
 */

/**
 * --- 范围/元组 [,:跨类别元字符分隔符,若连写则表示元字符描述范围合并，故不用分隔符分隔] (捕获内容$n) ---
 * 0-9 0到9
 * a-z 小写
 * A-Z 大写
 * x|y 匹配x或y字符
 * \u4e00-\u9fa5 中文
 */

/**
 * --- 元字符 ---
 * . 单个字符
 * \w/W 单词/非单词
 * \d/D 数字/非数字
 * \s/S 空白/非空白
 * \b/B 单词边界/非单词边界
 * \O null字符
 * \n 换行
 * \r 回车
 * \f 换页
 * \t 指标
 * \v 垂直分隔符
 * \xxx 八进制 xxx字符
 * \xdd  十六进制ddz字符
 * \uxxxx unicode xxxx 字符
 */

/**
 * --- 量词 ---
 * n+ 至少一个
 * n? 至多一个
 * n* 零或多
 * n{x[,y]} x,y数量之间
 * n{x}/{,y} 至少x或至多y个数量
 * ^n/n$ 以n开头/结尾
 * ?=n/?n  紧跟n或非紧跟n
 */


// 零宽断言 仅作约束 不同于捕获（）  所谓零宽度 就是不将其添加到实际匹配中去 只是做约束s
// 先行断言写扎后面 要求后面有什么
let str2 = 'The fat cat sat on the mat.'
let positive_antecedent_assertion = new RegExp('(T|t)he(?=\sfat)')
let negative_antecedent_assertion = new RegExp('(T|t)he(?!\sfat)')
console.log('正先行断言：', str1.match(positive_antecedent_assertion), '负先行断言：', str2.match(negative_antecedent_assertion));
// 后发断言写在前面，要求前面有什么
let positive_post_antecedent = new RegExp('(?<=(T|t)he\s)(fat|mat)')
let negative_post_antecedent = new RegExp('(?<!(T|t)he\s)(fat|mat)')
console.log("正后发断言：", str1.match(positive_post_antecedent), '负后发断言', str1.match(negative_post_antecedent));
/**
 * 我爱你 我爱 爱 爱你

如果要取出爱字，要求这个爱字后面有你，这个时候就要这么写，这就是 先行断言：

'我爱你 我爱 爱 爱你'.match(/爱(?=你)/g) // ["爱", "爱"]

如果要求爱字后面没有你，那自然也有先行否定断言：

'我爱你 我爱 爱 爱你'.match(/爱(?!你)/g) // ["爱", "爱"] ，因为匹配相同...

这个时候，如果要求爱字后面有你，前面还要有我，那就要用到后行断言了，如下：

'我爱你 我爱 爱 爱你'.match(/(?<=我)爱(?=你)/g) // ["爱"]

最后，如果要求爱字前面没有我，后面也没有我，那就要用到先行否定断言和后行否定断言，如下：
 */

let greedy_regexp = new RegExp("/(.*at)/") // 匹配尽可能行的字符串
let lazy_regexp = new RegExp("/(.*?at)/") // 匹配尽可能短的字符串

// 捕获分组 不补货分组 也就说系统暂不暂存分组 能不能用RegExp.$1|2|3.... 调用
let str3 = '我爱你 我爱 爱 爱你'
let catch_regexp = /(爱(?=你))/
console.log('catch_regexp:', str3.match(catch_regexp), '捕获分组1：', RegExp.$1); //catch_regexp: [ '爱', '爱', index: 1, input: '我爱你 我爱 爱 爱你', groups: undefined ] 捕获分组1： 爱


let s = []
function a (s) {
  let b = [s[0], s[1]] = [1, 2]
  console.log('s:', s, b);
}
a(s)
// [s[0], s[1]] = [1, 2] //但是直接用就不行


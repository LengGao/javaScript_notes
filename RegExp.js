let str = '123/asd *QWE/ASD[456]'
let str1 = "maomao365\n maomao365.com"; 

let spit = str.split(/asd/ig)
console.log('i/g:',spit); //  '123/', ' *QWE/', '[456]' ]
console.log('单行模式:',str1.match(/maomao365$/),'多行模式:',str1.match(/maomao365$/m)); //单行模式: null 多行模式: ['maomao365',index: 0,input: 'maomao365\n maomao365.com',groups: undefined]

// bool Regexp.test(string) 是否有符合正则的字符
let test = /[^123]/.test(str)
console.log('test:',test); //true

// array/null Regexp.exec(str) 找到符合正则的字符，并返回相信信息
let exec = /\w+/.exec(str)
console.log('exec:',exec); // '123', index: 0, input: '123/asd *QWE/ASD[456]', groups: undefined ]

// this regexpObject.complie(regexp:表达式,modifier:匹配模式) 编译正则表达式 在脚本执行过程中编译正则表达式/用于改变和重新编译正则表达式
let complie = /123/.compile('d')
console.log('complie:',complie,typeof complie, complie instanceof RegExp,); // /d/ object true

// 用户名(以英文开头,后面包括英文、数字或_)
let username = /^[A-z]\w+$/
console.log('username:',username.test('Aa33_'));
let password = /^[A-Z]\w+$/
// 手机
let phone = /[1][\d]{10}$/
// 带区号固定电话
let tell = /^([0]{1}[1-9]{2,3}[-]?)?([1-9]{1}[0-9]{6,7}){1}$/
// 电子邮箱
let email = /^(\w+@\w+){1}(\.\w+){1,2}$/
console.log('电子邮箱:',email.test('244@qq.com')); //true
// 18位身份证号码
let id_card = /^[1-9]\d{5}[1-9]\d{3}[0,\d]{4}[\d]{3}[x,X,\d]{1}$/
console.log('身份证:',id_card.test('43048119970629721s')); // 身份证: false
// 时间(时分秒
let time = /^[0-2]?[0-9]\:[0-5][0-9]\:[0-5]{0-9}$/
// 网址
let url = /^(((https|http)?:\/\/)?(www\.)?)?[a-z0-9A-Z\u4e00-\u9fa5]+(\.[a-zA-Z]+){1,2}$/
console.log('网址:',url.test('www.baidu.com')); //true
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



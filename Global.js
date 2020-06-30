// infinity：无穷大 NaN:非数字值 undefined
let uri = 'my test.asp?name=ståle&car=saab'

/**
 * URI，是uniform resource identifier，统一资源标识符，用来唯一的标识一个资源。
 * URL是uniform resource locator，统一资源定位器，它是一种具体的URI，即URL可以用来标识一个资源，而且还指明了如何locate这个资源
 */

// 将字符串编码为uri
let encode_uri = encodeURI(uri)
console.log('encodeURI:', encode_uri, typeof encode_uri);
// 编码为uri组件
let encode_uri_component = encodeURIComponent(uri)
console.log('encodeURIComponent:', encode_uri_component);
// 对经过encodeURI编码的uri进行解码 
let decode_uri = decodeURI(encode_uri)
console.log('decodeURI:', decode_uri, typeof decode_uri);
// 解码uri 组件
let decode_uri_component = decodeURIComponent(uri)
console.log('decodeURLComponent:', decode_uri_component);
// 区别 encodeURI 不能编码ASCLL中特殊含义字符，而encodeURIComponent可以，该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。

// 对字符串进行编码/解码 这样就可以在所有的计算机上读取该字符串 该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： * @ - _ + . / 。其他所有的字符都会被转义序列替换,不能用于编码 URI
let escapse_str = escape(`console.log('hello')`)
console.log('escape:', escapse_str, 'unescape:', unescape(escapse_str)); // console.log%28%27hello%27%29

// 计算 JavaScript 字符串，并把它作为脚本代码并执行
let eval_script = eval(`console.log('hello')`) // hello
// 判断莫格数是否是 无穷大值     是偶是数字值
console.log('isFinite', isFinite(12), 'isNaN', isNaN(12));

let setTimeout_id = setTimeout((a, b) => {
  console.log('setTimeout', a, b) // a b
}, 1000, 'a', 'b');







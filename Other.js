const const1 = {}
const const2 = { url: 'www.baidu.com' }
const1.url = 'www.baidu'
// obj = {url: 'www.baidu.com'}
// obj2 = {url: 'www.baiducc.com'}
console.log(const1);
console.log(const2);
/**
 * cosnt obj = {} 引用了空对象
 * obj = {url: 'xxx'} 此时改变了对象的引用
 * obj.url = 'xxx' 添加或删除成员则是在原来的地址上进行
 * 
 */
const a = {
  fav: function () {
    console.log("this", this, typeof this); // fav {}
    return this
  }
}
const b = new a.fav(); // fav {}+
console.log(b);





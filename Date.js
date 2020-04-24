let date = new Date()
console.log('date:', date);
Date.prototype.format = function (date) {
  console.log('this', this)  // 谁直接调用this thsi 指向谁 因此在调用时 指向 Date实例对象
  var res = {
    'M+': this.getMonth() + 1,  //  都是 number 类型 
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3), // 四舍五入  季度
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(date)) {
    console.log('regexp.$1:', RegExp.$1);
    date = date.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in res) {
    if (new RegExp("(" + k + ")").test(date)) {
      console.log('res[k]', res[k], typeof res[k]);
      date = date.replace(RegExp.$1, (RegExp.$1.length == 1) ? (res[k]) : (('00' + res[k]).substr(('' + res[k]).length))); // '00' 将字符拼接，顺便将数字类型的时间值转换为字符串再根据拼接后的位置提取字符串      
    }
  }
  return date
}
let date2 = new Date().format('yyyy-M-d hh:mm:ss')

Date.prototype.Format = function (format) {
  var obj = {
    'M+': this.getMonth(),
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds()
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let key in obj)
    if (new RegExp('(' + key + ')').test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? obj[key] : ('00' + obj[key]).substr(('' + obj[key]).length));
  return format
}
let date3 = new Date().Format('yyyy-MM-dd hh:mm:ss')
console.log('date3', date3)



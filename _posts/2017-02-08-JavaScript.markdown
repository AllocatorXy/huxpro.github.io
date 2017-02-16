---
layout:     post
title:      "我的JS笔记"
subtitle:   "我自己的js文档"
date:       2017-02-08 15:00:00
author:     "AllocatorXy"
header-img: "img/js-logo.png"
header-mask: 0.3
catalog:    true
tags:
    - 前端开发
    - JavaScript
    - noteBook
---

## javaScript

### string

#### string换行
- string不能直接换行，换行需要搞事情：
    + 加号拼接
    + 每次换行行末加\
    + ES6 模板字符串

#### string操作

```javascript
let str = 'abc';
/* 按字符串下标获取字符串 */
str[0];                   // 'a', 不兼容ie6,7
str.charAt(1)             // 'b'
let str='abcdefg';
let s=str.substring(0,3); // 'abc', 不包含结束位置
/* 找到字符第一次在string中出现的下标 */
str.indexOf('c') // 2
str.indexOf('z') // -1
/* 从后往前找寻字符第一次在串中的下标 */
let str2 = 'aaa';
str2.lastIndexOf('a') // 2
/* 以某个符号拆分成数组 */
let str='1,2,3,4,5,6';
str.split(',');       // [1,2,3,4,5,6], 可以用正则匹配
```

##### userAgent
>获取浏览器UA会得到一大坨东西，用来识别浏览器不好使，这时候就要用到indexOf了

```javascript
window.navigator.userAgent.indexOf('MSIE 7.0')
```

#### 模板字符串
```javascript
let a = `string1`;     // 使用``代替''包裹字符串
let b = `string2`;
let c = `${a}and${b}`; // string1andstring2
```

### 数组(Array)

#### 数组操作

##### 声明
```javascript
let arr=[ 1, 2, 3 ];
let arr=new Array(1, 2, 3, 4);
arr = Array.of(3,2,1);
let arr=new Array(3);           // 长度为3的空数组
```

##### 转换为字符串
```javascript
let arr = [ 1, 'a', 2, 'b' ];
let arr2 = [ 1, 'a', 2, 'b' ];
arr.join('');                 // arr: '1a2b'
arr2.join('&');               // arr: '1&a&2&b'
```

##### 添加与删除
```javascript
let arr = [ 1, 2, 3 ];
arr.push(5);             // arr: [ 1, 2, 3, 5 ] 从后面插入
arr.unshift(0);          // arr: [ 0, 1, 2, 3, 5 ] 从前面插入
arr.pop();               // arr: [ 0, 1, 2, 3 ] 从后面删除
arr.shift();             // arr: [ 1, 2, 3 ] 从前面删除
```

##### 万能操作splice()
>arr.splice(m, n, ...)

- 从下标m开始，删除n个；
- 若n大于剩余长度，也可以执行；
- 若后面有元素则插入后面的元素；

```javascript
let arr1 = [ 1, 2 ]
arr.splice(1, 2, 'a', 'b', 'c');    // arr: [1, a, b, c]
```

##### 排序和连接
```javascript
let arr = [ 1, 2, 3 ];
let arr1 = [ 4, 5, 6 ];
let arr2 = [ 7, 8, 9 ];
let arr3 = [ 31, 22, 15, 47, 'aa', 'bz', 'aa', 22 ];
alert(arr.concat(arr1,arr2));    // [1,2,3,4,5,6,7,8,9] 数组连接
alert(arr.reverse());            // [3,2,1] 数组倒序排列
alert(arr3.sort());              // [15,22,22,31,47,'aa','aa','bz'] 数组默认排序
alert(arr3.sort(function(a, b) { // 从小到大，return b-a是从大到小
        return a - b;
    }));
```

##### 清空数组
```javascript
let arr = [ 1, 2, 3, 4, 5 ];
arr.length = 0;     // function 1
arr.splice(0, 5);   // param1: index, param2: amount
while(arr.length > 0){
    arr.pop();
}
```

### 基本数据类型
    1. string
    2. number
    3. boolean
    4. undefined
    5. function     // 官方文档里没有定义function为数据类型，但typeof可以弹出
    6. object       // 可分为元素,array,null
    7. global       // es6顶层对象

#### 数据真假(true/false)
```javascript
    false: false, 0, '', null, undefined, NaN;
    true: true, 非空对象, 非0数字, 非空字符串;
```

#### 检测数据类型
- isNaN() -> is **Not** a Number?true:false
    + NaN == NaN -> **false**
- typeof sth -> type of sth

#### 类型转换

##### 显式转换

###### 转换函数
**转换函数是将字符串中第一个有效数字转换为数字**

```javascript
// string转换成整数,不一定是十进制,parseInt支持基方法,可指定基数来转换其他数字为十进制
parseInt('string')   
parseInt('0xA')          // result: 10
parseInt('0010')         // result: 10
parseInt('FF', 16)       // result: 255

// string转换成浮点数，不支持基方法
parseFloat('string')    
parseFloat('2.2.5')      // result: 2.2
parseFloat('0100')       // result: 100
```

###### 强制类型转换
```javascript
Boolean(value)      // '',0,null,undefined -> false
Number(value)       // Number与转换函数不同在于，非数字将直接转换为NaN
String(value)
```

##### 隐式转换
```javascript
var x = '2'*2;    // result: 4
var y = '2'+2;    // result: '22' *加号就当连字符处理了*
/* 利用隐式转换可以便捷转换 */
var z = 2+'';     // result: '2'
var n = '2'*1;    // result: 2
```

### 流程控制语句

#### 循环

##### break
```javascript
// 停止执行 result:0 1 2
for (let i = 0; i <= 5; i++) {
    if (i==3) {
        break;
    }
    alert(i);
}
```

##### continue
```javascript
// 跳过本次执行 result:0 1 2 4 5
for (let i = 0; i <= 5; i++) {
    if (i==3) {
        continue;
    }
    alert(i);
}
```

#### 判断

##### 三目运算符
**三目运算符可用于缩写判断语句**

```javascript
if(condition){...} else {...} => condition ? statement1 : statement2;

if(true){...} => condition && statement1; 

if(false){...} => condition || statement1;
// 用'||'的情况下,第一个条件true,不检测第二个直接返回true;
// 第一个条件false，会执行第二个条件检测。
```

### 作用域
在函数内部声明变量，则变量是该函数的`局部变量`，在外部声明变量，则变量是`全局变量`；<br />
局部变量的作用域就是`该函数内部`，全局变量的作用域就是全局；<br />
**!!若在函数内部不用指令声明变量，则实际声明了一个`全局变量`;!!**

```javascript
function fn() {
    i = 1;  // globally scoped
}
window.onload = function () {
    fn();
    alert(i);   // 1
};
```

### 日期对象Date()
- 当日期对象声明时，会获取到当前时间，并且**不会**自动改变，所以这里用`const`比较好;
- 注意月份在计算机中存储是`0-11`，所以设置和获取的时候都要做处理;
- 时间对象会自动**进位**，例如当月份为12时，年份+1;

```javascript
const oDate = new Date();
oDate.setFullYear(2018, 1, 14);       // 设置oDate为2018年2月14日
oDate.setHours(h, m, s, ms);          // 设置oDate的时分秒和毫秒
const oHours = oDate.getHours();      // 获取oDate的小时数
const oMin = oDate.getMinutes();      // 获取oDate的分钟数
const oSeconds = oDate.getSeconds();  // 获取oDate的秒数
const oMonth = oDate.getMonth() + 1;  // 获取月份为2月
const oMonth = oDate.getDay();        // 星期n, 0-6, 0是星期天
const oTime = oDate.getTime();        // 获取时间戳,1970.1.1 00:00至当前时间对象的毫秒数
```

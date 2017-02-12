---
layout:     post
title:      "我的JS笔记"
subtitle:   "我自己的js文档"
date:       2017-02-12 15:00:00
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

#### 模板字符串
```javascript
    let a = `string1`;     // 使用``代替''包裹字符串
    let b = `string2`;
    let c = `${a}and${b}`; // string1andstring2
```

### 基本数据类型
    1. string
    2. number
    3. boolean
    4. undefined
    5. function     // 官方文档里没有定义function为数据类型，但typeof可以弹出
    6. object       // 可分为元素,array,null
    7. global       // es6顶层对象

### 类型转换

#### 显式转换

##### 转换函数
*转换函数是将字符串中第一个有效数字转换为数字*
```javascript
// string转换成整数,不一定是十进制,parseInt支持基方法,可指定基数来转换其他数字为十进制
parseInt('string')   
parseInt('0xA')         // result: 10
parseInt('0010')         // result: 10
parseInt('FF', 16)      // result: 255

// string转换成浮点数，不支持基方法
parseFloat('string')    
parseFloat('2.2.5')     // result: 2.2
parseFloat('0100')      // result: 100
```

##### 强制类型转换
```javascript
Boolean(value)      // '',0,null,undefined -> false
Number(value)       // Number与转换函数不同在于，非数字将直接转换为NaN
String(value)
```

#### 隐式转换
**因为js是弱类型语言，可以直接搞事情**

```javascript
var x = '2'*2;    // result: 4
var y = '2'+2;    // result: '22' *加号就当连字符处理了*
/* 利用隐式转换可以便捷转换 */
var z = 2+'';     // result: '2'
var n = '2'*1;    // result: 2
```

### 检测数据类型
- isNaN() -> is Not a Number?true:false

### 流程控制语句

#### break
```javascript
    // 停止执行 result:0 1 2
    for (let i = 0; i <= 5; i++) {
        if (i==3) {
            break;
        }
        alert(i);
    }
```

#### continue
```javascript
    // 跳过本次执行 result:0 1 2 4 5
    for (let i = 0; i <= 5; i++) {
        if (i==3) {
            continue;
        }
        alert(i);
    }
```

### let&var
**let和var的区别，在于作用域的不同**

>Global
**当在函数体之外，var与let没有区别**

```javascript
    let a = 1;  // globally scoped
    var b = 1;  // globally scoped
```

>Function
**当在函数体之外，var与let没有区别**

```javascript
    function (){
        let a = 1;  // function block scoped
        var b = 1;  // function block scoped
    }
```

>Block
**let只在最内层有效，而var在整个函数可见**

```javascript
    function (){
        /* j is visible in here */
        for(let i=0;i<5;i++){
           // i is only visible in here
        }
        for(var j=0;j<5;j++){
           // j is visible in here
        }
        /* j is visible in here */
    }
```

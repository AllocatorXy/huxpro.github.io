---
layout:     post
title:      "js函数的返回值"
subtitle:   "返回变量，对象和返回函数都一样么？"
date:       2017-02-13 11:06:00
author:     "AllocatorXy"
header-img: "img/post-bg-js-module.jpg"
header-mask: 0.3
tags:
    - 前端开发
    - JavaScript
---

### js返回值

偶然发现，js在return时，返回的是函数的情况，这个函数并**不会被执行**，而是直接返回它本身。

```javascript
function a() {
    console.log('msg0');
    return function () {
        console.log('msg1');
        return 'done';
    };
}
let res = a(); 
let type = typeof res;
// console: msg0
// res: function () {console.log('msg1'); return 'done';}
// type: function
```

如果我**非要**return一个函数并且让他**执行**怎么办？
在上面栗子中，可以看出res只是执行了一次外部函数，内层return的函数并没有执行;
我们知道了返回值是可以返回**函数类型**的，而以上栗子中，res接收了a()的返回值
↓于是这样就可以执行↓

```javascript
function a() {
    console.log('msg0');
    return function () {
        console.log('msg1');
        return 'done';
    };
}
let res = a(); 
res();                  // 运行赋给res的a函数返回的函数
let type = typeof res;
// console: msg0 msg1
// res: function () {console.log('msg1'); return 'done';}
// type: function
```

或者在给res赋值的时候**直接**把返回的函数运行

```javascript
function a() {
    console.log('msg0');
    return function () {
        console.log('msg1');
        return 'done';
    };
}
let res = a()(); 
let type = typeof res;
// console: msg0 msg1
// res: done
// type: string
```

>那么如果返回的是一个变量，而不是函数，我们得到的是

```javascript
function a() {
    console.log('msg0');
    return function () {
        console.log('msg1');
    };
}
let res = a(); 
let type = typeof res;
// console: msg0
// res: function () {console.log('msg1');}
// type: function
```

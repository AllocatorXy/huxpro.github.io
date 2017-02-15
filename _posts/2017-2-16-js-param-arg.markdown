---
layout:     post
title:      "parameter&argument"
subtitle:   "js中的参数传递，传值与传址"
date:       2017-02-16 1:04:00
author:     "AllocatorXy"
comments: true
header-img: "img/post-bg-js-module.jpg"
header-mask: 0.3
tags:
    - 前端开发
    - JavaScript
---

#### parameter&argument
>**形式参数(parameter)**是函数定义时的参数;<br />
>**实际参数(argument)**是函数调用时实际传入的参数。

```javascript
let n1 = 10;
let a1 = [ 'a', 'b', 'c' ];
function test(num, arr) {
    num = 20;
    arr[1] = 'z';
    console.log(num);       // 20
    console.log(arr[1]);    // z
}
test(n1, a1);
console.log(n1);            // 10 <= n1没有被改变
console.log(a1[1]);         // z  <= a1[1]被函数改变了
```

这个栗子中，声明test函数时，`test(num, arr)` <= 这里的`num`和`arr`就是test函数的**形式参数(parameter)**<br />
而在调用函数时，`test(n1, a1)` <= 这里的`n1`和`a1`就是调用时传入的**实际参数(argument)**<br />

#### arguments对象
arguments对象用于获取函数调用时的**实际参数(argument)**<br />
>需要注意：arguments是一个对象，而不是数组


```javascript
let n1 = 10;
let a1 = [ 'a', 'b', 'c' ];
function test() {
    arguments[0] = 20;
    arguments[1][1] = 'z';
    console.log(arguments[0]);       // 20
    console.log(arguments[1][1]);    // z
}
test(n1, a1);
console.log(n1);                     // 10 <= n1没有被改变
console.log(a1[1]);                  // z  <= a1[1]被函数改变了
```
上面的栗子可以看出：<br />
1. 用arguments直接代替形参，函数运行的结果没有改变；
2. **形式参数(parameter)**可以少于**实际参数(argument)**，甚至可以没有。

**实际上**，**形式参数(parameter)**与**实际参数(argument)**并没有直接关系，**实参少于形参**也是可以的。

```javascript
let n1 = 10;
let a1 = [ 'a', 'b', 'c' ];
function test(num, arr, a) {
    num = 20;
    arr[1] = 'z';
    console.log(num);       // 20
    console.log(arr[1]);    // z
    console.log(a);         // undefined
}
test(n1, a1);
console.log(n1);            // 10 <= n1没有被改变
console.log(a1[1]);         // z  <= a1[1]被函数改变了
```

#### 传值与传址

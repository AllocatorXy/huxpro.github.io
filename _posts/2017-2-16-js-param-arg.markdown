---
layout:     post
title:      "js中的参数传递，传值与传址"
subtitle:   "什么是形参和实参，传值和传址两种参数传递有何不同？"
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
```

声明函数时，`test(num, arr)` <= 这里`num`和`arr`就是test函数的**形式参数(parameter)**<br />
调用函数时，`test(n1, a1)` <= 这里`n1`和`a1`就是调用时传入的**实际参数(argument)**

#### arguments对象
arguments对象用于获取函数调用时的**实际参数(argument)**;

>需要注意：arguments是一个对象，而不是数组；<br />
>它具有length属性，它的长度由实参数量决定；

```javascript
let n1 = 10;
let a1 = [ 'a', 'b', 'c' ];
function test() {
    arguments[0] = 20;
    arguments[1][1] = 'z';
    console.log(arguments[0]);       // 20 <= 运行结果没有改变
    console.log(arguments[1][1]);    // z  <= 运行结果没有改变
}
test(n1, a1);
```
上面的栗子可以看出：<br />
1. 用arguments直接代替形参，函数运行的结果没有改变；<br />
2. **形式参数(parameter)**可以少于**实际参数(argument)**，甚至可以没有。

**实际上**，**形式参数(parameter)**与**实际参数(argument)**并没有直接关系，**实参少于形参**也是可以的，未匹配的形参将被赋值`undefined`;

```javascript
let n1 = 10;
let a1 = [ 'a', 'b', 'c' ];
function test(num, arr, a) {
    num = 20;
    arr[1] = 'z';
    console.log(num);       // 20 <= 运行结果没有改变
    console.log(arr[1]);    // z  <= 运行结果没有改变
    console.log(a);         // undefined <= 未匹配的形参
}
test(n1, a1);
```

#### 传值与传址
上面的栗子有一个有趣的现象，打印函数执行后的`n1`和`a1`发现，`n1`的值**没有改变**，而`a1`**却被改变了**，`n1`传进函数作为局部变量仅在函数内部改变，而`a1`的改变却是不可逆的。

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

如何理解传值与传址呢？看两个更为直接的例子吧。

###### 传值
```javascript
let a = 1
let b = a;
b = 9;
alert(a);   // 1
```
a的值**没有变化**，在这个栗子中，a的值赋给b，然后得到a赋值的b被赋值为9，但最后a的值并没有发生改变;<br />
>a的值被操作过程中，对**实际的值**做了一份**复制**，这份复制存在b中<br />
>**复制的值**和**原来的值**是两份独立的值，修改复制的值，原值自然不会发生改变。

###### 传址
```javascript
let objA = new Object();
objA.value = 1;

let objB = objA;
objB.value = 9;
alert(objA.value);   // 9
```
两个**相同的例子**，只是把数据类型换成了对象，就有了不一样的结果;<br />
如果按照传值的逻辑，这里修改的是objB的值，为什么objA也跟着变了呢？<br />
>`let objB = objA;`将objA的值赋给objB，同样**也会复制一份**objA的原值存到新变量objB的空间中;<br />
>不同的是，这个值的副本实际上是一个指针，指针指向原值的对象，当改变其中任一个变量（或对象的属性）时，另一个的值也会发生变化。

##### 结论
>JS的函数是按值传递的，如果参数传的是基本类型的值(Number, Boolean, String等)，那么传的是值的副本(**函数操作对实参没有影响**);<br />
>如果传的是引用类型的值，那么传递的其实是指针，函数操作会影响引用对象
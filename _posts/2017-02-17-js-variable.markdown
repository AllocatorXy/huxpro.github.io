---
layout:     post
title:      "js变量与提升"
subtitle:   "如何正确使用let&const, var为什么不好使?"
date:       2017-02-17 11:25:00
author:     "AllocatorXy"
comments:   true
header-img: "img/post-bg-js-module.jpg"
header-mask: 0.3
tags:
    - 前端开发
    - JavaScript
---

#### 作用域
在ES6之前，JavaScript是**没有**块级作用域的，只有**<font color="red">全局作用域</font>**和**<font color="red">函数作用域</font>**；

```javascript
    var a = 1; // globally scoped
function fn() {
    var a = 1; // function block scoped
}
```
<hr />

#### 提升(Hoisting)
>在js中，var声明变量和直接声明函数，会发生提升现象，声明会被提到js最高处;

##### 变量提升
这是一个很普通的函数，alert全局变量`str`；

```javascript
var str = 'Hello World'; 
(function() { 
    alert(str); // Hello World
})();
```
<hr />

如果在alert后面var一个同名的局部变量，居然不能正常alert了，这就看起来很诡异了，因为我们知道，js的代码是由上至下运行的，就算是在这个**<font color="red">函数作用域内部</font>**的局部变量`str`覆盖了全局变量，也应该是先弹出`Hello World`才符合常识；<br />
就算是覆盖掉了，并且弹出这个局部变量，也应该是弹出`test`而不是`undefined`;

```javascript
var str = 'Hello World'; 
(function() { 
    alert(str); // undefined
    var str = 'test';
})();
```
<hr />

这就牵扯到了js的**<font color="red">变量提升</font>**<br />
>在使用`var`声明变量时，**<font color="red">声明</font>**会被**提升**到当前作用域的顶部，但**<font color="red">变量值</font>****不会被提升**。

于是上面的代码实际上被解析成了这样：

```javascript
var str = 'Hello World'; 
(function() { 
    var str;    // 声明被提升到了函数作用域顶部，在域内覆盖了全局变量，但此时没有被赋值
    alert(str); // undefined
    str = 'test';
})();
```

当声明多个变量时，最后被解析会变成这样：

```js
(function() {                      (function() {
    alert(a);          ===>            var a,b;
    alert(b);          ===>            alert(a); // undefined
    var a = 1;         ===>            alert(a);
    var b = 2;                         a = 1; b=2;
})();                               })();
```
<hr />

##### 函数提升
类似于变量提升，js中函数声明也会<font color="red">提升(Hoisting)</font>，不同的是，函数提升会将**<font color="red">整个函数声明</font>**(包括函数体)提升到当前作用域的顶部，这可以使我们**先**使用函数，**后**声明函数。

**但将声明的函数存储到一个变量中是不会被提升的(变量提升不会提升变量值)**：

```js
fn();   // typeError: fn is not a function
var fn = function fn() {
    alert('msg');
};
```
<hr />

#### var & let & const
**使用let和const需要用<font color="red">严格模式</font>**<br />
**let&const与var的区别：一是在于作用域的不同**，二是，var声明的变量会提升(hoisting);

- var不具有块级作用域(只能依靠函数来限制作用域)，const&let是有块级作用域的；
- var可以重复声明**覆盖**同名变量，但let和const是**不能重复声明**的，会报错；
- var声明的变量会提升(hoisting)，但const和let 是不会hoisting的；

|  指令  |块级作用域|重复声明|hoisting|
| :----: | :------: | :----: |  :---: |
|  var   |    ×     |    √   |    √   |
|  let   |    √     |    ×   |    ×   |
| const  |    √     |    ×   |    ×   |

<hr />

##### `let`&`var`

>Global<br />
>**当在函数体之外，var与let没有区别**

```javascript
let a = 1;  // globally scoped
var b = 1;  // globally scoped
```
<hr />
>Function<br />
>**当在函数体内部，var与let没有区别**

```javascript
function (){
    let a = 1;  // function block scoped
    var b = 1;  // function block scoped
}
```
<hr />
>Block<br />
>**let只在最内层有效，而var在整个函数可见**

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
<hr />

##### `const`
const命令用来声明**<font color="red">常变量(Constant Variable)</font>**<br />

- 与let相同，const自声明只在声明的**块级作用域**有效;
- 如果试图改变const的地址，会报错`TypeError: Assignment to constant variable`;
- 常变量(Constant Variable)，值可以被改变，但地址不能被改变;

```js
const num = 1;
num = 2; // TypeError: Assignment to constant variable.

for (const prop in obj) { // available
  // statement..
}
for (const i = 0; i < n; i++) { // TypeError: Assignment to constant variable.
  // statement..
}
```

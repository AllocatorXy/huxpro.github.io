---
layout:     post
title:      "js变量与提升"
subtitle:   "如何正确使用let&const, var为什么不好使?"
date:       2017-02-17 11:25:00
author:     "AllocatorXy"
comments:   true
header-img: "img/post-bg-pot.jpg"
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
>在js中，声明变量和直接声明函数，会发生提升现象，声明会被提到js最高处;

##### 变量提升
这是一个很普通的函数，alert全局变量`str`；

```javascript
var str = 'Hello World'; 
(function() { 
    alert(str); // Hello World
})();
```
<hr />

如果在alert后面`var`一个同名的局部变量，居然不能正常alert了，这就看起来很诡异了，因为我们知道，js的代码是由上至下运行的，就算是在这个**<font color="red">函数作用域内部</font>**的局部变量`str`覆盖了全局变量，也应该是先弹出`Hello World`才符合常识；<br />
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
>在声明变量时，**<font color="red">声明</font>**会被**提升**到当前作用域的顶部，但**<font color="red">变量值</font>****不会被提升**。

于是上面的代码**预编译(Precompile)**后成了这样：

```javascript
var str = 'Hello World'; 
(function() { 
    var str;    // 声明被提升到了函数作用域顶部，在域内覆盖了全局变量，但此时没有被赋值
    alert(str); // undefined
    str = 'test';
})();
```

来个更直观的栗子：

```js
// 未编译                           // 预编译后
(function() {                      (function() {
    alert(a+b+c);      ===>            var a,b,c;
    var a = 1;         ===>            alert(a+b+c); // undefined
    var b = 2;         ===>            a = 1;    
    var c = 3;                         b = 2;    
})();                                  c = 3;
                                   })();
                                   
```
<hr />

##### 函数提升
- 类似于变量提升，js中函数声明也会<font color="red">提升(Hoisting)</font>;
- 不同的是，函数提升会将**<font color="red">整个函数声明</font>**(包括函数体)提升到当前作用域的顶部，这可以使我们**先**使用函数，**后**声明函数。
- **<font color="red">函数提升的优先级高于变量</font>**

**但将声明的函数存储到一个变量中是<font color="red">不会</font>被提升的(变量提升不会提升变量值)**：

```js
fn();   // typeError: fn is not a function
var fn = function fn() {
    alert('msg');
};
```
<hr />

#### var & let & const
**使用let和const需要用<font color="red">严格模式</font>**<br />

- var只有全局作用域(只能依靠函数来限制作用域)，const&let**只有**块级作用域；
- **let和const声明的全局变量不是全局对象的属性**，无法在window对象上直接获取这些变量，它们的作用域实际是所有函数的外层，一个不可见的块级作用域；
- var可以重复声明**覆盖**同名变量，但let和const是**不能重复声明**的，会发生语法错误(SyntaxError)；
- ~~var声明会提升(hoisting)，但const和let 是不会hoisting的；~~
- const&let和var一样，**也会**发生变量提升；
- **var声明的变量可以在声明出现之前访问，但let和const是不能这样做的；**

|  指令  |块级作用域|指令出现前访问|改变地址|重复声明|
| :----: | :------: |    :---:     | :----: |  :--:  |
|  var   |    ×     |      √       |    √   |    √   |
|  let   |    √     |      ×       |    √   |    ×   |
| const  |    √     |      ×       |    ×   |    ×   |

<hr />

##### 暂时性死区(Temporal Dead Zone)
这里需要先看一下关于const和let，es6中是如何定义的;<br />
**ES6 13.3.1 Let and Const Declarations**<br />
>The variables are created when their containing Lexical Environment is instantiated but may not be accessed in any way until the variable’s LexicalBinding is evaluated.<br />
>A variable defined by a LexicalBinding with an Initializer is assigned the value of its Initializer’s AssignmentExpression when the LexicalBinding is evaluated, not when the variable is created. If a LexicalBinding in a let declaration does not have an Initializer the variable is assigned the value undefined when the LexicalBinding is evaluated.<br />

**这段话是在说什么呢？**<br />
变量被创建时就已经在它们的文法环境下被实例化，但不会以任何方式被访问，直到这些变量被赋值。<br />
一个变量的定义，是在对声明的赋值语句的求值后，才算初始化完成，而不是创建时。如果在let声明中没有赋初值，则let会被赋初始值undefined.

由此我们可以得到几点信息：

- 使用let和const声明的变量，**一开始就处于作用域内**；
- 在变量被赋值之后才算完成变量的初始化；
- 初始化完成的变量才可以被合法访问；
<hr />
这就很好理解**暂时性死区(Temporal Dead Zone 以下简称TDZ)**了：
- let和const声明的变量，直到声明语句出现，位于**TDZ**中；
- **<font color="red">以任何方式(包括typeof)访问处于TDZ中的变量，就会发生引用错误(ReferenceError)，而不再是undefined(已声明未定义)</font>**

如果用`typeof`访问不存在的变量，会返回`undefined`，但如果在TDZ中这样做，会**<font color="red">直接挂掉</font>**;<br />
**<font color="red" style="font-size: 20px;" >真的会死(/"≡ _ ≡)/~┴┴</font>**

```js
/* 非TDZ */                             /* TDZ */
(function () {                       |  (function () { 
    alert(typeof i); /* undefined*/  |      alert(typeof i); /* ReferenceError */
})();                                |      let i = 1;
                                     |  })();
```
<hr />
**<font color="red" style="font-size: 20px;" >需要注意的是</font>**，TDZ的效果虽然很像是let和const没有变量提升，但实际并不是如此：

```js
let a = 1;
function fn() {      // 如果let是声明语句出现时才存在，这里会打印1
    console.log(a);  // ReferenceError，说明let还是提升了，但不可访问
    let a = 2;
}
fn();
```
<hr />

##### `const`
const命令用来声明**<font color="red">常变量(Constant Variable)</font>**<br />

- 与let相同，const自声明只在声明的**块级作用域**有效;
- 如果试图改变const的地址，会报错`TypeError: Assignment to constant variable`;
- 常变量(Constant Variable)，值可以被改变，但地址不能被改变;
- const在声明时必须初始化，不然会报错`SyntaxError: Missing initializer in const declaration`;

```js
const num = 1;
num = 2; // TypeError: Assignment to constant variable.
const a; // SyntaxError: Missing initializer in const declaration

for (const prop in obj) { // available
  // statement..
}
for (const i = 0; i < n; i++) { // TypeError: Assignment to constant variable.
  // statement..
}
```

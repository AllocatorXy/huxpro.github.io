---
layout:     post
title:      "js闭包(closure)"
subtitle:   "闭包是什么？是用来干什么的？"
date:       2017-02-14 16:50:00
author:     "AllocatorXy"
comments: true
header-img: "img/post-bg-js-module.jpg"
header-mask: 0.3
tags:
	- 前端开发
	- JavaScript
---

### js闭包(closure)
>闭包原理：js中，子函数可以访问父函数的局部变量。

虽然这句话看起来很简单，但要理解闭包和实际应用它，还是需要更深层的理解。

#### 闭包是干什么用的？
很多时候我们需要从外部获取某函数内部的变量，但如果用全局变量暴力解决，是很危险的，并且会影响性能，这时候我们就用到了闭包。
>在函数内部再声明一个函数，就形成了闭包。

```javascript

```

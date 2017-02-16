#### var & let & const
**let和var的区别，在于作用域的不同**

>Global<br />
>**当在函数体之外，var与let没有区别**

```javascript
let a = 1;  // globally scoped
var b = 1;  // globally scoped
```

>Function<br />
>**当在函数体内部，var与let没有区别**

```javascript
function (){
    let a = 1;  // function block scoped
    var b = 1;  // function block scoped
}
```

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

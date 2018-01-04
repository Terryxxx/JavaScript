/**
 * Created Date: Tuesday December 26th 2017
 * Author: Terry Xu
 * -----
 * Last Modified:
 * Modified By:
 */
//inherit()返回一个继承自原型对象p的属性的新对象
function inherit(p){
    if(p == null) throw TypeError();  //p是一个对象 但是不能为null
    if(Object.create)                 //如果Object.create()存在
        return Object.create(p);      //直接使用Object.create()
    var t = typeof p;                 //否则进一步检测
    if(t !== "object" && t !== "function") throw TypeError(); 
    function f(){};                   //定义一个空的构造函数
    f.prototype = p;                  //将其原型属性设置成p
    return new f();                   //使用f()创建p的继承对象
}

//这个工厂方法返回一个新的“范围对象”
function range(from, to){
    //使用inherit函数来创建对象， 这个对象继承自下面定义的原型对象
    //原型对象作为一个函数的一个属性值，并定义所有“范围对象”所共享的方法（行为）
    var r = inherit(range.methods);

    //存储新的“范围对象”的各个起始位置和结束位置
    //这个两个属性是不可继承的， 每个对象都拥有一个唯一的属性
    r.from = from;
    r.to = to;

    //返回一个新创建的对象
    return r;
}

//原型对象定义方法， 这些方法为每个范围对象所继承
range.methods = {
    //如果x再范围内， 则返回true， 否则返回false
    //这个方法可以比较数字范围， 也可以比较字符串和日期范围
    includes: function(x){
        return this.from <= x && x<= this.to;
    },

    foreach: function (f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++)
            f(x);
    },
    //返回表示这个范围的字符串
    toString: function(){
        return "(" + this.from + "..." + this.to + ")";
    }
}

var r =range(1,3);
r.includes(2);
r.foreach(console.log);
console.log(r);
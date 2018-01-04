/**
 * Created Date: Tuesday December 26th 2017
 * Author: Terry Xu
 * -----
 * Last Modified:
 * Modified By:
 */
//Range是一个构造函数， 用来初始化新创建的“范围对象”
//注意： 这里并没有返回一个对象， 仅仅是初始化
function Range(from, to) {
    //存储“范围对象”的起始位置和结束位置
    //这两个属性是不可继承的， 每个对象都拥有唯一的属性
    this.from = from;
    this.to = to;

}

//所有的“范围对象”都会继承自这个对象
//注意： 属性的名字必须是“prototy”
Range.prototype = {
    //constructor: Range, // 显示设置构造函数反响引用
    includes: function(x){
        return this.from <= x && x <= this.to;
    },
    foreach: function(f){
        for(var x = Math.ceil(this.from); x <= this.to; x++)
            f(x);
    },
    toString: function(){
        return "(" + this.from + "..." + this.to + ")";
    },
    equals: function(that){
        if(that == null) return false;
        if(that.constructor !== Range) return false;
        return this.from == that.from && this.to == that.to;
    }
}


// //使用预定义的原型对象， 预定义的原型对象包含了constructor属性，然后依此给原型对象添加方法
// Range.prototype.includes = function (x) {
//     return this.from <= x && x <= this.to;
// };
// Range.prototype.foreach = function (f) {
//     for (var x = Math.ceil(this.from); x <= this.to; x++)
//         f(x);
// };
// Range.prototype.toString = function () {
//     return "(" + this.from + "..." + this.to + ")";
// };


var r = new Range(2, 4);
r.includes(5);
console.log(r.includes(5));
r.foreach(console.log);
console.log(r);

//检测r是否是Range对象
//instanceof不会去检测r是否由Range()构造函数初始化而来,而是检测r是否继承自Range.prototype
//r instanceof Range

/*
 * constructor属性
 * constructor属性的值是一个函数对象
 * 
 */
var F = function (){};
var p = F.prototype;
var c = p.constructor;
c === F;

var o = new F();    //创建类F的一个对象
o.constructor = F;  // => constructor属性指代这个类
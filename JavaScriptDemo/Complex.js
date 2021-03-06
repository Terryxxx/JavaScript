/**
 * Created Date: Tuesday December 26th 2017
 * Author: Terry Xu
 * -----
 * Last Modified:
 * Modified By:
 */
/**
 *Comples.js
 *这个文件定义了Complex类，用来描述复数
 *回忆一下，复数是实数和虚数的和， 并且虚数i是-1的平方根
 */

 /*
  *这个构造函数为它所创建的每个实例定义了实例字段r和i
  *这两个字段分别保存复数的实部和虚部
  *它们是对象的状态 
  */
function Complex(real, imaginary){
    if(isNaN(real) || isNaN(imaginary))     //确保两个实参是数字
        throw new TypeError();              
    this.r = real;                          //复数的实部
    this.i = imaginary;                     //复数的虚部
}

/*
 *类的实例方法定义为原型对象的函数值属性
 * 这里定义的方法可以被所有实例继承， 并为他们提供共享行为
 * 需要主要的是，JavaScript的实例方法必须使用关键字this
 * 来存取实例的字段
 */

 //当复数对象加上另一个复数， 并返回一个新的计算和值后的复数对象
 Complex.prototype.add = function(that){
     return new Complex(this.r + that.r, this.i + that.i);
 };

 //当复数乘以另一个复数， 并返回一个新的计算乘积之后的复数对象
 Complex.prototype.mul = function(that){
     return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r);
 };

 //计算复数的模， 复数的模定义为原点(0,0)到复平面的距离
Complex.prototype.mag = function(){
    return Math.sqrt(this.r * this.r + this.i * this.i);
};

//复数的求负运算
Complex.prototype.neg = function(){
    return new Complex(-this.r, -this.i);
};

//将复数对象转换为一个字符串
Complex.prototype.toString = function(){
    return "{" + this.r + "," + this.i + "}";
};

//检测当前复数对象是否和另一个复数值相等
Complex.prototype.equals = function(that){
    return that != null &&                      //必须有定义且不能是null
    that.constructor === Complex &&             //并且必须是Complex的实例
    this.r === that.r && this.i === that.i;     //并且必须包含相同的值
};

//两个实部相等， 虚部互为相反数的复数互为共轭复数
//返回当前的共轭复数
Complex.prototype.conj = function(){
    return new Complex(this.r, -this.i);
};

/*
 *类字段(比如常量)和方法直接定义为构造函数的属性
 * 需要注意的是， 类的方法通常不使用关键字this
 * 它们只对其参数进行操作
 */


 //这里预定义了一些对复数运算有帮助的类字段
 //它们的命名全部是大写， 用以表达他们是常量
 //（在ECMScript5中， 还能设置这些类的字段的属性为只读）
 Complex.ZERO = new Complex(0, 0);
 Complex.ONE = new Complex(1, 0);
 Complex.I = new Complex(0, 1);


 //这个类方法将由实例对象toString方法返回的字符串格式解析为一个Complex对象
 //或者抛出类型错误异常
Complex.parse = function(s){
    try{
        var m = Complex._format.exec(s);
        return new Complex(parseFloat(m[1]), parseFloat(m[2]));
    }catch(x){
        throw new TypeError("Cant't parse '" + s + " ' as a Complex number.");
    }
};

//定义类的“私有”字段， 这个字段在Complex.parse()中用到了
//下划线前缀表示它是类内部使用的， 而不是类的公有API部分
Complex._format = /^\{([^,]+),([^}]+)\}$/;



var c = new Complex(2,3);       //使用构造函数创建新的对象
var d = new Complex(c.i, c.r);  //用到c的实例属性
c.add(d).toString();            //=> "{5,5}": 使用了实例的方法

//这个稍微复杂的表达式用到了类方法和类字段
Complex.parse(c.toString()).    //将c转化为字符串
    add(c.neg()).               //加上它的复数
    equals(Complex.ZERO);        //结果应当永远是“零”
console.log(Complex.parse(c.toString()).add(c.neg()).equals(Complex.ZERO));

// //with
// Complex.prototype.toString = function(){
//     with(this){
//         return "{" + r + "," + i + "}";
//     }
// }

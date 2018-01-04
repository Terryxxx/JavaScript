/**
 * Created Date: Tuesday December 26th 2017
 * Author: Terry Xu
 * -----
 * Last Modified:
 * Modified By:
 */

/*
 * Create Object
 */

//直接对象
var empty = {};
var point = { x:0, y:0};
var point2 = { x:point.x, y: point.y};
var book = {
	name:"asda",
	"main title": "JavaScript",             //属性名字里有空格，必须用字符串表示
	'sub-title': "The Definitive Guide",    //属性名字有连接符，必须用字符串表示
	"for": "all audiences",                 //“for”是保留字，因此必须用引号
	price: 100,
	author: {                               //这个属性的值是某一个对象
		firstName: "David",                 
		surName: "Flanasagan"
	}
};


/**
 *  new创建对象 
 *  new 后面跟一个函数调用
 *  这里的函数称作为构造函数（constructor）
 *  构造函数用以初始化一个新创建的对象
 *  JavaScript语言核心中的原始类型都包含了内置对象
 */
var o = new Object();       //创建一个空对象，和empty一样
var a = new Array();        //创建一个空数组，和[]一样
var d = new Date();         //创建一个表示当前时间的Date对象
var r = new RegExp("js");   //创建一个可以进行模式匹配的RegExp对象


//原型


//Object.create()
var o1 = Object.create({x:1, y:2}); //o1继承了属性x和y

var o2 = Object.create(null);       //创建一个没有原型的对象

/**
 * inherit()返回一个继承自原型对象p的属性的新对象
 * @param {*} p 
 * 这里使用ECSMAScript5中的Object.create()函数
 * 如果不存在这个函数，则使用其他方法
 */
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


/**
 *  6-2
 *  属性的查询和设置
 *  可以通过.或者[]来获取属性值
 */

var author = book.author;
var name = author.surName;
var title = blockquote["main title"];

book.edition = 6; //给book创建一个名为“edition”的属性
book["main title"] = "ECMAScript"; //给“main title”属性赋值


/**
 *  6-3
 *  删除属性
 *  delete只能删除自有属性，不能删除继承属性
 *  如果要删除继承属性，必须从定义这个属性的原型对象上删除它， 而且会影响所有继承自这个原型的对象
 */

 delete book.author;
 delete book["main title"];

 var x = 1;
 delete this.x; //false 不能删除

 this.y = 2; //声明一个全局变量
 delete this.y; //true

 function f() {}; //声明一个全局函数
 delete this.f; //false

 /**
  * 6-4
  * 检测属性
  * in运算符 hasOwnPreperty() propertyIsEnumerable() 
  */

  //in运算符  左侧是属性名字（字符串） 右侧是对象 
  //如果对象的自由属性或继承属性中包含这个属性则返回true
  var o = {x:1 };
  "x" in o;
  "y" in o;
  "toString" in o;

  //hasOwnproperty()方法用来检测给定的名字是否是对象的自有属性
  //对象继承属性它将返回false
  var o = { x: 1};
  o.hasOwnProperty("x");	//true
  o.hasOwnProperty("y");	//false
  o.hasOwnProperty("toString")	//false 继承属性

  //propertyIsEnumerable()是hasOwnProperty的增强
  //只有检测到是自有属性并且这个属性的可枚举性为true时，才返回true
  //某些内置属性是不可枚举的
  //通常JavaScript代码创建的属性都是可以枚举的
  var o = inherit({ y: 2});
  o.x = 1;
  o.propertyIsEnumerable("x");	//true
  o.propertyIsEnumerable("y");	//false y是继承
  Object.property.propertyIsEnumerable("toString");		//false 不可枚举


  //除了使用in运算符之外
  //另一种更简便的方法是使用“!==”判断一个属性是否是undefined
  var o = { x: 1};
  o.x !== undefined;	//true	o中有属性x
  o.y !== undefined;	//false	o中没有属性y
  o.toString !== undefined;	//true	o继承了toString属性

  //有一种场景只能使用in，而不能使用上述属性访问的方式
  //in可以区分不存在的属性和存在但值为undefined的属性
  var o = { x: undefined}	//属性被显示赋值为undefined
  o.x !== undefined;	//false: 属性存在，但是值为undefined
  o.y !== undefined;	//false: 属性不存在
  "x" in o;				//true
  "y" in o;				//false
  delete o.x;			
  "x" in o;				//false

  //注意， 上述代码使用的是”!==“ 而不是 ”!=“ 
  //”!==“ 可以区分undefined 和 null


  //6-4枚举属性
  /**
   * 
   */
  function extend(o,p){
      for(prop in p){
          o[prop] = p[prop];    //将属性添加至o中
      }
      return o;
  }

  //p8.6加强版extend



  /**
   * 6-8
   * 对象的三个属性
   * 原型属性 对象的类属性(class) 可扩展性
   */

   //原型属性
	var p = { x:1 };
	var o = Object.create(p);
	p.isPrototypeOf(o);	//true o 继承 p
    Object.prototype.isPrototypeOf(o);	//true p继承自Object.prototype
    
    //类的属性
    function classof(o){
        if(o === null) return "Null";
        if(o === undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8,-1);
    }

    //可扩展性

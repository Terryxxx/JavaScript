/**
 * Created Date: Thursday December 28th 2017
 * Author: Terry Xu
 * -----
 * Last Modified:
 * Modified By:
 */

 //一个函数可以看成一个类
 //原型是所有类都有的一个属性
 //原型的作用是给这个类的每一个对象都添加一个统一的方法

 function Person(name, age){
     this.name = name;
     this.age = age;
 };

 Person.prototype.show = function(){
     console.log("My name is " + this.name + " , my age is " + this.age);
 }

// //这样写只能Person.show()调用，不能p1.show()
//  Person.show = function(){
//     console.log("My name is " + this.name + " , my age is " + this.age);
//  }

 var p1 = new Person("Terry", 18);
 var p2 = new Person("xxxx", 21);

 p1.show();
 p2.show();
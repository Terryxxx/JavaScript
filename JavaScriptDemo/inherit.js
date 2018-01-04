/**
 * Created Date: Thursday December 28th 2017
 * Author: Terry Xu
 * -----
 * Last Modified:
 * Modified By:
 */

function Person(firstName){
    this.firstName = firstName;
}

Person.prototype.walk = function(){
    console.log("I am walking!");
};

Person.prototype.sayHello = function(){
    console.log("Hello,I'm " + this.firstName);
};

function Student(firstName, subject){
    // 调用父类构造器, 确保(使用Function#call)"this" 在调用过程中设置正确
    Person.call(this, firstName);
    // 初始化Student类特有属性
    this.subject = subject;
}

// 建立一个由Person.prototype继承而来的Student.prototype对象.
// 注意: 常见的错误是使用 "new Person()"来建立Student.prototype.
// 这样做的错误之处有很多, 最重要的一点是我们在实例化时
// 不能赋予Person类任何的FirstName参数
// 调用Person的正确位置如下，我们从Student中来调用它

Student.prototype = Object.create(Person.prototype);

//设置constructor属性指向Student
//Student.prototype.constructor = Student;

//更换sayHello方法
Student.prototype.sayHello = function(){
    console.log("Hello, I'm " + this.firstName + ". I'm studying " + this.subject + ".");
};

//加入sayGoodBye方法
Student.prototype.sayGoodBye = function(){
    console.log("Goodbye!");
};

var student1 = new Student("Terry", "Applied Physics");
student1.sayHello();
student1.sayGoodBye();
student1.walk();

//Check that instanceof works correctly
console.log(student1 instanceof Person);  // true 
console.log(student1 instanceof Student); // true
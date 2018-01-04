/**
 * Created Date: Thursday January 4th 2018
 * Author: Terry Xu
 * -----
 * Last Modified:
 * Modified By:
 */

// /**
//  * 最简单的方法
//  * 当创建多个对象时候会产生很多重复代码
//  */
// var person = new Object();
// person.name = "Xu";
// person.age = 18;
// person.job = "engineer";

// person.sayName = function(){
//     consol.log(this.name);
// }

// person.sayName();

// /**
//  * 工厂模式
//  * 解决了代重复问题，但是没有解决对象的识别问题(无法区分对象类型)
//  * @param {*} name 
//  * @param {*} age 
//  * @param {*} job 
//  */
// function createPerson(name, age, job){
//     var o = new Object();
//     o.name = name;
//     o.age = age;
//     o.job = job;

//     o.sayName = function(){
//         console.log(this.name);
//     };
//     return o;
// }

// var person1 = createPerson('asdasd', 25, 'asdasd');
// var person2 = createPerson('bbbb', 25, 'bbbbbaaa');

// person1.sayName();
// person2.sayName(); 
// console.log(person1.constructor);
// console.log(person2.constructor)


/**
 * 构造函数
 * 
 * @param {any} name 
 * @param {any} age 
 * @param {any} job 
 */
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;

    this.sayName = function(){
        console.log(this.name);
    };
}

var person1 = new Person('Xu', 18, 'engineer');
var person2 = new Person('Xi', 19, 'Engineer');

person1.sayName();
person2.sayName();

console.log(person1.constructor);
console.log(person2.constructor);

console.log(person1 instanceof Person);
console.log(person2 instanceof Person);
// 虽然构造函数非常好用，但是并非没有缺点，使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍，上述例子中，p1和p2的sayName被创建了两遍，这两个函数并不相等：
// console.log(p1.sayName == p2.sayName);//false
// 创建两个相同的函数并没有必要，可以把sayName函数移到构造函数外部来解决这个问题：


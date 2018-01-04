/**
 * Created Date: Wednesday December 27th 2017
 * Author: Terry Xu
 * -----
 * Last Modified:
 * Modified By:
 */

/*
 * 这个函数创建了一个新的枚举类型， 实参对表示类的每个实例的名字和值
 * 返回值是一个构造函数， 它标识这个新类
 * 注意， 这个构造函数也会抛出异常， 不能使用它来创建该类型的新实例
 * 返回的构造函数包含名/值对的映射表
 * 包括由值组成的数组， 以及一个foreach()迭代器
 * 
 */
function enumeration(namesToValues) {
    //这个虚拟的构造函数是返回值
    var enumeration = function () {
        throw "Can't Instantiate Enumerations";
    };

    //枚举值继承自这个对象
    var proto = enumeration.prototype = {
        constructor: enumeration, //标识类型
        toString: function () {
            return this.name;
        }, //返回名字
        valueOf: function () {
            return this.value;
        }, //返回值
        toJson: function () {
            return this.name;
        } //转换为Json
    };

    enumeration.values = []; //用以存放枚举对象的数组

    //现在创建新类型的实例
    for (var name in namesToValues) { //遍历每个值
        var e = inherit(proto); //创建一个代表它的对象
        e.name = name; //给他一个名字
        e.value = namesToValues[name]; //给它一个值
        enumeration[name] = e; //将它设置为构造函数的属性
        enumeration.values.push(e); //将它存放到值数组中
    }

    //一个类方法， 用来对类的实例进行迭代
    enumeration.foreach = function (f, c) {
        for (var i = 0; i < this.values.length; i++) f.call(c, this.values[i]);
    }

    //返回标识这个新类型的构造函数
    return enumeration;
};

//inherit()返回一个继承自原型对象p的属性的新对象
function inherit(p) {
    if (p == null) throw TypeError(); //p是一个对象 但是不能为null
    if (Object.create) //如果Object.create()存在
        return Object.create(p); //直接使用Object.create()
    var t = typeof p; //否则进一步检测
    if (t !== "object" && t !== "function") throw TypeError();

    function f() {}; //定义一个空的构造函数
    f.prototype = p; //将其原型属性设置成p
    return new f(); //使用f()创建p的继承对象
}

// //使用4个值创建新的Coin类
// var Coin = enumeration({
//     Penny: 1,
//     Nickl: 5,
//     Dime: 10,
//     Quarter: 25
// });


// var c = Coin.Dime;  //这是新类的实例
// c instanceof Coin;  //true： instanceof正常工作
// c.constructor == Coin;  //true 构造函数的属性正常工作
// Coin.Quarter + 3*Coin.Nickl;    //40 将值转换为数字
// Coin.Dime == 10;    //true 更多转换为数字的例子
// Coin.Dime > Coin.Nickl; //true 关系运算正常工作
// String(Coin.Dime) + ":" + Coin.Dime;    //”Dime：10“ 强制转换为字符串


//定义一个玩牌的类
function Card(suit, rank){
    this.suit = suit;   //每张牌都有花色
    this.rank = rank;   //以及点数
};

//使用枚举类型定义花色和点数
Card.Suit = enumeration( { Club: 1, Diamonds: 2, Hearts: 3, Spades: 4});
Card.Rank = enumeration( { Two: 2, Three: 3, Four: 4, Five: 5, Six: 6,
                            Seven: 7, Eight: 8, Nine: 9, Ten: 10,
                            Jack: 11, Queen: 12, King: 13, Ace: 14});

//定义用来描述牌面的文本
Card.prototype.toString = function(){
    return this.rank.toString() + " of " + this.suit.toString();
};

//比较扑克拍中两张牌的大小
Card.prototype.compareTo = function(that){
    if(this.rank < that.rank) return -1;
    if(this.rank > that.rank) return 1;
    return 0;
};

//以扑克牌的玩法进行排序
Card.orderByRank = function(a, b){ return a.compareTo(b); };

//以桥牌的玩法规则进行排序函数
Card.orderBySuit = function(a, b){
    if(a.suit < b.suit) return -1;
    if(a.suit > b.suit) return 1;
    if(a.rank < b.rank) return -1;
    if(a.rank > b.rank) return 1;
    return 0;
};

//定义用以表示一副标准扑克牌的类
function Deck(){
    var cards = this.cards = [];    //一副牌就是由牌组成的数组
    Card.Suit.foreach(function(s) { //初始化数组
        Card.Rank.foreach(function(r) {
            cards.push(new Card(s, r));
        });
    });
};

//洗牌的方法： 重新洗牌并返回洗好的牌
Deck.prototype.shuffle = function() {
    //遍历数组中的每一个元素，随机找出牌面最小的元素， 并与之（当前遍历元素）交换
    var deck = this.cards, len = deck.length;
    for(var i = len -1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1)), temp;  //随机数
        temp = deck[i], deck[i] = deck[r], deck[r] = temp;  //交换
    }
    return this;
};

//发牌的方法：返回牌的数组
Deck.prototype.deal = function(n){
    if(this.cards.length < n) throw "Out of cards.";
    return this.cards.splice(this.cards.length -n, n);
};

var deck = (new Deck()).shuffle();
var hand = deck.deal(13).sort(Card.orderBySuit);
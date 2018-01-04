/**
 * Created Date: Wednesday December 27th 2017
 * Author: Terry Xu
 * -----
 * Last Modified:
 * Modified By:
 */
function Set(){         //这是一个构造函数
    this.values = {};   //集合数据保存在对象的属性里
    this.n = 0;         //集合中值的个数
    this.add.apply(this, arguments);    //把所有参数都添加进这个集合
};


//将每个参数都添加至集合中
Set.prototype.add = function(){
    for(var i = 0; i < arguments.length; i++){  //遍历每个参数
        var val = arguments[i];     //待添加到集合中的值
        var str = Set._v2s(val);    //把它转化为字符串
        if(!this.values.hasOwnProperty(str)){   //如果不在集合中
            this.values[str] = val;             //将字符串和值对应起来
            this.n++;                           //集合中值得计数加一
        }
    }
    return this;                                //支持链式方法调用
};

//从集合删除元素，这些元素由参数指定
Set.prototype.remove = function(){
    for(var i = 0; i < arguments.length; i++){
        var str = Set._v2s(arguments[i]);
        if(this.values.hasOwnProperty(str)){
            delete this.values[str];
            this.n--;
        }
    }
    return this;
};

//如果这个集合包含这个值， 则返回true， 否则返回false
Set.prototype.contains = function(value){
    return this.values.hasOwnProperty(Set._v2s(value));
};

//返回集合得大小
Set.prototype.size = function(){
    return this.n;
};

//遍历集合中得所有元素， 在指定得上下文中调用f
Set.prototype.foreach = function(f, context){
    for(var s in this.values)               //遍历集合中所有字符串
        if(this.values.hasOwnProperty(s))   //忽略继承得属性
        f.call(context, this.values[s]);    //调入f，传入value
}

//这是一个内部函数，用来将任意得JavaScript值和唯一得字符串对应起来
Set._v2s = function(val){
    switch(val){
        case undefined : return 'u';    //特殊值得原始值
        case null : return 'n';         //值只有一个字母
        case true : return 't';
        case false : return 'f';
        default : switch(typeof val){
            case 'number' : return '#' + val;   //数字都带有#前缀
            case 'string' : return '"' + val;   //字符串都带有“前缀
            default : return '@' + objectId(val);   //Objs and funcs get
        }
    }

    //对任意对象来说，都会返回一个字符串
    //针对不同得对象，这个函数会返回不同得字符串
    //对于同一个对象的多次调用， 总是返回相同的字符串
    //为了做到这一点，他给o创建了一个属性， 在ES5中，这个属性是不可枚举且是只读的

    function objectId(o){
        var prop = "|**objectid**|"; //私有属性，用来存放id
        if(!o.hasOwnProperty(prop))     //如果对象没有id
            o[prop] = Set._v2s.next++;  //将下一个值赋给它
        return o[prop];                 //返回这个id
    }

};

function extend(o,p){
    for(prop in p){
        o[prop] = p[prop];    //将属性添加至o中
    }
    return o;
}


extend(Set.prototype, {
    toString: function(){
        var s = "{",
        i = 0;
        this.foreach(function(v){ s += ((i++>0) ? "," : "") + v; });
        return s + "}";
    },
    toLocalSTring: function(){
        var s = "{", i = 0;
        this.foreach(function(v){
            if(i++>0) s += ", ";
            if(v == null) s += v;
            else s += v.toLocalSTring();
        });
        return s + "}";
    },
    toArry: function(){
        var a = [];
        this.foreach(function(v){
            a.push(v);
        });
    }
});

set.prototype.toJson = set.prototype.toArry;

Set._v2s.next = 100; //设置初始id的值

//构造函数实例化
var s = new Set(1,2,3);
console.log(s);
s.add(57);
console.log(s);
s.remove(2);
console.log(s);


console.log(s.contains(3));

console.log(s.size());





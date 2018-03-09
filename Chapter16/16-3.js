//将e转化为相对定位的元素，使之左右“震动”
//第一个参数可以是圆度对象或者元素的id
//如果第二个参数是函数，以e为参数，将在动画结束时调用
//第四个参数指定震动多久，默认500毫秒
function shake(e, oncomplete, distance, time) {
    //句柄参数
    if (typeof e === "string") e = document.getElementById(e);
    if (!time) time = 500;
    if (!distance) distance = 5;

    var originalStyle = e.style.cssText; //保存e的原始style
    e.style.position = "relative"; //使e相对定位
    var start = (new Date()).getTime(); //注意，动画的开始时间
    animate(); //动画开始
    //函数检查消耗时间，并更新e的位置
    //如果动画完成，它将e还原为原始状态
    //否则，更新e的位置，安排它自身从新运行
    function animate() {
        var now = (new Date()).getTime(); //得到当前时间
        var elapsed = now - start; //从开始以来消耗了多长时间
        //是总时间的几分之几
        var fraction = elapsed / time;
        if (fraction < 1) { //如果动画未完成
            //作为动画完成的比例函数，计算e的x位置
            //使用正弦函数将完成的比例乘以4pi
            //所以，它来回往复两次
            var x = distance * Math.sin(fraction * 4 * Math.PI);
            e.style.left = x + "px";
            //在25毫秒之后或在总时间最后尝试再次运行函数
            //目的是为了产生每秒40帧的动画
            setTimeout(animate, Math.min(25, time - elapsed));
        } else { //否则动画完成
            e.style.cssText = originalStyle //恢复原始样式
            if (oncomplete) oncomplete(e); //调用完成后回调函数
        }
    }
}
//以毫秒级时间将e从完全不透明到透明
//在调用函数时假设e是完全不透明的
//oncomplate是一个可选函数，以e为参数，在动画结束调用
//如果不指定time.默认500
//本函数ie中不能正常构造
//除了opacity，ie使用非标准的filter属性
function fadeOut(e, oncomplete, time) {
    if (typeof e === "string") e = document.getElementById(e);
    if (!time) time = 500;

    //使用Math.sqrt作为一个简单的缓动函数来创建动画
    //精巧的非线性：一开始淡的比较快，然后慢一些
    var ease = Math.sqrt;

    var start = (new Date()).getTime(); //注意动画开始的实际
    animate(); //动画开始

    function animate() {
        var elapsed = (new Date()).getTime() - start; //消耗时间
        //总时间的几分之几
        var fraction = elapsed / time;
        if (fraction < 1) { //动画未完成
            var opacity = 1 - ease(fraction); //计算元素不透明
            e.style.opacity = String(opacity); //设置在e上
            setTimeout(animate, Math.min(25, time - elapsed));
        } else {
            e.style.opacity = "0";
            if (oncomplete) oncomplete(e); //调用完成后回调函数
        }
    }
}
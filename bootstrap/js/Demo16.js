$(function () {
    var acc = document.getElementsByClassName("panel-heading");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {
            //this.classList.toggle("active");
            this.firstChild.nextElementSibling.firstElementChild.classList.toggle("active");
            //$(".title").toggleClass("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    }

    

    $('.register').on('click',function(){
        window.location.href ='D:/GitProject/JavaScript/Demo13.html';
    });
})
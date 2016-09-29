window.onload=function () {
    var container=document.getElementById('container');
    var images=document.getElementById('images');
    var buttons=document.getElementById('buttons');
    var button=document.getElementById('buttons').getElementsByTagName('span');
    var prev=document.getElementById('prev');
    var next=document.getElementById('next');
    var len=3;
    var index=1;
    var canMove=true;//在图片切换完成后才可再切换
    var timer;

    function carousel(width) {
        var left = parseInt(images.style.left) + width;
        var time = 1000;//移动的总时间
        var interval = 10;//移动间隔时间
        var speed = width /( time / interval);
        canMove=false;
        function move() {
            if ((speed < 0 &&parseInt(images.style.left) > left) || (speed > 0 && parseInt(images.style.left) < left)) {
                images.style.left = parseInt(images.style.left) + speed+'px';
                setTimeout(move, interval);
            } else {
                images.style.left = left + 'px';
                if (left > -600) {
                    images.style.left = -1800 + 'px';
                }
                if (left < -600 * len) {
                    images.style.left = -600 + 'px';
                }
                canMove=true;
            }
        }
        move();
    }
    next.onclick=function () {
     if(!canMove) {
     return
     }
         if(index==3){
         index=1;
     }else{
         index+=1;

     }
         changeButton();
         carousel(-600);

 }
    prev.onclick=function () {
     if(!canMove) {
        return;
     }
         if (index == 1) {
         index = 3;
     } else {
         index -= 1;
     }
         changeButton();
         carousel(600);
 }

    function changeButton() {
        for (var i = 0; i < button.length; i++) {
            if (button[i].className == 'on') {
                button[i].className = '';
                break;
            }
        }
        button[index - 1].className = "on";
    }

    buttons.onclick=function (event) {
    event=event||window.event;
    var target=event.target||event.srcElement;
    var myIndex=parseInt(target.getAttribute('index'));
    var offset=-600*(myIndex-index);
    index=myIndex;
    carousel(offset);
    changeButton();

}
    function animate() {//自动播放
        timer=setInterval(function () {
            next.onclick();
        },2000);
}
    function stop() {
        clearInterval(timer);
    }
    container.onmouseover=stop;
    container.onmouseout=animate;
    animate();
}


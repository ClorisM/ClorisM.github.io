// JavaScript Document
var width=document.documentElement.clientWidth;
var height=300;
var RADIUS=8;

var mar_top=60;
var mar_left=30;
var currentT=0;
window.onload=function(){
    currentT=getT();
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext('2d');
    canvas.width=width;
    canvas.height=height;
    setInterval(function(){
        render(context);
        update(context);
    },50);
}

//绘制函数
function render(context){
    var currentT=getT();
    var currenth=parseInt(currentT/3600);
    var currentm=parseInt(currentT/60%60);
    var currents=parseInt(currentT%60);
    context.clearRect(0,0,canvas.width,canvas.height);
    paint(mar_left,mar_top,parseInt(currenth/10),context);
    paint(mar_left+15*(RADIUS+1),mar_top,parseInt(currenth%10),context);
    paint(mar_left+30*(RADIUS+1),mar_top,10,context);
    paint(mar_left+39*(RADIUS+1),mar_top,parseInt(currentm/10),context);
    paint(mar_left+54*(RADIUS+1),mar_top,parseInt(currentm%10),context);
    paint(mar_left+69*(RADIUS+1),mar_top,10,context);
    paint(mar_left+78*(RADIUS+1),mar_top,parseInt(currents/10),context);
    paint(mar_left+93*(RADIUS+1),mar_top,parseInt(currents%10),context);
    //绘制彩色小球
    for(var i=0;i<ball.length;i++){
        context.fillStyle=ball[i].color;
        context.beginPath();
        context.arc(ball[i].x,ball[i].y,RADIUS,0,2*Math.PI,true);
        context.closePath();
        context.fill();
    }

}

//绘制数字函数
function paint(x,y,num,context){
    context.fillStyle="rgb(0,102,153)";
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                context.beginPath();
                context.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                context.closePath();
                context.fill();
            }
        }
    }
}

function update(context){

    var currenth=parseInt(currentT/3600);
    var currentm=parseInt(currentT/60%60);
    var currents=parseInt(currentT%60);
    var nextT=getT();
    var nexth=parseInt(nextT/3600);
    var nextm=parseInt(nextT/60%60);
    var nexts=parseInt(nextT%60);
    if(currents!=nexts){
        if(parseInt(currenth/10)!=parseInt(nexth/10)){
            addBall(mar_left,mar_top,parseInt(nexth/10));
        }
        if(parseInt(currenth%10)!=parseInt(nexth%10)){
            console.log(parseInt(currenth%10)!=parseInt(nexth%10));
            addBall(mar_left+15*(RADIUS+1),mar_top,parseInt(nexth%10));

        }
        if(parseInt(currentm/10)!=parseInt(nextm/10)){
            addBall(mar_left+39*(RADIUS+1),mar_top,parseInt(nextm/10));
        }
        if(parseInt(currentm%10)!=parseInt(nextm%10)){
            addBall(mar_left+54*(RADIUS+1),mar_top,parseInt(nextm%10));
        }
        if(parseInt(currents/10)!=parseInt(nexts/10)){
            addBall(mar_left+78*(RADIUS+1),mar_top,parseInt(nexts/10));

        }
        if(parseInt(currents%10)!=parseInt(nexts%10)){
            addBall(mar_left+93*(RADIUS+1),mar_top,parseInt(nexts%10));

        }
        currentT=nextT;
        var canvas=context.canvas;
        render(context);
    }
    change();
}
//获取时间
function getT(){
    var today=new Date();
    var t=today.getHours()*3600+today.getMinutes()*60+today.getSeconds();
    return t;
}

//把获取的小球加入数组
function addBall(x,y,num){

    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++)
            if(digit[num][i][j]==1){
                var aBall={
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    g:1.5+Math.random(),
                    color:color[Math.floor(Math.random()*color.length)]
                }
                ball.push(aBall);
            }

}
//改变球的速度等
function change(){
    for(var i=0;i<ball.length;i++){
        ball[i].x+=ball[i].vx;
        ball[i].y+=ball[i].vy;
        ball[i].vy+=ball[i].g;
        //判断是否触碰到下面板
        if(ball[i].y>height-RADIUS){
            ball[i].vy=-ball[i].vy*0.75;
        }
    }
    //清除超出屏幕的小球
    var count=0;
    for( var i = 0 ; i < ball.length ; i ++ )
        if( ball[i].x + RADIUS>0&&ball[i].x -RADIUS<width )
            ball[count++]=ball[i]
    while(ball.length>count){
        ball.pop();
    }


}
//绘制彩色小球



var ball=[];
const color=["#FFB7DD","#FFCCCC","#FFC8B4","#FFEE99","#CCFF33","#FF3333","#FF5511","#B9B973","#1AFD9C","#844200"];
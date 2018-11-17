//定义获取元素的函数
function q(css){
return document.querySelector(css);
}
function qa(css){
	return document.querySelectorAll(css);
}
//获取元素
var wrap=q(".wrap");
var myScr=q(".screen");
var nextBtn=q(".nextBtn");
var imgFas=qa(".imgFa");
var lastBtn=q(".lastBtn");
var spans=qa(".smallBtn span");

var autoTimer=null;
var timer=null;
//var speed=10;
var index=0;
//图片高度赋值
myScr.style.height=imgFas[0].offsetHeight+"px";

nextBtn.onclick=function(){
	nextRoll();
}
lastBtn.onclick=function(){
	lastRoll();
}
wrap.onmousemove=function(){
	clearInterval(autoTimer);
}
wrap.onmouseout=function(){
	autoRoll();
}

autoRoll();

//点击取消事件
function stop(){
	nextBtn.onclick=false;
	lastBtn.onclick=false;
	for (var i=0;i<spans.length;i++) {
		spans[i].onclick=false;
	}
}

//点击事件重新启动
function start(){
	nextBtn.onclick=function(){
		nextRoll();
	}
	lastBtn.onclick=function(){
		lastRoll();
	}
	for (var i=0;i<spans.length;i++) {
		spans[i].onclick=function(){
			smallBtn(this);
		}
	}
}

//遍历大层，赋值大层的位置
for (var k=0;k<imgFas.length;k++) {
	imgFas[k].style.left=k*imgFas[k].offsetWidth+"px";
	imgFas[k].nextChangePoint=-5*myScr.offsetWidth;
	imgFas[k].nextChangeEnd=myScr.offsetWidth;
	imgFas[k].lastChangePoint=imgFas[k].offsetWidth;
	imgFas[k].lastChangeEnd=-imgFas[k].offsetWidth;
//		console.log(imgFas[k].style.left);
}

//向下一页滚动
function nextRoll(){
	stop();
	
	var t=0;
	var d=100;
	var b=index*myScr.offsetWidth;
	index++;
	if(index==3){
		index=0;
	}
	var endpos=index*myScr.offsetWidth;
	var c=endpos-b;
	clearInterval(timer);
	timer=setInterval(function(){
		for (var i=0;i<imgFas.length;i++) {
			if(t==d){
				clearInterval(timer);
				if(imgFas[i].offsetLeft==imgFas[i].nextChangePoint){
					imgFas[i].style.left=imgFas[i].nextChangeEnd+"px";
				}
				start();
			}else{
				imgFas[i].style.left=Tween.Quad.easeOut(t,b,c,d)+"px";
				t++;
			}
		}
	},1);
	changeColor(spans[index]);
	
}
//上一页函数
function lastRoll(){
	stop();
	speed=10;
	index--;
	if(index==-1){
		index=2;
	}
	for(var i=0;i<imgFas.length;i++){
		imgFas[i].endpos=imgFas[i].offsetLeft+myScr.offsetWidth;
	}
	clearInterval(timer);
	timer=setInterval(function(){
		for(var i=0;i<imgFas.length;i++){
			if(imgFas[i].offsetLeft==imgFas[i].endpos){
				clearInterval(timer);
				if(imgFas[i].offsetLeft==imgFas[i].lastChangePoint){
					imgFas[i].style.left=imgFas[i].lastChangeEnd+"px";
				}
				start();
			}else{
				imgFas[i].style.left=imgFas[i].offsetLeft+speed+"px";
			}
		}
	},1);
	changeColor(spans[index]);
}

//自动滚动
function autoRoll(){
	clearInterval(autoTimer);
	autoTimer=setInterval(function(){
		nextRoll();
	},1000);
}

//颜色改变
function changeColor(who){
	for (var j=0;j<spans.length;j++) {
		spans[j].style.backgroundColor="#ccc";
	}
	who.style.backgroundColor="red";
}
//小按钮
for (var l=0;l<spans.length;l++) {
	spans[l].index=l;
	spans[l].onclick=function(){
		smallBtn(this);
	}
}

//小按钮函数
function smallBtn(who){
	stop();
	changeColor(who);
	if(index<who.index){
		speed=-10;
	}else if(index>who.index){
		speed=10;
	}
	for(var j=0;j<imgFas.length;j++){
		imgFas[j].endpos=imgFas[j].offsetLeft+(index-who.index)*myScr.offsetWidth;
	}
	index=who.index;
	clearInterval(timer);
	timer=setInterval(function(){
		for(var m=0;m<imgFas.length;m++){
			if(imgFas[m].offsetLeft==imgFas[m].endpos){
				clearInterval(timer);
				if(imgFas[m].offsetLeft==imgFas[m].nextChangePoint){
					imgFas[m].style.left=imgFas[m].nextChangeEnd+"px";
				}
				if(imgFas[m].offsetLeft==imgFas[m].lastChangePoint){
					imgFas[m].style.left=imgFas[m].lastChangeEnd+"px";
				}
				start();
			}else{
				imgFas[m].style.left=imgFas[m].offsetLeft+speed+"px";
			}
		}
	},1);
}




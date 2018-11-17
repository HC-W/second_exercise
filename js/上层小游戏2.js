//获取单个元素的函数
function q(css){
	return document.querySelector(css);
}
//获取数组元素的函数
function qa(css){
	return document.querySelectorAll(css);
}
//获取非行间元素函数
function getCss(who,css){
	return parseFloat(getComputedStyle(who)[css]);
}
//个数遍历，添加函数
function interDx(numer,endpos){
	//大块
	var newDivD=document.createElement("div");
	//对个数进行遍历，向大块中添加小块
	for (var i=0;i<num;i++) {
		//创建小块
		var newDivX=document.createElement("div");
		//把小块添加到对应父级的大块里面
		newDivX.innerHTML=i;
		newDivD.appendChild(newDivX);
	}
	//把大块装进ceng
	ceng.appendChild(newDivD);
	//设置大块的各个属性
	newDivD.style.bottom=index*newDivX.offsetHeight+"px";
	newDivD.style.width=num*newDivX.offsetWidth+"px";
	newDivD.style.left=endpos+"px";
	
//	console.log(newDivX.offsetHeight);
}
//移动函数封装
//传参数
function move(who){
	//清除定时器
	clearInterval(timer);
	timer=setInterval(function(){
		//判断层的左边距，对速度和方向进行定值
		if(who.offsetLeft>=ceng.offsetWidth-who.offsetWidth){
			speed=-who.firstElementChild.offsetWidth;
		}else if(who.offsetLeft==0){
			speed=who.firstElementChild.offsetWidth;
		}
		who.style.left=who.offsetLeft+speed+"px";
	},100);
}
//获取元素
var wrap=q(".wrap");
var score=q(".score");
var ceng=q(".ceng");
var div1=q(".div1");
//定义里面小块的初始个数
var num=20;
//定时器
var timer=null;
//层数
var index=0;
//运行速度
var speed;
var lastofh = 0;
var lastlastofh = 0;
var count=0;
//调用函数，先给第一层的大层填充小块
interDx(num,0);
//让第一层开始运行
move(ceng.lastElementChild);

//点击事件
wrap.onclick=function(){
	clearInterval(timer);
	index++;
	score.innerHTML=index;
	if(index>1){
		lastofh=ceng.lastElementChild.offsetLeft;
		lastlastofh=ceng.lastElementChild.previousElementSibling.offsetLeft;
		var cha=lastofh-lastlastofh ;
		count= Math.abs(cha/ ceng.lastElementChild.firstElementChild.offsetWidth);
		if(num<=count){
			alert("game over!");
			clearInterval(timer);
			score.innerHTML=index;
			return false;
		}
	}
	remove(count);
	num -= count;
	interDx(num,ceng.lastElementChild.offsetLeft);
	move(ceng.lastElementChild);
}

//移出
function remove(ct){
	for (var i=0;i<ct;i++) {
		ceng.lastElementChild.removeChild(ceng.lastElementChild.firstElementChild);
	}
}

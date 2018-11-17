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
//个数遍历，添加小块函数
function interDx(dd){
	//对个数进行遍历，向大块中添加小块
	for (var i=0;i<num;i++) {
		//创建小块
		newDivX=document.createElement("div");
		//把小块添加到对应父级的大块里面
		newDivX.innerHTML=i;
		dd.appendChild(newDivX);
	}
}
//移动函数封装
//传参数
function move(dv){
	//清除定时器
	clearInterval(timer);
	timer=setInterval(function(){
		//判断层的左边距，对速度和方向进行定值
		if(dv.offsetLeft>=ceng.offsetWidth-dv.offsetWidth){
			speed=-newDwX;
		}else if(dv.offsetLeft==0){
			speed=newDwX;
		}
		dv.style.left=dv.offsetLeft+speed+"px";
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
//向里面填充的小块
var newDivX;
//运行速度
var speed;
//调用函数，先给第一层的大层填充小块
interDx(div1);
//小块的宽度
var newDwX=newDivX.offsetWidth;
//小块的高度
var newDhX=newDivX.offsetHeight;
//第一层的宽度
div1.style.width=num*newDwX+"px";
//让第一层开始运行
move(div1);
//层数
var index=1;
//点击事件
wrap.onclick=function(){
	clearInterval(timer);
	//获取ceng的最后一个元素子节点
	lastE=ceng.lastElementChild;
	if(index<2){
		setDivD();
	}else if(index>=2){
		bbb();
	}
	index++;
	var cc=parseInt(ceng.clientHeight/ newDhX);
	if(index==cc){
//		console.log(index,cc);
		ceng.style.height=ceng.clientHeight+newDhX+"px";
	}
}
var newDivD;
//添加大块函数
function setDivD(){
	newDivD=document.createElement("div");
	//把大块装到层里面
	ceng.appendChild(newDivD);
	newDivD.style.left=lastE.offsetLeft+"px";
	console.log(newDivD.offsetLeft);
	newDivD.style.bottom=getCss(lastE,"bottom")+newDhX+"px";
	interDx(newDivD);
	newDivD.style.width=(num)*newDwX+"px";
	move(newDivD);
	score.innerHTML =index;
}
var a;
//小块掉落判断
function bbb(){
	var last=lastE.previousElementSibling;
	a=last.offsetLeft-lastE.offsetLeft;
	console.log(a);
	if(a>0){
		b =Math.floor(a/ newDwX);
//		bv();
	}else if(a<0){
		var c=Math.abs(a)+lastE.offsetWidth-last.offsetWidth;
		if(c>0){
			b= parseInt(c/newDwX);
		}else{
			b=0;
		}
	}else if(a==0){
		b=0;
	}
	var b=Math.abs(a / newDwX);
//	removea(b);
	num -=b;
	if(num<=0 || num<b){
		clearInterval(timer);
		wrap.onclick=false;
		score.innerHTML =index-1;
		alert("over");
	}else{
		setDivD();
	}
}

function removea(b){
	for(var i=0;i<b;i++){
		newDivD.removeChild(newDivD.lastElementChild);
	}
	if(a<0){
		newDivD.style.left=newDivD.previousElementSibling.offsetLeft+b*newDwX+"px";
	}
	else if(a>0){
		newDivD.style.left=newDivD.previousElementSibling.offsetLeft-b*newDwX+"px";
	}
}

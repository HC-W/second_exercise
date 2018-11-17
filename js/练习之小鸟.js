//获取元素
var wrap=q(".wrap");
var one=q(".one");
var two=q(".two");
var btn=q(".btn");
var gless=q(".gless");
var imgs=qa(".imgFa img");

var zhu_top=qa(".two .zhu_top");
var zhus=qa(".two .zhu");
//var img4=q(".img4");
var timer=null;
var speed=-1;
var timer2=null;
//遍历
for (var i=0;i<imgs.length;i++) {
	imgs[i].style.left=i*gless.offsetWidth+"px";
}
for (var i=0;i<imgs.length;i++) {
	imgs[i].timer=null;
}

roll(imgs,gless);
var gless_top=gless.offsetTop;
//console.log(gless_top);
//点击开始
btn.addEventListener("touchstart",function(){
	one.style.display="none";
	two.style.display="block";
	
	two.style.height=gless_top+"px";
//	console.log(img4.offsetWidth);
	roll2();
});


function changeHeight(who){
	var a=rand(100,300);
	who.style.height=a+"px";
	who.nextElementSibling.style.height=two.offsetHeight-a-100+"px";
}
		



//无间断函数
function roll(who,end){
	clearInterval(who.timer);
	who.timer=setInterval(function(){
		for (var i=0;i<who.length;i++) {
			who[i].style.left=who[i].offsetLeft+speed+"px";
			if(who[i].offsetLeft==-end.offsetWidth){
				who[i].style.left=end.offsetWidth+"px";
			}
		}
	},30);
}

function roll2(){
	clearInterval(timer);
	timer=setInterval(function(){
		var newDiv=createCss("div");
		setAtt(newDiv,"class","zhu");
		newDiv.style.left=300+"px";
		var newtop=createCss("div");
		setAtt(newtop,"class","zhu_top");
		var newbottom=createCss("div");
		setAtt(newbottom,"class","zhu_bottom");
		var newImgTop=createCss("img");
		setAtt(newImgTop,"src","../../img/img/up_pipe.png");
		append(newtop,newImgTop);
		var newImgBottom=createCss("img");
		setAtt(newImgBottom,"src","../../img/img/down_pipe.png");
		append(newbottom,newImgBottom);
		append(newDiv,newtop);
		append(newDiv,newbottom);
		append(two,newDiv);
		
		changeHeight(newtop);
		newDiv.timer=null;
		roll3(newDiv);
	},2500);
}

function roll3(who){
//	clearInterval(timer2);
	who.timer=setInterval(function(){
		who.style.left=who.offsetLeft+speed+"px";
		if(who.offsetLeft==-(3*who.offsetWidth)){
//			console.log(who.offsetLeft);
			who.remove();
		}
	},10);
}

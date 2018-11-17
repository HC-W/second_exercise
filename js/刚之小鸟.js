window.onload = function(){
	var wrap = document.querySelector(".wrap");
	var bgi = document.querySelectorAll(".bgi");
	var cds = document.querySelectorAll(".cd");
	var niao = document.querySelector(".bird");
	var scoreEle = document.querySelector(".score");
	//计算鸟拍翅膀的图片切换
	var index = 0;
	//背景移动速度
	var bgSpeed = 1;
	//上下飞的速度
	var fSpeed = 1;
	//管道中间的间隔空隙大小（px）
	var GDjiange = 100;
	//生成管道定时器
	var createGdTimer = null;
	//生成管道的间隔时间
	var createGdjiange = 3000;
	//向上飞高度
	var upFlyH = 35;
	//向上飞间隔时间
	var upFlySpeed = 5;
	//向下飞间隔时间
	var downFLySpeed = 6;
	var gameScore = 0;
	
	//给背景图片设置left
	for(var i = 0; i < bgi.length; i++){
		bgi[i].style.left = i * bgi[i].offsetWidth + "px";
		cds[i].style.left = i * cds[i].offsetWidth + "px";
	}
	
	//背景移动
	for(var i = 0; i < bgi.length; i++){
		//背景移动
		movemove(bgi[i],-bgSpeed,10,-bgi[i].offsetWidth,function(who){
			who.style.left = who.offsetLeft + bgi.length * who.offsetWidth + "px";
		});
		//草地移动
		movemove(cds[i],-bgSpeed,10,-cds[i].offsetWidth,function(who){
			who.style.left = who.offsetLeft + cds.length * who.offsetWidth + "px";
		});
	}
	
	//创建管道
	createGdTimer = setInterval(function(){
		//生成
		createGD(document.documentElement.clientWidth,GDjiange);
	},createGdjiange);
	

	//向后移动移动
	function movemove (who,speed,jg,endPos,fn,fn2){
		
		clearInterval(who.timer);
		who.timer = setInterval(function(){
				if(who.offsetLeft <= endPos){
					if(fn){
						fn(who);
					}
				}
				//用于判断碰撞的！背景移动用不上
				if(fn2){
					fn2(who);
				}
				who.style.left = who.offsetLeft + speed + "px";
		},jg);
	}
	
	//拍翅膀
	changeCB("down_bird");
	//向下飞
	moveUD("down_bird",downFLySpeed,null,fSpeed);
	//点击屏幕（touch事件）向上飞
	document.addEventListener("touchstart",moveU,false);
	
	//向上飞
	function moveU(){
		//向上飞的终点位置=点击时的top值-向上飞的高度
		var endPos = niao.offsetTop-upFlyH;
		//点一次后超出上沿的情况
		if(endPos < 0){
			//终点位置为0
			endPos = 0;
		}
		//向上飞
		moveUD("up_bird",upFlySpeed,endPos,-fSpeed,function(){
			//向上飞到达终点后，继续向下飞
			moveUD("down_bird",downFLySpeed,null,fSpeed);
		});
	}
	
	//拍翅膀
	function changeCB(state){
		clearInterval(niao.timer);
		niao.timer = setInterval(function(){
			index++;
			//设置拍翅膀图片切换
			niao.setAttribute("src","img/"+state+index%2+".png");
		},1);
	}
	//上下移动
	function moveUD(fx,jgTime,endPos,speed,fn){
		//鸟的方向
		changeCB(fx);
		clearInterval(niao.moveTimer);
		niao.moveTimer = setInterval(function(){
			//鸟向上飞到达终点
			if(niao.offsetTop == endPos){
				clearInterval(niao.moveTimer);
				//回调
				if(fn){
					fn();
				}
			}else{
				//确定移动的位置
				var newEndPos = niao.offsetTop + speed;
				//确定边界
				if(newEndPos < 0){
					newEndPos = 0;
				}else if(newEndPos > 0.88*document.documentElement.clientHeight-niao.offsetHeight){
					newEndPos = 0.88*document.documentElement.clientHeight-niao.offsetHeight;	
				}
				//移动
				niao.style.top = newEndPos + "px";
			}
		},jgTime);
	}
	//生成管道
	function createGD(createPos,jiange){
		//随机上管道高度
		var randHeight = rand(80,400);
		//生成管道父级
		var newGD = document.createElement("div");	
		//设置class
		newGD.setAttribute("class","gd");
		//生成上管道
		var newGDU = document.createElement("div");
		//设置class
		newGDU.setAttribute("class","gdu");
		//设置随机高度
		newGDU.style.height = randHeight + "px";
		//设置管道口图片
		var imgU = document.createElement("img");
		//设置路径src
		imgU.setAttribute("src","img/up_pipe.png");
		//在上管道的最下面显示，所以bottom为0
		imgU.style.bottom = 0;
		//把管道口img放进上管道div
		newGDU.appendChild(imgU);
		//生成下管道
		var newGDD = document.createElement("div");
		//设置class
		newGDD.setAttribute("class","gdd");
		//通过上管道的高度，设置下管道的高度
		//屏幕高度-上管道高度-中间间隔 = 下管道高度
		newGDD.style.height = document.documentElement.clientHeight - randHeight - jiange + "px"; 
		//设置下管道的管道口图片
		var imgD = document.createElement("img");
		//设置路径src
		imgD.setAttribute("src","img/down_pipe.png");
		//在管道的最上面
		imgD.style.top = 0;
		//把管道口放进下管道
		newGDD.appendChild(imgD);
		//把上下管道放进大div
		newGD.appendChild(newGDU);
		newGD.appendChild(newGDD);
		//设置大管道的left（每次生成的位置）
		newGD.style.left = createPos + "px";
		//一个管道加一次分
		newGD.isAddScore = true;
		//把管道放进页面
		wrap.appendChild(newGD);
		//管道移动
		movemove(newGD,-1,10,-newGD.offsetWidth,function(who){
			//移出屏幕就删掉
			who.remove();
		},function(who){
			//移动过程中，判断碰撞
			//确定值
			//鸟left
			var birdL = niao.offsetLeft;
			//鸟宽度
			var birdW = niao.offsetWidth;
			//鸟top
			var birdT = niao.offsetTop;
			//鸟高度
			var birdH = niao.offsetHeight;
			//管道left
			var gdL = who.offsetLeft;
			//管道高度
			var gdH = who.offsetHeight;
			//管道宽度
			var gdW = who.offsetWidth;
			//上管道高度
			var gdH1 = who.firstElementChild.offsetHeight;
			//下管道高度
			var gdH2 = who.lastElementChild.offsetHeight;
			//确定碰撞条件
			//鸟left+鸟宽>管道left（开始接触）
			var tiaojian1 = birdL + birdW > gdL;
			//上管道高度>鸟top（撞到上管道）
			var tiaojian2 = gdH1 > birdT;
			//总高度-下管道高度 < 鸟top+鸟高度（撞上下管道）
			var tiaojian3 = gdH - gdH2  < birdT + birdH;
			//管道宽度+管道left > 鸟的left（还没有通过管道）
			var tiaojian4 = gdL + gdW > birdL;
			//如果条件满足，则发生碰撞，游戏结束
			if(tiaojian1 && (tiaojian2 || tiaojian3) && tiaojian4){
				//游戏结束
				gameover();
			}else if(gdL + gdW < birdL){//否则，当通过了管道后。加分
				//为了防止通过管道后无限加分
				if(who.isAddScore){
					//游戏分数
					gameScore++;
					//只让if进来一次（分数只加一次）
					who.isAddScore = false;
					//把分数放到标签里显示出来
					scoreEle.innerHTML = gameScore;
				}
			}
		})
	}
	
	//游戏结束
	function gameover(){
		//重新获取管道
		var gds = document.querySelectorAll(".gd");
		//清除管道定时器
		for(var i in gds){
			clearInterval(gds[i].timer);
		}
		//清除背景定时器
		for(var i in bgi){
			clearInterval(bgi[i].timer);
		}
		//清除草地定时器
		for(var i in cds){
			clearInterval(cds[i].timer);
		}
		//清除创建管道定时器
		clearInterval(createGdTimer);
		//清除鸟拍翅膀定时器
		clearInterval(niao.timer);
		//清除鸟移动定时器
		clearInterval(niao.moveTimer);
		//输出游戏结束和得分
		console.log("gameover,"+gameScore);
		//移除touch事件监听
		document.removeEventListener("touchstart",moveU,false);
	}
	
	
	//随机
	function rand(min,max){
		//返回随机数结果
		return Math.floor(Math.random()*(max+1-min)+min);
	}
	
	
}

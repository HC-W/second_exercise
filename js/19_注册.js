//获取元素
var user=q("#user");
var p1=q("#p1");
var psd1=q("#password1");
var p2=q("#p2");
var psd2=q("#password2");
var p3=q("#p3");
var yzm=q("#yzm");
var p4=q("#p4");
var ckb=q("#b");
var sub=q("#submit");

//空白占位符
var res=/\s/;
//所有数字、字母、下划线
var rew=/\w/ig;
//所有中文
var reu=/[\u4e00-\u9fa5]/;
//第一位为英文
var ree=/^[a-zA-Z]/ig;

var tj1;
var tj2;
var tj3;
var tj4;

user.onfocus=function(){
	p1.innerHTML="6~18个字符，可使用字母、数字、下划线，需以字母开头";
	p1.style.color="";
}

user.onblur=function(){
	var userStr=user.value;
	//判断条件：
	if(userStr.match(/^[a-zA-Z][a-zA-Z_]{5,17}$/ig) || userStr.match(/^[a-zA-Z][a-zA-Z0-9]{5,17}$/ig) || userStr.match(/^[a-zA-Z]\w{5,17}$/ig)){
		p1.innerHTML="恭喜您可以注册！";
		p1.style.color="";
		tj1=true;
	}else{
		p1.innerHTML="请正确输入！";
		p1.style.color="red";
	}
}

psd1.onfocus=function(){
	p2.innerHTML="6~16个字符，区分大小写";
	p2.style.color="";
}
psd1.onblur=function(){
	var psd1Str=psd1.value;
	if(psd1Str.match(/^\w{6,16}$/g)){
		p2.innerHTML="恭喜您可以注册！";
		p2.style.color="";
		tj2=true;
	}else{
		p2.innerHTML="输入格式错误！";
		p2.style.color="red";
	}
}

psd2.onfocus=function(){
	p3.innerHTML="请再次输入密码";
	p3.style.color="";
}
psd2.onblur=function(){
	var psd2Str=psd2.value;
	if(psd1.value && psd2Str){
		if(psd2Str===psd1.value){
			p3.innerHTML="恭喜您可以注册！";
			p3.style.color="";
			tj3=true;
		}else{
			p3.innerHTML="密码不一致！";
			p3.style.color="red";
		}
	}else{
		p3.innerHTML="请填写完整！";
		p3.style.color="red";
	}
}

yzm.onfocus=function(){
	p4.innerHTML="请查收手机短信，并填写短信中的验证码";
	p4.style.color="";
}
yzm.onblur=function(){
	var yzmStr=yzm.value;
	if(yzmStr.match(/^\d{6}$/g)){
		p4.innerHTML="恭喜您可以注册！";
		p4.style.color="";
		tj4=true;
	}else{
		p4.innerHTML="请输入正确的验证码！";
		p4.style.color="red";
	}
}
//按钮提交事件
sub.onclick=function(){
	if(tj1&& tj2 && tj3 && tj4 && ckb.checked){
		alert("注册成功！");
		window.location.onload();
	}else{
		alert("请补全信息!");
	}
}

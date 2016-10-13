/*
 @ Author：前端老徐
 @ Name：自动登录并添加评论 - 测试用例
 @ Date：2016/10/13
 @ E-mail：442413729@qq.com
 @ Weibo:http://weibo.com/qdlaoxu
 @ GitHub:https://github.com/waihaolaoxu/autotest
 @ Blog:http://www.loveqiao.com/
*/

var driver  = require('selenium-webdriver');
var builder = new driver.Builder().forBrowser('chrome').build();

// 1.登录操作
builder.get('http://service.jiajuol.com/login').then(function(){
    builder.executeScript(function(){
    	document.getElementById("formLogin").loginname.value=13366580095;
    	document.getElementById("formLogin").passwd.value="laoxu123";
    	document.getElementById("btnLogin").click();
    });
});

// 2.评论操作
setTimeout(function(){
	builder.get('http://seller.jiajuol.com/comment/publish/2').then(function(){
	    builder.executeScript(function(){
	    	document.getElementById("title").value="自动化测试";
	    	document.getElementById("content").value="自动化测试";
	    	// document.getElementById("comment").submit();
	    	$('.submit').click();
	    })
	});
},2000);
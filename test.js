/*
	Api地址：
	https://github.com/SeleniumHQ/selenium
	http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/
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
},3000);
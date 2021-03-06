/*
 @ Author：前端老徐
 @ Name：Selenium自动化测试用例
 @ Date：2016/10/13
 @ E-mail：442413729@qq.com
 @ Weibo:http://weibo.com/qdlaoxu
 @ GitHub:https://github.com/waihaolaoxu/autotest
 @ Blog:http://www.loveqiao.com/
*/

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

//启动谷歌浏览器
var driver = new webdriver.Builder().forBrowser('chrome').build();

//将浏览器设置为最大化的状态
driver.manage().window().maximize(); 
//将浏览器的大小自定义为600*400
// driver.manage().window().setSize(600, 400); 

//跳转页面
driver.get('http://service.jiajuol.com/login').then(function(){
	//输入帐号密码登录
	driver.findElement(By.id('loginname')).sendKeys('13366580095');
	driver.findElement(By.id('passwd')).sendKeys('laoxu123');
	driver.findElement(By.id('btnLogin')).click();
});

//检测登录是否成功
driver.wait(until.urlIs('http://www.jiajuol.com/')); //延迟时间如果不填写他会一直轮询

//跳转评论页面
driver.get('http://seller.jiajuol.com/comment/publish/100001').then(function(){
	//添加评论
	var query = driver.wait(until.elementLocated(By.id('title')));//等待一个element
		query.sendKeys('良心商家-xsl');
	driver.findElement(By.id('content')).sendKeys('不错顶一下~~');
	driver.findElement(By.xpath('//*[@id="comment"]/li[4]/div[2]/input')).click();
});


// driver.wait(until.urlIs('http://www.jiajuol.com/'));//监听url
// driver.wait(until.titleIs('webdriver_百度搜索'), 1000);
// driver.wait(function() {
//  	return driver.getTitle().then(function(title) {
//  		return title === 'webdriver_百度搜索';
//  	});
// }, 1000);

// //延迟1秒关闭窗口
// driver.sleep(1000)
// console.log("延迟1秒关闭")
// //关闭窗口
// driver.quit();

// driver.executeScript(function(){
// 	//可以在页面内执行一些js脚本
// })

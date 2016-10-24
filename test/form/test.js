/*
 @ Author：前端老徐
 @ Name：Selenium自动化测试用例
 @ Date：2016/10/24
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

//跳转页面
driver.get(__dirname+'/test.html').then(function(){
	//输入帐号密码登录
	driver.findElement(By.xpath('/html/body/form/ul/li[1]/input')).sendKeys('前端老徐');
	driver.findElement(By.xpath('/html/body/form/ul/li[2]/select/option[2]')).click();
	driver.findElement(By.xpath('/html/body/form/ul/li[3]/label[1]/input')).click();
	driver.findElement(By.xpath('/html/body/form/ul/li[4]/label[2]/input')).click();
	driver.findElement(By.xpath('/html/body/form/ul/li[4]/label[3]/input')).click();
	driver.findElement(By.xpath('/html/body/form/ul/li[5]/input')).sendKeys(__dirname+'/test.js');
	driver.sleep(2000);
	console.log('延迟2s提交')
	driver.findElement(By.xpath('/html/body/form/input')).click();
});


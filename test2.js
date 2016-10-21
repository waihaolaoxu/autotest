/**
 * 这个文件是瞎折腾用的
 */

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

//启动谷歌浏览器
var driver = new webdriver.Builder()
	.forBrowser('chrome')
	.setChromeOptions()
	.build();


// driver.get('http://www.baidu.com/');
// driver.findElement(By.id('kw')).sendKeys('webdriver');
// driver.findElement(By.id('su')).click();
// driver.wait(until.titleIs('webdriver_百度搜索'), 1000);
// driver.wait(function() {
//  	return driver.getTitle().then(function(title) {
//  		return title === 'webdriver_百度搜索';
//  	});
// }, 1000);

//使窗口最大化函数
driver.manage().window().maximize(); //将浏览器设置为最大化的状态
// driver.manage().window().setSize(600, 400); //将浏览器的大小自定义为600*400

driver.get('http://weibo.com/login')
var query = driver.wait(until.elementLocated(By.id('loginname')));
query.click();
query.sendKeys('xushilong0715@163.com');

driver.findElement(By.xpath('//*[@id="pl_login_form"]/div/div[3]/div[2]/div/input')).click();
driver.findElement(By.xpath('//*[@id="pl_login_form"]/div/div[3]/div[2]/div/input')).sendKeys('quwan0316');
driver.findElement(By.xpath('//*[@id="pl_login_form"]/div/div[3]/div[6]/a')).click();


// //延迟1秒关闭窗口
// driver.sleep(1000)
// console.log("延迟1秒关闭")
// //关闭窗口
// driver.quit();



// driver.executeScript(function(){
// 	//可以在页面内执行一些js脚本
// })


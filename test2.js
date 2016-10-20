
//这个文件是瞎折腾用的
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

//启动谷歌浏览器
var driver = new webdriver.Builder().forBrowser('chrome').build();
//跳转页面
driver.get('http://www.baidu.com/');
//输入内容并提交
driver.findElement(By.id('kw')).sendKeys('webdriver');
driver.findElement(By.id('su')).click();


//下面两段等价
// driver.wait(until.titleIs('webdriver_百度搜索'), 1000);
driver.wait(function() {
 	return driver.getTitle().then(function(title) {
 		return title === 'webdriver_百度搜索1';
 	});
}, 1000);


//延迟1秒关闭窗口
driver.sleep(1000)
console.log("延迟1秒关闭")
//关闭窗口
driver.quit();



// driver.executeScript(function(){
// 	//可以在页面内执行一些js脚本
// })


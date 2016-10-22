/**
 * 京东注册测试用例
 */
var colors = require('colors'); 
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

//启动浏览器
var driver = new webdriver.Builder().forBrowser('firefox').build();

//跳转地址
driver.get('https://reg.jd.com/reg/person');

//使窗口最大化函数
// driver.manage().window().maximize(); //将浏览器设置为最大化的状态

function Fn(){
	this.btn=driver.findElement(By.xpath('//*[@id="register-form"]/div[14]/button'));
}
Fn.prototype={
	//打印测试结果
	log:function(obj,tip){
		driver.wait(function() {
		 	return obj.getText().then(function(title) {
		 		if(title == tip){
		 			console.log(title+'-----通过！'.green);
		 		}else{
		 			console.log(tip+'-----未通过！'.red);
		 		}
		 		return true;
		 	});
		},1);
	},

	//设置用户名
	setUsername:function(name,tip){
		driver.wait(until.titleIs('个人注册'));
	    var username=driver.findElement(By.xpath('//*[@id="form-account"]'));
		username.click();
		username.clear();
		username.sendKeys(name);
		this.btn.click();
		this.log(driver.findElement(By.xpath('//*[@id="form-account-error"]')),tip);
	},

	//设置用户名
	setUserpwd:function(pwd,tip){
		driver.wait(until.titleIs('个人注册'));
	    var userpwd=driver.findElement(By.xpath('//*[@id="form-pwd"]'));
		userpwd.click();
		userpwd.clear();
		userpwd.sendKeys(pwd);
		this.btn.click();
		this.log(driver.findElement(By.xpath('//*[@id="register-form"]/div[4]/span')),tip);
	}
}

module.exports=new Fn();

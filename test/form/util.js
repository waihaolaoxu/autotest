/*
 @ Author：前端老徐
 @ Name：Selenium自动化-测试表单
 @ Date：2016/10/22
 @ E-mail：442413729@qq.com
 @ Weibo:http://weibo.com/qdlaoxu
 @ GitHub:https://github.com/waihaolaoxu/autotest
 @ Blog:http://www.loveqiao.com/
*/

var colors = require('colors'); 
var fs = require("fs");
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

//启动浏览器
var driver = new webdriver.Builder().forBrowser('chrome').build(); //chrome|firefox

//创建测试报告
var writerStream = fs.createWriteStream('output.txt');
var d=new Date().toString();
writerStream.write('前端老徐的自动化测试报告 \n'+ 
	d +'\n------------------------------------------------\n\n');

function Fn(){
	this.driver=driver;
	this.By=By;
	this.until=until;
}
Fn.prototype={
	init:function(opt){
		//跳转地址
		driver.get(opt.url);
		//窗口最大化
		if(opt.fullScreen){
			driver.manage().window().maximize(); //将浏览器设置为最大化的状态
		}
	},
	each:function(data,callback){
		for(var x in data){
			callback(x,data[x]);
		}
	},
	runFormValidate:function(data){
		var self=this;
		self.each(data.data,function(i,d){
			self.formValidate({
				val:d.val,
				tip:d.tip,
				errorXpath:data.errorXpath,
				inputXpath:data.inputXpath,
				btnXpath:data.btnXpath
			});
		})
	},
	//打印测试结果
	log:function(obj,tip){
		driver.wait(function() {
		 	return obj.getText().then(function(title) {
		 		if(title == tip){
		 			if(tip==""){
		 				tip='输入正确格式'
		 			}
		 			console.log(tip+'---------------通过！'.green);
		 			writerStream.write(tip+'---------------通过！\n','UTF8');
		 		}else{
		 			console.log(tip+'---------------未通过！'.red);
		 			writerStream.write(tip+'---------------未通过！\n','UTF8');
		 		}
		 		return true;
		 	});
		},1);
	},
	//设置用户名
	formValidate:function(opt){
		// driver.wait(until.titleIs('个人注册'));
	    var input=driver.findElement(By.xpath(opt.inputXpath));
		input.clear();
		input.sendKeys(opt.val);
		driver.findElement(By.xpath(opt.btnXpath)).click();
		this.log(driver.findElement(By.xpath(opt.errorXpath)),opt.tip);
	}
}

module.exports=Fn;

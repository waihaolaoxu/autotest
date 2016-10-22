/*
 @ Author：前端老徐
 @ Name：Selenium自动化-灌数据
 @ Date：2016/10/22
 @ E-mail：442413729@qq.com
 @ Weibo:http://weibo.com/qdlaoxu
 @ GitHub:https://github.com/waihaolaoxu/autotest
 @ Blog:http://www.loveqiao.com/
*/

var colors = require('colors'); 
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

//启动浏览器
var driver = new webdriver.Builder().forBrowser('firefox').build();
//窗口最大化
driver.manage().window().maximize(); //将浏览器设置为最大化的状态

function Fn(){}
Fn.prototype={
	each:function(data,callback){
		for(var x in data){
			callback(x,data[x]);
		}
	},
	sendData:function(opt){
		var self=this;
		driver.get(opt.url).then(function(){
			//输入信息
			self.each(opt.input,function(i,d){
				var obj=driver.findElement(By.xpath(d.xpath));
				obj.click();
				obj.clear();
				obj.sendKeys(d.val);
			});
			driver.findElement(By.xpath(opt.btnXpath)).click();
			if(typeof opt.isUrl=='string'){
				driver.wait(until.urlIs(opt.isUrl));
			}
		});
	}
}

module.exports=Fn;
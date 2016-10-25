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
var writerStream = fs.createWriteStream('output.html');
var date=new Date();
function fdate(d){
	if(d<10)return '0'+d;
	return d;
}
writerStream.write('<style>body{width:760px;margin:0 auto}.ok{color:green;}.err{color:#f00}.time{color:#999;}#result{color:#ffb300;}</style><h1>前端老徐的自动化测试报告</h1><p class="time">测试时间：'
	+fdate(date.getFullYear())+'/'
	+fdate(date.getMonth())+'/'
	+fdate(date.getDate())+'&nbsp;'
	+fdate(date.getHours())+':'
	+fdate(date.getMinutes())+':'
	+fdate(date.getSeconds())+'</p><p id="result"></p>'
	+'<script>window.onload=function(){\
		document.getElementById("result").innerHTML=(function(){\
			var ok=document.querySelectorAll(".ok").length,\
				err=document.querySelectorAll(".err").length;\
			var str="通过数:"+ok+"&nbsp;&nbsp;失败数："+err+"&nbsp;&nbsp;通过率："+((ok/(ok+err)*100).toFixed(2))+"%";\
			return str;\
		}())\
	}</script>');

//主程序
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
			driver.manage().window().maximize();
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
		 			writerStream.write('<p class="ok">'+tip+'---------------通过！</p>','UTF8');
		 		}else{
		 			console.log(tip+'---------------未通过！'.red);
		 			writerStream.write('<p class="err">'+tip+'---------------未通过！</p>','UTF8');
		 		}
		 		return true;
		 	});
		},1);
	},
	//设置用户名
	formValidate:function(opt){
	    var input=driver.findElement(By.xpath(opt.inputXpath));
		input.clear();
		input.sendKeys(opt.val);
		driver.findElement(By.xpath(opt.btnXpath)).click();
		this.log(driver.findElement(By.xpath(opt.errorXpath)),opt.tip);
	}
}

module.exports=Fn;

/*
 @ Author：前端老徐
 @ Name：Selenium 爬虫
*/
var fs=require('fs');
var data=require('./data').split('\n');
var colors = require('colors'); 
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var arguments = process.argv.splice(2);

//启动谷歌浏览器
var driver = new webdriver.Builder().forBrowser('chrome').build();


//将浏览器设置为最大化的状态
// driver.manage().window().maximize(); 
//将浏览器的大小自定义为600*400
// driver.manage().window().setSize(600, 400); 


//创建测试报告
var writerStream = fs.createWriteStream('output.html');



//执行检测
var step=0;//起始位置
if(arguments.length){
	step=arguments[0];
	console.log(arguments)
}
function theNext(){
	if(step<data.length-1){
		step++;
		start();
	}else{
		console.log('完成!'.green);
	}
}
function start(){
	var _url='https://www.aso100.com/search?country=cn&search='+data[step];
	driver.get(_url).then(function(){




		// driver.sleep(1000)
		var b = driver.findElement(By.xpath('//*[@id="app-list"]/div[1]/div[1]/a/img'))
		b.getAttribute('alt').then(function(e){
			writerStream.write(e);
		});
		b.getAttribute('src').then(function(e){
			writerStream.write(e);
			theNext()
		});


		






	}).catch(function(error) {
	  // 处理前一个回调函数运行时发生的错误
	  console.log('异常跳过');
	  writerStream.write('<p class="err">× '+_url+'异常跳过</p>','UTF8');
	  theNext()
	});
}
start();
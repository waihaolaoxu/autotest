/*
 @ Author：前端老徐
 @ Name：Selenium自动化友链检测
 @ Date：2016/11/25
 @ E-mail：442413729@qq.com
 @ Weibo:http://weibo.com/qdlaoxu
 @ GitHub:https://github.com/waihaolaoxu/autotest
 @ Blog:http://www.loveqiao.com/
*/
var fs=require('fs');
var data=require('./data');// 友链数据
var colors = require('colors'); 
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


//启动谷歌浏览器
var driver = new webdriver.Builder().forBrowser('chrome').build();


//将浏览器设置为最大化的状态
// driver.manage().window().maximize(); 
//将浏览器的大小自定义为600*400
// driver.manage().window().setSize(600, 400); 


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
			var str="通过:"+ok+"个&nbsp;&nbsp;失败："+err+"个&nbsp;&nbsp;通过率："+((ok/(ok+err)*100).toFixed(2))+"%";\
			return str;\
		}())\
	}</script>');


//执行检测
var step=0;//起始位置
function start(){
	var _url=data[step].url,_name=data[step].link_name;
	driver.get(_url).then(function(){
		// driver.sleep(1000)
		var b=driver.findElements(By.xpath('//a[contains(@href, "'+data[step].jiaju_url+'")]')).then(function(e){
			if(e.length>0){
				console.log('√ --- '.green+_url+' --- '+_name);
				writerStream.write('<p class="ok">√ '+_url+_name+'</p>','UTF8');
			}else{
				console.log('× --- '.red+_url+' --- '+_name);
				writerStream.write('<p class="err">× '+_url+_name+'</p>','UTF8');
			}
			if(step<data.length-1){
				step++;
				start();
			}else{
				console.log('前端老徐自动化检测完成!'.green);
			}
		})
	});
}
start();
/*
 @ Author：前端老徐
 @ Name：Selenium自动化检测url是否能正常访问
 @ Date：2016/10/13
 @ E-mail：442413729@qq.com
 @ Weibo:http://weibo.com/qdlaoxu
 @ GitHub:https://github.com/waihaolaoxu/autotest
 @ Blog:http://www.loveqiao.com/
*/
var fs=require('fs');
var data=require('./data');
var colors = require('colors'); 
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

//启动谷歌浏览器
var driver = new webdriver.Builder().forBrowser('chrome').build();

//创建测试报告
var writerStream = fs.createWriteStream('output.html');
var date=new Date();
function fdate(d){
	if(d<10)return '0'+d;
	return d;
}
writerStream.write('<meta charset="UTF-8"><style>body{width:760px;margin:0 auto}.ok{color:green;}.err{color:#f00}.time{color:#999;}#result{color:#ffb300;}</style><h1>前端老徐的自动化测试报告</h1><p class="time">测试时间：'
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
function theNext(){
	if(step<data.length-1){
		step++;
		start();
	}else{
		console.log('前端老徐自动化检测完成!'.green);
	}
}
function start(){
	var _url=data[step].url;
	driver.get(data[step].url).then(function(){
		driver.getCurrentUrl().then(function(e){
			if(_url==e){
				console.log('√ --- '.green+_url);
				writerStream.write('<p class="ok">√ '+_url+'</p>','UTF8');
			}else{
				console.log('× --- '.red+_url);
				writerStream.write('<p class="err">× '+_url+'</p>','UTF8');
			}
		    theNext();
		})
	}).catch(function(error) {
	  // 处理前一个回调函数运行时发生的错误
	  console.log('发生错误！', error);
	  theNext();
	})
}
start();
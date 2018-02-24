/*
 @ Author：前端老徐
 @ Name：Selenium 爬虫
*/
var fs=require('fs');
var data=require('./data');
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
var writerStream = fs.createWriteStream('data.txt');



//执行检测
var key_index = 6; //关键字索引
var page = 125;//起始页
var page_size = 200;//总页数
var curDate = new Date();
if(arguments.length){
	page=arguments[0];
	console.log(arguments)
}
function theNext(){
	if(page < page_size){
		page ++;
		start();
	}else{
		if(key_index < data.length){
			key_index ++;
			page = 0;
			start();
		}else{
			console.log('完成!'.green);
		}
	}
}
function writeData(e){
	writerStream.write(e);
}
function start(){
	var _url = data[key_index].url+'&page='+page,strData = [];
	driver.get(_url).then(function(){
		driver.executeScript(function(){
			window.scroll(0,1000000); //滚动条滚动加载下一屏数据
		});
		// driver.sleep(1000); //等待1s加载数据
		driver.findElements(By.css('.gl-item')).then(function(e){
			var item_length = e.length;
			for(var i=0;i<item_length;i++){
				(function(i){
					var obj ={
						type:data[key_index].name
					}

					//获取商品名称
					var name = e[i].findElement(By.css('.p-name em'));
					name.getText().then(function(e){
						// console.log('商品名称'.red,e);
						obj.name = e;
					})					

					//获取商品地址、图片地址
					var a = e[i].findElement(By.css('.p-img a'));
					a.getAttribute('href').then(function(e){
						// console.log('商品连接',e);
						obj.url = e;

						var img = a.findElement(By.css('img'));
						function getImg(e){
							if(/^(http|\/\/)/.test(e)){
								// console.log('图片地址',e);
								obj.img = e;
							}
						}
						img.getAttribute('data-lazy-img').then(function(e){
							getImg(e);
						});
						img.getAttribute('src').then(function(e){
							getImg(e);
						});
					});

					//获取价格
					var price = e[i].findElement(By.css('.p-price i'));
					price.getText().then(function(e){
						// console.log('商品价格',e);
						obj.price = e;
						strData.push(obj);
						if(i == item_length-1){
							writeData(JSON.stringify(strData));
						}
					});
					
				})(i);
			}
		});
		// driver.sleep(1000); //等待1s
		theNext();
	}).catch(function(e){
		console.log('出错跳过'.red);
		theNext();
	});
	var date = new Date();
	console.log('页数：'+page+' 分类索引：'+key_index+' 执行时间：'+ ((date - curDate)/1000)+' 秒');
	curDate = date;
}
start();
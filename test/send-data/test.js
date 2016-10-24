// 灌数据

var util=require('./util');
var fn=new util();
var driver=fn.driver;
var until=fn.until;
//登陆
fn.sendData({
	url:'http://service.jiajuol.com/login',// 登陆地址
	input:[
		{
			xpath:'//*[@id="loginname"]',
			val:'13366580095'
		},{
			xpath:'//*[@id="passwd"]',
			val:'laoxu123'
		}
	],
	btnXpath:'//*[@id="btnLogin"]'
});

//灌水
driver.wait(until.urlIs('http://www.jiajuol.com/'));//监听url
fn.sendData({
	url:'http://seller.jiajuol.com/comment/publish/100001',// 评论页面地址
	input:[
		{
			xpath:'//*[@id="title"]',
			val:'不错非常好'
		},{
			xpath:'//*[@id="content"]',
			val:'大品牌值得信赖！！！！！'
		}
	],
	btnXpath:'//*[@id="comment"]/li[4]/div[2]/input'
});
driver.wait(until.urlIs('http://seller.jiajuol.com/comment'));//监听url
fn.sendData({
	url:'http://seller.jiajuol.com/comment/publish/100001',// 评论页面地址
	input:[
		{
			xpath:'//*[@id="title"]',
			val:'不错非常好1'
		},{
			xpath:'//*[@id="content"]',
			val:'大品牌值得信赖1！！！！！'
		}
	],
	btnXpath:'//*[@id="comment"]/li[4]/div[2]/input'
});
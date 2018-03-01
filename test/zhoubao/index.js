// 灌数据
var util=require('./util');
var fn = new util();
var driver = fn.driver;
var until = fn.until;
//登陆
fn.sendData({
	url:'http://ething.123eblog.com/#/',// 登陆地址
	input:[
		{
			xpath:'//*[@id="es-body"]/div[1]/div/div[2]/form/div[1]/div[2]/input',
			val:''
		},{
			xpath:'//*[@id="password"]',
			val:''
		}
	],
	btnXpath:'//*[@id="es-body"]/div[1]/div/div[2]/form/div[4]/button'
});
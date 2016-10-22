var util=new require('./util');
var fn=new util();

//登陆
fn.sendData({
	url:'http://service.jiajuol.com/login',// 登陆地址
	input:[
		{
			xpath:'//*[@id="loginname"]',
			val:'aaa123456'
		},{
			xpath:'//*[@id="passwd"]',
			val:'aaa123456'
		}
	],
	btnXpath:'//*[@id="btnLogin"]',
	isUrl:'http://www.jiajuol.com/' //登陆成功后跳转的地址
});

//灌水
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
})

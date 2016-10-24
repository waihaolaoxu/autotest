/**
 * 京东注册测试用例
 */
var util=new require('./util');
var fn=new util();
fn.init({
	url:'https://reg.jd.com/reg/person',// 打开地址URL
	fullScreen:true //是否全屏显示 可选值(true|false)
})

// 用户名测试用例
fn.runFormValidate({
	errorXpath:'//*[@id="register-form"]/div[4]/span',//错误提示xpath
	inputXpath:'//*[@id="form-account"]',//输入框xpath
	btnXpath:'//*[@id="register-form"]/div[14]/button',//提交按钮xpath
	data:[
		{
			val:1,//输入的值
			tip:'长度只能在4-20个字符之间‘’‘’‘’',//想要的反馈
		},
		{
			val:1234,
			tip:'用户名不能是纯数字，请重新输入！',
		},
		{
			val:'1234asdfdfdfd',
			tip:'',
		}
	]
});

// 密码测试用例
fn.runFormValidate({
	errorXpath:'//*[@id="register-form"]/div[4]/span',
	inputXpath:'//*[@id="form-pwd"]',
	btnXpath:'//*[@id="register-form"]/div[14]/button',
	data:[
		{
			val:'',
			tip:'请设置密码',
		},
		{
			val:'1',
			tip:'长度只能在6-20个字符之间',
		},
		{
			val:'123456',
			tip:'有被盗风险,建议使用字母、数字和符号两种及以上组合',
		}
	]
});
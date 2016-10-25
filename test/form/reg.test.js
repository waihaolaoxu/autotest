/*
 @ Author：前端老徐
 @ Name：Selenium自动化测试用例
 @ Date：2016/10/24
*/

var util=require('./util');
var fn=new util();
fn.init({
	url:__dirname+'/reg.html',// 打开地址URL
	fullScreen:false //是否全屏显示 可选值(true|false)
});

// 各种表单录入数据脚本
// var driver=fn.driver,By=fn.By;
// driver.findElement(By.xpath('/html/body/form/ul/li[1]/input')).sendKeys('前端老徐');//用户名
// driver.findElement(By.xpath('//*[@id="pwd"]')).sendKeys('12345');//密码
// driver.findElement(By.xpath('/html/body/form/ul/li[3]/select/option[2]')).click();//城市
// driver.findElement(By.xpath('/html/body/form/ul/li[4]/label[1]/input')).click();//性别
// driver.findElement(By.xpath('/html/body/form/ul/li[5]/label[2]/input')).click();//复选
// driver.findElement(By.xpath('/html/body/form/ul/li[5]/label[3]/input')).click();//复选
// driver.findElement(By.xpath('/html/body/form/ul/li[6]/input')).sendKeys(__dirname+'/test.js');//文件
// driver.sleep(2000);
// console.log('延迟2s提交');
// driver.findElement(By.xpath('/html/body/form/ul/li[7]/input')).click();

// 用户名测试用例
fn.runFormValidate({
	errorXpath:'/html/body/form/ul/li[1]/p',//错误提示xpath
	inputXpath:'/html/body/form/ul/li[1]/input',//输入框xpath
	btnXpath:'/html/body/form/ul/li[7]/input',//提交按钮xpath
	data:[
		{
			val:'',
			tip:'手机号不能为空!' //想要的反馈
		},
		{
			val:1,//输入的值
			tip:'手机号格式不正确'
		},
		{
			val:13333333333,
			tip:''
		}
	]
});

// 密码测试用例
fn.runFormValidate({
	errorXpath:'/html/body/form/ul/li[2]/p',
	inputXpath:'//*[@id="pwd"]',
	btnXpath:'/html/body/form/ul/li[7]/input',
	data:[
		{
			val:'1',
			tip:'长度需设置为5-8位'
		},
		{
			val:'123456',
			tip:'密码过于简单'
		},
		{
			val:'abcdefghigk',
			tip:'长度需设置为5-8位'
		},
		{
			val:'',
			tip:'密码不能为空'
		},
		{
			val:'abc123',
			tip:''
		}
	]
});
/**
 * 京东注册测试用例
 */

var fn=new require('./util');


// 测试用例
fn.setUsername(1,'长度只能在4-20个字符之间');
fn.setUsername(1234,'用户名不能是纯数字，请重新输入！');
fn.setUsername('1234asdfdfdfd','');
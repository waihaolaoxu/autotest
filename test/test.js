/**
 * 京东注册测试用例
 */

var fn=new require('./util');


// 用户名测试用例
fn.setUsername(1,'长度只能在4-20个字符之间‘’‘’‘’');
fn.setUsername(1234,'用户名不能是纯数字，请重新输入！');
fn.setUsername('1234asdfdfdfd','');


// 密码测试用例
fn.setUserpwd('','请设置密码');
fn.setUserpwd(1,'长度只能在6-20个字符之间');
fn.setUserpwd(123456,'有被盗风险,建议使用字母、数字和符号两种及以上组合');


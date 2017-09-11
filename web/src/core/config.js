/*
 * @Author: zhujian 
 * @Date: 2017-08-13 01:10:00 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-11 13:22:27
 */

function CONF() {
  //本地
  //    server: 'http://10.0.0.15:8082/',
  // 站点目录
  this.rootPath = window.location.host == "/";
  this.api = 'http://116.196.124.92:8080/';
  // 开发构建输出目录
  this.scriptPath = 'dist/js/';
  // 脚本、样式更新时间
  this.cacheUpdateTime = 'v20151215';
  this.timeUnit = 100;
  // 金额单位到分
  this.moneyUnit = 100;

};
window.CONFIG = new CONF()

/*
 * @Author: Michael 
 * @Date: 2017-08-09 14:52:14 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-26 15:36:48
 */

import Order from '../models/order/index'
import db from '../mongodb/db.js';
var http = require('http');
var url = require('url');

var querystring = require('querystring');

var regUrl = "http://116.196.124.92:8080/order/get";
var post_data = querystring.stringify({
  'type': 1,
});
var post_option = url.parse(regUrl);
post_option.method = "POST";

var post_reg = http.request(post_option, function (res) {
  var str = ''
  res.on('data', function (buffer) {
    str += buffer.toString()

    // str.replace(/\ +/g, "");//去掉空格
    // str.replace(/[ ]/g, ""); //去掉空格
    // str.replace(/[\r\n]/g, "");//去掉回车换行
    // var userList = JSON.parse(str).data;
    // setTimeout(function () {
    //   // var userList = buffer.toJSON().data; 
    //   //  console.log(userList) 
    //   // var userList = JSON.parse(json).data;
    //   console.log(122)
    //   // userList.map(async function (data) {
    //   //   delete data._id
    //   //   // console.log(data)
    //   //   // await User.create(data);
    //   //   // console.log(success)
    //   // })
    // }, 1000)


  });

  res.on('end', function () {
     var userList = JSON.parse(str).data;
      userList.map(async function (data) {
        delete data._id
        // console.log(data)
        await Order.create(data);
        console.log("success")
      })
  });


})

post_reg.write(post_data);
post_reg.end();


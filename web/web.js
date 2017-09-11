var express = require('express');
var path = require('path');
var child_process = require('child_process');
var app = express();

//设置静态目录，省的去设置路由，codeDirectory是你的代码文件目录
app.use(express.static(path.join(__dirname, './dist')));

app.listen(7001);
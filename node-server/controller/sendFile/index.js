/*
 * @Author: zhujian 
 * @Date: 2017-08-13 01:11:24 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-27 01:22:41
 */
var path = require('path')

class SendFile {
  constructor() {

  }
  async sendFile(req, res, next) {
    console.log('file')
    res.sendFile(path.join(__dirname,'aaa.pdf'));
    // res.send({
    //   status: 0,
    //   type: 'ERROR_PARAMS',
    //   message: '名字不可为空'
    // })   
    return
  }
}

export default new SendFile()
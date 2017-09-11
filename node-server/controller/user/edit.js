/*
 * @Author: zhujian 
 * @Date: 2017-08-13 01:11:24 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-08-14 09:54:41
 */

import User from '../../models/user/User'

class EditUser {
	constructor() {
    
  };

	async editUser(req, res, next) {
	  const name = req.body.name;
    const uId = req.body.uId;
    if (!name) {
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: '名字不可为空'
      })
      return
    }

     try {
      const userList = await User.find({ uId: uId })
      if (userList.length == 0) {
        res.send({
          status: 0,
          message: "用户不存在"
        })
        return;
      }
      
    } catch (err) {
      console.log('取不到学员数据了', err);
    }

    try {
      const userInfo =  _.pick(_.clone(req.body), 'name', 'phone' , 'type'); 
      userInfo.modifyTime = moment().valueOf();
      const userList = await User.update({uId:req.body.uId},userInfo)
      res.send({ 
        status: 1,
        message: "修改成功"        
      })
      return;
    } catch (err) {
      console.log('取不到学员数据了', err);
    }
    
	}
}

export default new EditUser()
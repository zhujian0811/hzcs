/*
 * @Author: zhujian 
 * @Date: 2017-08-13 01:11:30 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-08-26 13:06:57
 */
import User from '../../models/user/User'

class GetUser {
  constructor() {

  }
  async getUser(req, res, next) {
    try {
      const type = req.body.type ? { type: req.body.type } : {};
      const userList = await User.find(type, null, { sort: { modifyTime: -1 } })
      res.send({
        status: 1,
        data: userList
      })
      return;
    } catch (err) {
      console.log('取不到学员数据了', err);
    }
  }
}

export default new GetUser()
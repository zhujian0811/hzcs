/*
 * @Author: zhujian 
 * @Date: 2017-08-13 01:11:24 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-11 00:13:54
 */

import Order from '../../models/order/index'

class Delete {
  constructor() {

  }
  async delete(req, res, next) {
    const id = req.body.id;
    if (!id) {
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: '删除为空数据'
      })
      return
    }
    try {
      const getOrder = await Order.find({ id: id });
      if (getOrder.length == 0) {
        res.send({
          status: 0,
          message: '该成员不存在',
        })
        return;
      }
    } catch (err) { 
      console.log('成员不在列表中', err);

    }
    try {
      await Order.remove({ id: id })
      res.send({
        status: 1,
        message: '删除成功',
      })
    } catch (err) {
      console.log('删除成员失败')
    }
  }
}

export default new Delete()
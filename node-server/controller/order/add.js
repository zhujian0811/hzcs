/*
 * @Author: zhujian 
 * @Date: 2017-08-13 01:11:24 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-10 23:51:39
 */

import Order from '../../models/order/index'

class AddOrder {
  constructor() {

  }
  async add(req, res, next) {
    const name = req.body.name;
    if (!name) {
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: '名字不可为空'
      })
      return
    }
    try {
      const newOrder = _.clone(req.body)
      newOrder.id = moment().valueOf();
      newOrder.modifyTime = moment().valueOf();
      newOrder.Material = JSON.parse(newOrder.Material);
      Order.create(newOrder).then(() => {
        res.send({
          status: 1,
          message: '添加成功',
        })
      })

    } catch (err) {
      console.log('获取备注数据失败', err);
      res.send({
        status: 0,
        type: 'ERROR_GET_DATA',
        message: '获取备注数据失败'
      })
    }
  }
}

export default new AddOrder()
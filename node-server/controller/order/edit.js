/*
 * @Author: zhujian 
 * @Date: 2017-08-13 01:11:24 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-11 00:29:20
 */

import Order from '../../models/order/index'

class EditOrder {
  constructor() {

  };
  async edit(req, res, next) {
    const name = req.body.name;
    const id = req.body.id;
    if (!id) {
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: 'id不可为空'
      })
      return
    }

    try {
      const orderList = await Order.find({ id: id })
      if (orderList.length == 0) {
        res.send({
          status: 0,
          message: "订单不存在"
        })
        return;
      }

    } catch (err) {
      console.log('取不到学员数据了', err);
    }

    try {
      const orderInfo = _.omit(_.clone(req.body), 'id');
      orderInfo.modifyTime = moment().valueOf();
      if (orderInfo.Material) { 
        orderInfo.Material = JSON.parse(orderInfo.Material)
      }    
       console.log(orderInfo)
      const orderList = await Order.update({ id: req.body.id }, orderInfo)
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

export default new EditOrder()
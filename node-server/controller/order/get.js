/*
 * @Author: zhujian 
 * @Date: 2017-08-13 01:11:30 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-16 18:27:01
 */
import Order from '../../models/order/index'
class GetOrder {
  constructor() {

  }
  async get(req, res, next) {
    try {
      let query;
      if (req.body.type == 1) {
        query = { status: { '$ne': '6' } }
      } else if (req.body.type == 2) {
        query = { status: '6' }
      } else if (req.body.type == 3) {
        query = {
          status: { '$ne': '6' },
          'Material': {
            '$elemMatch': { 
              'orderTime':
              {
                '$gt': 1505491200000,
                '$lt': 1505577599999,
              }
            }
          }
        }
      }
      console.log(query)
      const orderList = await Order.find(query, null, { sort: { modifyTime: -1 } })

      res.send({
        status: 1,
        data: orderList
      })
      return;
    } catch (err) {
      console.log('取不到学员数据了', err);
    }
  }
}

export default new GetOrder()
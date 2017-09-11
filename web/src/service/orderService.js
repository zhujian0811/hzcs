/*
 * @Author: zhujian 
 * @Date: 2017-08-12 13:57:45 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-11 00:20:20
 */

import BaseService from './BaseService';
function orderService() {
  BaseService.call(this);

  /**
   *  添加订单
   */
  this.add = function (param, success, error) {
    this.apiUrl = 'order/add';
    this.commitAsync({
      data: param
    },
      function (res) {
        success(res)
      },
      error
    );
  };

  /**
 *  获取订单
 */
  this.getOrder = function (param, success, error) {
    this.apiUrl = 'order/get';
    this.commitAsync({
      data: param
    },
      function (res) {
        success(res)
      },
      error
    );
  };

  /**
*  订单获取
*/
  this.editOrder = function (param, success, error) {
    this.apiUrl = 'order/edit';
    this.commitAsync({
      data: param
    },
      function (res) {
        success(res)
      },
      error
    );
  };

  /**
*  订单删除
*/
  this.delete = function (param, success, error) {
    this.apiUrl = 'order/delete';
    this.commitAsync({
      data: param
    },
      function (res) {
        success(res)
      },
      error
    );
  };
}

module.exports = new orderService();

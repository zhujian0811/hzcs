/*
 * @Author: zhujian 
 * @Date: 2017-08-12 13:57:45 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-08-13 15:16:09
 */

import BaseService from './BaseService';
function BusinessService() {
  BaseService.call(this);

  /**
   *  添加成员
   */
  this.addUser = function (param, success, error) {
    this.apiUrl = 'user/addUser';
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
 *  成员获取
 */
  this.getUser = function (param, success, error) {
    this.apiUrl = 'user/getUser';
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
*  成员获取
*/
  this.editUser = function (param, success, error) {
    this.apiUrl = 'user/editUser';
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
*  成员删除
*/
  this.delete = function (param, success, error) {
    this.apiUrl = 'user/delete';
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

module.exports = new BusinessService();

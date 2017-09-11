/*
 * @Author: zhujian 
 * @Date: 2017-08-12 13:58:30 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-08-12 16:30:41
 */
import NProgress from 'nprogress';
window.NProgress = NProgress;

function BaseService() {

  // 服务端API
  this.apiUrl = null;

  var _defaultOptions = {
    // 默认请求json
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    // 用json解析响应报文
    dataType: 'json',
    // 默认POST请求
    type: 'POST',
    // 请求20秒后无响应放弃
    timeout: 20000,
    // 请求前置操作
    beforeSend: function (xhr) {
      NProgress.start();
    }
  };


  /**
   * 获取服务器地址
   * @returns {string|string}
   */
  this.getServerHost = function () {
    return CONFIG.server;
  };

  /**
   * 异步提交
   * @param options
   * @param success
   * @param error
   */
  this.commitAsync = function (options, success, error) {
    ajaxHandle.call(this, options, success, error);
  };

  /**
   * 同步提交
   * @param option
   * @param error
   */
  this.commitSync = function (option, error) {
    if (typeof option == "function" || !option) {
      error = option;
      option = {};
    }
    option.async = false;

    return ajaxHandle.call(this, option, error);
  };


  function ajaxHandle(options, success, error) {
    // 无options时
    if (typeof options == "function" || !options) {
      error = success;
      success = options;
      options = {};
    }
    var requestOptions = _.extend(_defaultOptions, options);
     requestOptions.url = CONFIG.api + this.apiUrl ;

    /**
     * 加此层 为了对响应报文再次处理，然后交给回调函数
     * @param response 响应报文
     */

    var ret;
    requestOptions.success = function (response) {
      NProgress.done();
      if (success) {
        // 正常正确返回
        if (response.status == 1) {
          success(response)
        } else  {
          message.error(response.message);
          if (error) { 
            error();
          }  
        } 
      }

      if (options.async != undefined && !options.async) {
        // 正常正确返回
        if (response.resultCode == 0) {
          ret = response;
        } else {
          ret = null;
          console.error('请求成功，但服务端返回未知错误', response);
        }
      }
    };

    requestOptions.error = function (xhr) {
      NProgress.done();
      if (error) {
        error(xhr)
      } else {
        defaultErrorHandle(xhr)
      }
    };

    $.ajax(requestOptions);

    return ret;
  }

  /**
   * 默认错误处理
   */
  function defaultErrorHandle(xhr) {
      if (xhr.status == 400) {
        message.error('请正确填写数据！错误码（400）');
      } else if (xhr.status == 500) {
        message.error('服务端发生错误！错误码（500）');
      } else if (xhr.status == 404) {
        message.error('服务端未处理该请求！错误码（404）');
      } else {
        message.error('服务端开小差了，请稍后再试~');
      }
  }
}

module.exports = BaseService;

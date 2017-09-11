var $ = require('jquery');
var _ = require('underscore');
require('../core/config.js')
require('../core/enum.js')
require('../core/unit.js')
require('./index.less');
var Admin = require('../module/base/Admin');
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "2000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};
window.message =Antd.message;
const MOUNT_NODE = document.getElementById('admin');
const rootInstance = ReactDOM.render(< Admin />,
  MOUNT_NODE);
if (module.hot) {
  module.hot.accept();
}

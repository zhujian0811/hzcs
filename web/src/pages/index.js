var $ = require('jquery');
var _ = require('underscore');
require('../core/config.js')
require('../core/enum.js')
require('../core/unit.js')
require('./index.less');
var Admin = require('../module/base/Admin');
window.message =Antd.message;
const MOUNT_NODE = document.getElementById('admin');
const rootInstance = ReactDOM.render(< Admin />,
  MOUNT_NODE);
if (module.hot) {
  module.hot.accept();
}

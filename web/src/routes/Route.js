var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router').IndexRoute;

var HomePage = require('../module/home/HomePage');
var UserManage = require('../module/user/UserManage');
var Order = require('../module/order/orderManage');
var FinishOrder = require('../module/order/finishOrderManage');


var routes = (
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={HomePage} />
      <Route path='UserManage' component={UserManage} />
      <Route path='order' component={Order} />
      <Route path='finish' component={FinishOrder} />
    </Route>
  </Router>

);

module.exports = routes;




var Routers = require('../../routes/Route.js');
var Dropdown = Antd.Dropdown;
window.moment = moment;
moment.locale('zh-cn');
import { Menu, Icon, Switch, Layout } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
var Admin = React.createClass({
  getInitialState: function () {
    return {
      //显示标签选择
      theme: 'dark',
      current: '1',
      collapsed: false,
    }
  },
  changeTheme: function (value) {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  },

  toggle: function () {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  },

  handleClick: function (e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  },
  render: function () {
    var self = this;
    return (
      <div className="wrappe Admin" style={{ "height": "100%" }}>
        <Layout className='layout'>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu
              theme={this.state.theme}
              onClick={this.handleClick}
             
              defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>首页</span></span>}>
                <Menu.Item key="1"><a href="#">首页</a></Menu.Item>

              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>项目管理</span></span>}>
                <Menu.Item key="2"><a href="#UserManage">用户管理</a></Menu.Item>
                <Menu.Item key="3"><a href="#order">订单管理</a></Menu.Item>
                <Menu.Item key="4"><a href="#finish">完成订单</a></Menu.Item>
                {/* <SubMenu key="sub2" title="Submenu">
                <Menu.Item key="3">Option 7</Menu.Item>
                <Menu.Item key="4">Option 8</Menu.Item>
              </SubMenu> */}
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>           
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              {Routers}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              沪创装饰 ©2017 Created by zhujian
           </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
});

module.exports = Admin;

/*
 * @Author: zhujian 
 * @Date: 2017-08-13 01:11:14 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-11 01:38:38
 */
import { Menu, Icon, Switch, Layout, Button, Modal, Table } from 'antd';
import AddUser from './AddUser'
const UserService = require('../../service/UserService');
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

var Home = React.createClass({
  getInitialState: function () {
    return {
      visible: false,
      confirmLoading: false,
      data: [],
    }
  },

  addUser: function () {
    this.setState({
      visible: true,
      type: 'add',
      dataSource: {},
    });
  },

  close: function () {
    this.setState({
      visible: false,
    });
  },

  addUserSuccess: function () {
    this.close()
  },

  handleEdit: function (data) {
    this.setState({
      visible: true,
      type: 'edit',
      dataSource: data,
    });
  },

  handleCancel: function () {
    this.getUser();
    this.setState({
      visible: false,
    });
  },

  getUser: function () {
    UserService.getUser({}, (res) => {
      this.setState({ data: res.data })
    })
  },

  delete: function (user) { 
    UserService.delete({uId:user.uId}, (res) => {
      message.success('删除成功');
      this.getUser();
    })
  },

  componentDidMount: function () {
    this.getUser();
  },

  render: function () {
    const columns = [
      {
        title: '编号', dataIndex: '', key: 'index',
        render: (text, record, index) => {
          return (<span > {index + 1}</span >)
        }
      },
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '联系方式', dataIndex: 'phone', key: 'phone' },
      {
        title: '职位', dataIndex: '', key: 'type',
        render: (text, record, index) => {
          return (<span > {ENUM.UserType[record.type]}</span >)
        }
      },
      {
        title: '操作', dataIndex: '', key: 'x',
        render: (text, record, index) => {
          return (
            <span>
              <Button type="primary"
                onClick={this.handleEdit.bind(this, record)}
                icon="edit"
                size='small'></Button>
              <Button type="primary"
                onClick={this.delete.bind(this, record)}
                icon="delete"
                className='ml10'
                size='small'></Button>
            </span>
          )
        }
      },
    ];

    var self = this;
    return (
      <div className="userManager" style={{ "height": "100%" }}>
        <Header style={{ background: '#fff', padding: 0 }} >
          <Button type="primary"
            className='fr'
            style={{lineHeight:"28px"}}
            onClick={this.addUser}
          >添加</Button>

        </Header>
        {this.state.visible ?
          <AddUser
            close={this.close}
            type={this.state.type}
            dataSource={this.state.dataSource}
            handleSuccess={this.addUserSuccess}
          /> : null}
        <Table
          columns={columns}
          dataSource={this.state.data}
          size="small"
        />

      </div>
    );
  }
});

module.exports = Home;

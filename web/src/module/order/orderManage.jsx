/*
 * @Author: zhujian 
 * @Date: 2017-08-13 01:11:14 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-12 01:11:21
 */
import { Menu, Icon, Switch, Layout, Checkbox, Button, Modal, Table, Steps } from 'antd';
const Step = Steps.Step;
import AddOrder from './addOrder'
import EditMain from './editMain'
const UserService = require('../../service/UserService');
const OrderService = require('../../service/orderService');
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

var Home = React.createClass({
  getInitialState: function () {
    return {
      visible: false,
      confirmLoading: false,
      data: [],
      checked: false,
      user: [],
    }
  },

  addOrder: function () {
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

  mainClose() {
    this.setState({
      mainVisible: false,
    });
  },

  addOrderSuccess: function () {
    this.close()
    this.getOrder();
  },

  setStatus(item, status) {
    const param = {
      id: item.id,
      status
    };
    OrderService.editOrder(param, (res) => {
      message.success('状态修改成功');
      this.getOrder();
    })
  },

  handleEdit: function (data) {
    this.setState({
      visible: true,
      type: 'edit',
      dataSource: data,
    });
  },

  editMain(data) {
    this.setState({
      mainVisible: true,
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
      _.map(res.data, (item, index) => {
        item.key = index;
      })
      this.setState({ user: res.data });
      this.getOrder();
    })
  },

  getOrder: function () {
    let type = this.state.checked ? 3 : 1;
    OrderService.getOrder({ type }, (res) => {
      _.map(res.data, (item, index) => {
        item.key = index;
      })
      this.setState({ order: res.data })
    })
  },

  delete: function (order) {
    Modal.confirm({
      title: '警告：删除订单 ',
      content: '是否需要删除该订单',
      onOk: () => {
        OrderService.delete({ id: order.id }, (res) => {
          message.success('删除成功');
          this.getOrder();
        })
      },
      okText: '确认',
      cancelText: '取消',
    })
  },

  getToday: function (e) {
    this.setState({
      checked: e.target.checked,
    }, this.getOrder)

  },

  componentDidMount: function () {
    this.getUser();
  },

  render: function () {
    console.log(this.state.dataSource)
    const columns = [
      {
        title: '编号', dataIndex: '', key: 'index',
        render: (text, record, index) => {
          return (<span > {index + 1}</span >)
        }
      },
      { title: '客户姓名', dataIndex: 'name', key: 'name' },
      { title: '客户电话', dataIndex: 'phone', key: 'phone' },
      { title: '客户地址', dataIndex: 'address', key: 'address' },
      {
        title: '开工日期', dataIndex: 'startDate', key: 'startDate',
        render: (text, record, index) => {
          return (<span > {record.startDate && moment(parseInt(record.startDate)).format('YYYY-MM-DD')}</span >)
        }
      },
      {
        title: '设计师', dataIndex: '', key: 'designer',
        render: (text, record, index) => {
          const user = _.find(this.state.user, function (item) {
            return item.uId == record.designer
          })
          const userName = !!user && user.name;
          return (<span > {userName}</span >)
        }
      },
      {
        title: '项目经理', dataIndex: '', key: 'manager',
        render: (text, record, index) => {
          const user = _.find(this.state.user, function (item) {
            return item.uId == record.manager
          })
          const userName = !!user && user.name
          return (<span > {userName}</span >)
        }
      },
      {
        title: '进度', dataIndex: 'status', key: 'status',
        render: (text, record, index) => {
          return (<span >{ENUM.orderStatus[record.status]} </span >)
        }
      },
      {
        title: '主材事项', dataIndex: 'main', key: 'main',
        render: (text, record, index) => {
          const mianItem = _.find(record.Material, function (item) {
            return item.orderTime > moment().startOf('day').valueOf() && item.orderTime < moment().endOf('day').valueOf();
          })
          return (<span >{mianItem && mianItem.name ||
            <Button type="primary"
              onClick={this.editMain.bind(this, record)}
              className='ml10'
              size='small'>编辑</Button>} </span >)
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
      <div className="orderManager" style={{ "height": "100%" }}>
        <Header style={{ background: '#fff', padding: 0 }} >
          <Button type="primary"
            className='fr ml10'
            onClick={this.addOrder}
          >添加</Button>
          <Checkbox
            className='fr'
            checked={this.state.checked}
            onChange={this.getToday}>今日事项</Checkbox>
          <h3>订单管理</h3>
        </Header>

        {this.state.visible ?
          <AddOrder
            close={this.close}
            type={this.state.type}
            user={this.state.user}
            dataSource={this.state.dataSource}
            handleSuccess={this.addOrderSuccess}
          /> : null}

        {this.state.mainVisible ?
          <EditMain
            close={this.mainClose}
            dataSource={this.state.dataSource}
            handleSuccess={this.addOrderSuccess}
          /> : null}
        <Table
          columns={columns}
          dataSource={this.state.order}
          expandedRowRender={record => {
            return <div >
              <h5 style={{ lineHeight: '30px' }}>工程进度：</h5>
              <Steps current={parseInt(record.status) + 1}>
                {
                  _.map(_.allKeys(ENUM.orderStatus), (key) => {
                    return <Step
                      onClick={this.setStatus.bind(this, record, key)}
                      description={ENUM.orderStatus[key]} />
                  })
                }
              </Steps>
            </div>
          }
          }
          size="small"
        />

      </div>
    );
  }
});

module.exports = Home;

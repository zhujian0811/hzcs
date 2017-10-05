/*
 * @Author: zhujian 
 * @Date: 2017-08-12 13:57:58 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-10-05 13:53:00
 */
import { Menu, Icon, Switch, Layout, Form, Select, DatePicker, Modal, Input } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const orderService = require('../../service/orderService');
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const { MonthPicker, RangePicker } = DatePicker;

var addUser = React.createClass({
  getInitialState: function () {
    return {
      confirmLoading: false,
      data: this.props.dataSource || [],
      Item: this.props.dataSource.Material[0],
    }
  },

  handleOk: function () {
    this.setState({
      confirmLoading: true,
    });
    let data = _.clone(this.state.data);
    data.Material = JSON.stringify(data.Material);
    orderService.editOrder(data, (res) => {
      message.success('修改成功');
      this.props.close();
    }, () => {
      this.setState({
        confirmLoading: false,
      });
    })

  },

  handleChange: function (event) {
    if (event.target.name == 'price') {
      this.state.Item[event.target.name] = parseInt(event.target.value) * 100;
    } else {
      this.state.Item[event.target.name] = event.target.value;
    }
    this.setState({});
  },

  handleMenu(item, key, selectedKeys) {
    this.state.Item = this.state.data.Material[parseInt(item.key)];
    this.setState({});
  },

  render: function () {
    const self = this;
    const designerList = _.filter(this.props.user, function (item) {
      return item.type == 1;
    });
    const managerList = _.filter(this.props.user, function (item) {
      return item.type == 2;
    });
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };

    return (
      <Modal title={"主材: " + this.state.Item.name}
        visible={true}
        width={650}
        heght={700}
        className='global-modals'
        onOk={this.handleOk}
        style={{ height: "600px" }}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.props.close}
      >
        <div style={{ height: "430px" }}>
          <Menu
            theme={this.state.theme}
            onSelect={this.handleMenu}
            defaultSelectedKeys={'0'}
            className='fl'
            width={200}
            style={{ width: "150px" }}
            mode="inline"
          >
            {this.state.data.Material.map((item, index) => {
              return <Menu.Item key={index + ''}>{item.name}</Menu.Item>
            })}
          </Menu>
          <Layout style={{ backgroundColor: "#fff" }}>
            <Form layout='horizontal'>
              {/* <FormItem
                label="客户姓名"
                key={11111}
                {...formItemLayout}
              >
                {this.props.type == 'see' ?
                  <span>{this.state.Item.customer}</span> :
                  <Input placeholder="客户名字"
                    style={{ 'width': '300px' }}
                    name='customer'
                    onChange={this.handleChange}
                    value={this.state.Item.customer}
                  />
                }
              </FormItem> */}
              {/* <FormItem
                label="下单时间"
                key={1111321}
                {...formItemLayout}
              >
                {this.props.type == 'see' ?
                  <span>{formatDate("YYYY-MM-DD", this.state.Item.orderTime)}</span> :
                  <DatePicker
                    style={{ 'width': '300px' }}
                    placeholder="下单时间"
                    name='orderTime'
                    value={moment(parseInt(this.state.Item.orderTime) || moment(new Date()))}
                    format='YYYY/MM/DD'
                    onChange={(date) => {
                      this.state.Item.orderTime = date ? date.valueOf() : this.props.item.startDate;
                      this.setState({});
                    }}
                  />}
              </FormItem> */}
              {/* <FormItem
                label="送货时间"
                key={11331131}
                {...formItemLayout}
              >
                {this.props.type == 'see' ?
                  <span>{formatDate("YYYY-MM-DD", this.state.Item.deliverTime)}</span> :
                  <DatePicker
                    style={{ 'width': '300px' }}
                    placeholder="送货时间"
                    name='deliverTime'
                    value={moment(parseInt(this.state.Item.deliverTime) || moment(new Date()))}
                    format='YYYY/MM/DD'
                    onChange={(date) => {
                      this.state.Item.deliverTime = date ? date.valueOf() : this.props.item.startDate;
                      this.setState({});
                    }}
                  />}
              </FormItem> */}
              {/* <FormItem
                label="付款时间"
                key={12211131}
                {...formItemLayout}
              >
                {this.props.type == 'see' ?
                  <span>{formatDate("YYYY-MM-DD", this.state.Item.payTime)}</span> :
                  <DatePicker
                    placeholder="付款时间"
                    name='payTime'
                    style={{ 'width': '300px' }}
                    value={moment(parseInt(this.state.Item.payTime) || moment(new Date()))}
                    format='YYYY/MM/DD'
                    onChange={(date) => {
                      this.state.Item.payTime = date ? date.valueOf() : this.props.item.startDate;
                      this.setState({});
                    }}
                  />}
              </FormItem> */}
              {/* <FormItem
                label="付款金额"
                key={11445111}
                {...formItemLayout}
              >
                {this.props.type == 'see' ?
                  <span>{moneyFormat(this.state.Item.price)}</span> :
                  <Input placeholder="付款金额"
                    type='number'
                    style={{ 'width': '300px' }}
                    name='price'
                    onChange={this.handleChange}
                    value={moneyFormat(this.state.Item.price)}
                  />}
              </FormItem> */}
              <FormItem
                label="备注"
                key={11411}
                {...formItemLayout}
              >
                {this.props.type == 'see' ?
                  <span>{this.state.Item.remark}</span> :
                  <TextArea placeholder="备注"
                    type='number'
                    style={{ 'width': '300px' }}
                    name='remark'
                    onChange={this.handleChange}
                    value={this.state.Item.remark}
                  />}
              </FormItem>

            </Form>
          </Layout>
        </div>
      </Modal>
    );
  }
});

module.exports = addUser;

/*
 * @Author: zhujian 
 * @Date: 2017-08-12 13:57:58 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-12 00:56:24
 */
import { Form, Input, Modal, Select, DatePicker } from 'antd';
const orderService = require('../../service/orderService');
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

var addUser = React.createClass({
  getInitialState: function () {
    return {
      confirmLoading: false,
      data: this.props.dataSource || {},
      Material: [{
        name: "瓷砖",
        delayDay: 14,
      },
      {
        name: "大理石",
        delayDay: 19,
      },
      {
        name: "橱柜",
        delayDay: 20,
      },
      {
        name: "木门及门套",
        delayDay: 20,
      },
      {
        name: "吊顶",
        delayDay: 40,
      },
      {
        name: "柜门",
        delayDay: 40,
      },
      {
        name: "洁具",
        delayDay: 60,
      },
      {
        name: "淋浴房",
        delayDay: 50,
      },
      {
        name: "移门",
        delayDay: 50,
      },
      {
        name: "地板",
        delayDay: 60,
      }
      ]
    }
  },

  handleOk: function () {
    this.setState({
      confirmLoading: true,
    });
    const service = this.props.type == 'edit' ? 'editOrder' : 'add';
    const log = this.props.type == 'edit' ? "修改成功" : "添加成功";
    if (this.props.type == 'add') {
      _.map(this.state.Material, (item) => {
        item.orderTime = moment(this.state.data.startDate).add(item.delayDay, 'day').valueOf()
      })
      this.state.data.Material = JSON.stringify(this.state.Material);
    } else { 
      this.state.data.Material = JSON.stringify(this.state.data.Material);
    }
    orderService[service](this.state.data, (res) => {
      message.success(log);
      this.props.handleSuccess();
    }, () => {
      this.setState({
        confirmLoading: false,
      });
    })

  },

  handleChange: function (event) {
    this.state.data[event.target.name] = event.target.value;
    this.setState({});
  },

  changeDate: function (date) {
    this.state.data.startDate = date ? date.valueOf() : this.props.item.startDate;
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
      <Modal title={this.props.type == 'add' ? "添加订单" : "订单管理"}
        visible={true}
        className='global-modal-a'
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.props.close}
      >
        <Form layout='horizontal'>
          <FormItem
            label="客户姓名"
            key={11111}
            {...formItemLayout}
          >
            <Input placeholder="客户名字"
              name='name'
              onChange={this.handleChange}
              value={this.state.data.name}
            />
          </FormItem>
          <FormItem
            label="客户电话"
            key={11112}
            {...formItemLayout}
          >
            <Input
              placeholder="客户电话"
              name='phone'
              onChange={this.handleChange}
              value={this.state.data.phone}
            />
          </FormItem>
          <FormItem
            label="客户地址"
            key={11118}
            {...formItemLayout}
          >
            <Input.TextArea
              placeholder="请输入地址"
              name='address'
              onChange={this.handleChange}
              value={this.state.data.address}
            />
          </FormItem>
          <FormItem
            label="开工日期"
            key={111131}
            {...formItemLayout}
          >
            <DatePicker
              style={{ 'width': '160px' }}
              placeholder="开工日期"
              value={moment(parseInt(this.state.data.startDate) || moment(new Date()))}
              format='YYYY/MM/DD'
              onChange={this.changeDate}
            />
          </FormItem>
          <FormItem
            label="设计师"
            key={1113}
            {...formItemLayout}
          >
            <Select
              showSearch
              placeholder="选择设计师"
              name="type"
              key={1112313}
              value={this.state.data.designer}
              onChange={(value) => {
                this.state.data.designer = value;
                this.setState({});
              }}
              filterOption={(input, option) => {
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}
            >
              {
                _.map(designerList, function (item) {
                  return <Option value={item.uId}>{item.name}</Option>
                })
              }
            </Select>
          </FormItem>
          <FormItem
            label="项目经理"
            key={1123113}
            {...formItemLayout}
          >
            <Select
              showSearch
              placeholder="选择项目经理"
              name="type"
              key={113}
              value={this.state.data.manager}
              onChange={(value) => {
                this.state.data.manager = value;
                this.setState({});
              }}
              filterOption={(input, option) => {
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}
            >
              {
                _.map(managerList, function (item) {
                  return <Option value={item.uId}>{item.name}</Option>
                })
              }
            </Select>
          </FormItem>
        </Form>
      </Modal>
    );
  }
});

module.exports = addUser;

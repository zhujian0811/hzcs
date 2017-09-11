/*
 * @Author: zhujian 
 * @Date: 2017-08-12 13:57:58 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-08-28 13:49:51
 */
import { Form, Input, Modal, Select } from 'antd';
const UserService = require('../../service/UserService');
console.log(UserService.addUser)
const FormItem = Form.Item;
const Option = Select.Option;

var addUser = React.createClass({
  getInitialState: function () {
    return {
      confirmLoading: false,
      data: this.props.dataSource,
    }
  },

  handleOk: function () {
    this.setState({
      confirmLoading: true,
    });
    const service = this.props.type == 'edit' ? 'editUser' : 'addUser';
    const log = this.props.type == 'edit' ? "修改成功" : "添加成功"
    UserService[service](this.state.data, (res) => {
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

  render: function () {
    const self = this;
    console.log(this.props.dataSource)
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <Modal title={this.props.type == 'edit' ? "编辑成员" : "添加成员"}
        visible={true}
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.props.close}
      >
        <Form layout='horizontal'>
          <FormItem
            label="姓名"
            key={11111}
            {...formItemLayout}
          >
            <Input placeholder="请输入名字"
              name='name'
              onChange={this.handleChange}
              value={this.state.data.name}
            />
          </FormItem>
          <FormItem
            label="电话"
            key={11112}
            {...formItemLayout}
          >
            <Input
              placeholder="请输入电话"
              name='phone'
              onChange={this.handleChange}
              value={this.state.data.phone}
            />
          </FormItem>
          <FormItem
            label="类型"
            key={11113}
            {...formItemLayout}
          >
            <Select
              showSearch
              placeholder="选择角色类型"
              name="type"
              value={this.state.data.type}
              onChange={(value) => {
                this.state.data.type = value;
                this.setState({});
              }}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                _.map(_.allKeys(ENUM.UserType), function (key) {
                  return <Option value={key}>{ENUM.UserType[key]}</Option>
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

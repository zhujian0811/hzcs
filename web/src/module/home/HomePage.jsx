
var Home = React.createClass({
  getInitialState: function () {
    return {
      //显示标签选择
      theme: 'dark',
      current: '1',
    }
  },
  changeTheme: function (value) {
    this.setState({
      theme: value ? 'dark' : 'light',
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
       <div className="home" style={{ "height": "100%" }}>
        沪创装饰恩恩
      </div>
    );
  }
});

module.exports = Home;

import https from 'https';
import url from 'url';
import querystring from 'querystring';
import config from 'config-lite';

var post_option = url.parse('http://116.196.124.92:8080/order/get');
post_option.method = "POST";
post_option.port = 443;
post_option.cookie = config.cookie;
var post_data = querystring.stringify({
  'random': new Date().getTime(),
});

class getOkCoin {
  getOkCoin() {
    return new Promise((resolve, reject) => {
      var post_reg = https.request(post_option, function (res) {
        res.on('data', function (buffer) {
          resolve(buffer.toString())
        });
      })
      post_reg.write(post_data);
      post_reg.end();
    })

  }
}
console.log(new getOkCoin().getOkCoin)
export default new getOkCoin()
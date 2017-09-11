/**
 * 全局公共方法库
 * Created by Gentean.
 * Mail: 4083189@qq.com
 * Date: 15/10/31
 * Time: 上午10:49
 */

window.random_string = function (len) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/**
 * 生成树
 * @param parentCode
 * @param datas
 * @param level
 * @returns {Array}
 */
window.createTree = function (parentCode, datas, level) {
  if (level == undefined) {
    level = 0;
  }
  var child = [];
  var childCodes = [];

  // 找子节点
  for (var i in datas) {
    var item = datas[i];
    if (item.parent == parentCode) {
      item.level = level;
      child.push(item);
      childCodes.push(item.code);
    }
  }

  var len = child.length;

  if (len > 0) {
    if (parentCode != 0) {
      datas[parentCode].child = child;
      datas[parentCode].childCodes = childCodes;
    }
    for (i = 0; i < len; i++) {
      createTree(child[i].code, datas, level + 1);
    }
  }
  if (level == 0) {
    return child;
  }
}

window.timeFormat = function (time, defaultValue) {
  var stringTime = time ? (time / CONFIG.timeUnit).toFixed(2) : (defaultValue == undefined ? 0 : defaultValue);

  return (new Number(stringTime)).valueOf();
}

window.moneyFormat = function (money, defaultValue) {
  var stringMoney = money ? (parseInt(money) / CONFIG.moneyUnit).toFixed(2) : (defaultValue == undefined ? 0 : defaultValue);
  return (new Number(stringMoney)).valueOf();
}

window.formatDate = function (format, timestamp) {
  if (!timestamp) return '';

  if (Number(timestamp) != undefined) {
    timestamp = Number(timestamp);
  }

  var date = new Date(timestamp);
  var y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();

  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  h = h < 10 ? '0' + h : h;
  i = i < 10 ? '0' + i : i;
  s = s < 10 ? '0' + s : s;

  return format.replace('YYYY', y)
    .replace('MM', m)
    .replace('DD', d)
    .replace('H', h)
    .replace('i', i)
    .replace('s', s);
}
//设置cookie
window.setCookie = function (cname, cvalue) {
  var d = new Date(),
    exdays = 30;
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

//获取cookie
window.getCookie = function (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
//清除cookie
window.clearCookie = function (name) {
  setCookie(name, "", -1);
}
/**
 * dataURL 转 Blob
 * @param dataurl
 * @returns {Blob}
 */
window.dataURLtoBlob = function (dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
//当前操作的菜单code
window.insertGetParams = '?u=' + localStorage.getItem("login_name") + '&token=' + getCookie('m_token') + '&authCode=' + localStorage.getItem("cur_menu") + '&uid=' + getCookie('m_uid');
window.Common = {};
Common.ajaxMsg = function (opts) {
  var opt = {
    msg: '网络错误刷新重试!'
  }
  $.extend({}, opt, opts);
  alert(opt.msg);
};
Common.isLogin = function (msg) {
  if (msg.resultCode == 1) {
    clearCookie('m_token');
    window.location.href = './login.html';
    return false;
  } else if (msg.resultCode == 3) {
    alert("图片上传失败!");
  }
};
Common.cityData = function (callback) {
  //城市data
  $.ajax({ url: CONFIG.api + 'm/city/list?token=' + getCookie('m_token'), type: 'post' })
    .done(callback)
    .fail(function () {
      alert("网络出出错啦,请刷新重试！");
    });
};

//滑动时固定表头
window.adjusWidth = function (elm) {
  var outerheight = parseInt(window.getComputedStyle($(elm).find('.datas')[0]).height);
  var innerheight = parseInt(window.getComputedStyle($(elm).find('.datas .table')[0]).height);
  if (outerheight && innerheight && innerheight > outerheight) {
    $(elm).find('.table-head')[0].style.width = $(elm).find('.datas')[0].offsetWidth - 10 + 'px';
  } else {
    $(elm).find('.table-head')[0].style.width = $(elm).find('.datas')[0].offsetWidth + 'px';
  }
};
window.setSelection = function (data) {
  localStorage.setItem("selection", JSON.stringify(data))
}
window.getSelection = function (data) {
  return JSON.parse(localStorage.getItem("selection"))
}
//  console.log("%c\n   ", "font-size:350px;background:url('http://zhujian081.b0.upaiyun.com/2121.jpg') no-repeat 100px -100px"); 